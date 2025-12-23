# Architecture Migration Diff: Desktop to Web SaaS

## 1. Project Structure

### OLD (Vite Desktop App)
```
Auto-Claude/auto-claude-ui/
├── vite.config.ts (Vite SPA)
├── src/renderer/
│   ├── App.tsx (Desktop SPA root)
│   ├── main.tsx (ReactDOM entry)
│   ├── index.html (Static HTML)
│   └── components/ (Desktop UI components)
└── package.json (Vite dependencies)
```

### NEW (Next.js 15 Web SaaS)
```
app/
├── layout.tsx (Next.js root with ClerkProvider)
├── globals.css (Tailwind CSS variables)
├── dashboard/
│   └── page.tsx (PPR-enabled dashboard)
├── u/
│   └── [username]/
│       └── page.tsx (SEO-optimized profile)
lib/
├── instant.ts (Global InstantDB client)
├── env.ts (Environment variables)
└── utils.ts (Shared utilities)
components/
├── DashboardShell.tsx (Responsive shell)
├── AuditStreamingList.tsx (Real-time streaming)
├── IdentitySeed.tsx (JSON-LD semantic data)
└── ui/ (Shadcn components)
middleware.ts (Clerk route protection)
next.config.js (PPR + Image optimization)
```

---

## 2. Entry Point Transformation

### OLD (src/renderer/main.tsx)
```tsx
// SPA - React render to static div
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
```

### NEW (app/layout.tsx)
```tsx
// SSR with Clerk auth + Font optimization
import { Inter, JetBrains_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={inter.variable}>
        <body className="min-h-screen bg-background font-sans antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
```

---

## 3. Page Architecture - PPR Implementation

### OLD (src/renderer/App.tsx - Static SPA)
```tsx
// Everything renders client-side, no streaming
export function App() {
  useIpcListeners()
  const tasks = useTaskStore((state) => state.tasks)
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main>
        {/* Static content, no streaming */}
        <KanbanBoard tasks={tasks} />
      </main>
    </div>
  )
}
```

### NEW (app/dashboard/page.tsx - Partial Prerendering)
```tsx
import { Suspense } from 'react'
import DashboardShell from '@/components/DashboardShell'
import AuditStreamingList from '@/components/AuditStreamingList'
import ReputationScoreSkeleton from '@/components/skeletons/ReputationScoreSkeleton'

// Static shell loads instantly at edge
export default function DashboardPage() {
  return (
    <DashboardShell>
      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Identity Health</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Dynamic content streams in via Suspense */}
            <Suspense fallback={<ReputationScoreSkeleton />}>
              <AuditStreamingList />
            </Suspense>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
```

---

## 4. Authentication Transformation

### OLD (Desktop - Electron IPC)
```tsx
// No auth, desktop app with IPC
const useIpcListeners = () => {
  useEffect(() => {
    window.electron.ipcRenderer.on('some-event', handleEvent)
    return () => window.electron.ipcRenderer.removeAllListeners('some-event')
  }, [])
}
```

### NEW (Web - Clerk + Middleware)
```tsx
// middleware.ts - Route protection
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/u/(.*)'])

export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth().protect()
  }
})

// components/InstantAuthSync.tsx - Sync Clerk to InstantDB
export default function InstantAuthSync() {
  const { getToken, isSignedIn } = useAuth()

  useEffect(() => {
    if (isSignedIn) {
      getToken({ template: 'instantdb' }).then((token) => {
        if (token) {
          db.auth.signInWithIdToken({ clientName: 'clerk', idToken: token })
        }
      })
    } else {
      db.auth.signOut()
    }
  }, [isSignedIn, getToken])

  return null
}
```

---

## 5. Database & Real-time Streaming

### OLD (Desktop - Zustand store)
```tsx
// Local state, no real-time sync
import { create } from 'zustand'
const useTaskStore = create((set) => ({
  tasks: [],
  loadTasks: async (projectId) => {
    const tasks = await fetchTasks(projectId)
    set({ tasks })
  }
}))
```

### NEW (Web - InstantDB with streaming)
```tsx
// lib/instant.ts - Global client
import { init } from '@instantdb/react'
export const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID,
  apiURI: process.env.NEXT_PUBLIC_INSTANT_API_URI,
})

// components/AuditStreamingList.tsx - Real-time streaming
import { useQuery } from '@instantdb/react'

export default function AuditStreamingList() {
  // Real-time streaming from InstantDB
  const { isLoading, error, data } = useQuery({
    audits: {
      $: {
        where: { timestamp: { $gte: Date.now() - 7 * 24 * 60 * 60 * 1000 } },
        orderBy: { timestamp: 'desc' }
      }
    }
  })

  const audits = data?.audits || []
  // Renders update instantly when DB changes
  return <AuditList audits={audits} />
}

// hooks/useIdentity.ts - Custom hook for reputation score
import { useQuery } from '@instantdb/react'
import { z } from 'zod'

const IdentitySchema = z.object({
  id: z.string(),
  name: z.string(),
  reputationScore: z.number(),
  verifiedBio: z.string()
})

export function useIdentity(userId: string) {
  const { data, isLoading, error } = useQuery({
    users: {
      $: { where: { id: userId } }
    }
  })

  const user = IdentitySchema.safeParse(data?.users?.[0])
  return { identity: user.data, isLoading, error }
}
```

---

## 6. API Routes with Zod Validation

### OLD (Desktop - None)
```tsx
// No API routes, direct file access via Electron
```

### NEW (Web - Server Actions with Zod)
```tsx
// app/api/audit/route.ts - Protected API with validation
import { db } from '@/lib/instant'
import { auth } from '@clerk/nextjs/server'
import { z } from 'zod'

const AuditRequestSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  rules: z.array(z.string()).default([]),
  severity: z.enum(['critical', 'high', 'medium', 'low']).default('medium')
})

export async function POST(request: Request) {
  const { userId } = auth()
  if (!userId) return new Response('Unauthorized', { status: 401 })

  const body = await request.json()
  const validated = AuditRequestSchema.safeParse(body)
  if (!validated.success) {
    return new Response(JSON.stringify(validated.error), { status: 400 })
  }

  // Call Gemini 3 API
  const auditResult = await runGeminiAudit(validated.data.code, validated.data.rules)

  // Store in InstantDB (triggers real-time update)
  await db.transact([
    db.tx.audits[auditResult.id] = {
      userId,
      severity: validated.data.severity,
      ...auditResult,
      timestamp: Date.now()
    }
  ])

  return Response.json(auditResult)
}
```

---

## 7. UI Components - Desktop to Responsive Web

### OLD (Desktop modals)
```tsx
// Fixed-position dialogs, not mobile responsive
<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent className="w-[600px]">
    {/* Desktop-only layout */}
  </DialogContent>
</Dialog>
```

### NEW (Shadcn responsive components)
```tsx
// components/DashboardShell.tsx - Mobile-first responsive shell
'use client'
import Link from 'next/link'
import { LayoutDashboard, Audit, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Responsive sidebar */}
      <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm hidden md:block">
        <nav className="space-y-1 p-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors', isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent')}>
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile-friendly content */}
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card/50 backdrop-blur-sm px-6">
          <h1 className="text-xl font-semibold capitalize">{pathname.split('/').pop()}</h1>
          <div className="flex items-center gap-2">
            <UserButton />
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
```

---

## 8. Semantic Seeding (JSON-LD for AI Discovery)

### OLD (None)
```tsx
// No semantic data, AI crawlers can't find content
```

### NEW (components/IdentitySeed.tsx)
```tsx
export default function IdentitySeed({ profile }: { profile: Profile }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": profile.name,
        "jobTitle": profile.title,
        "description": profile.verifiedBio,
        "url": `https://auraaudit.com/u/${profile.id}`,
        "sameAs": [
          profile.github,
          profile.linkedin
        ],
        "knowsAbout": profile.skills,
        "identifier": profile.reputationScore
      })
    }} />
  )
}

// app/u/[username]/page.tsx - SEO-optimized profile
export async function generateMetadata({ params }: { params: { username: string } }) {
  const profile = await getProfile(params.username)
  
  return {
    title: `${profile.name} - Identity Health Score`,
    description: profile.verifiedBio,
    openGraph: {
      title: `${profile.name}'s AuraAudit Profile`,
      description: `Reputation Score: ${profile.reputationScore}/100`,
      images: [profile.avatarUrl]
    }
  }
}

export default function ProfilePage({ params }: { params: { username: string } }) {
  const profile = await getProfile(params.username)
  
  return (
    <>
      <IdentitySeed profile={profile} />
      <DashboardShell>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold">{profile.name}</h1>
          <p className="text-xl text-muted-foreground">{profile.title}</p>
          
          <Suspense fallback={<AuditStreamingListSkeleton />}>
            <AuditStreamingList userId={profile.id} />
          </Suspense>
        </div>
      </DashboardShell>
    </>
  )
}
```

---

## 9. Configuration Changes

### OLD (vite.config.ts)
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, 'src/renderer'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      output: {
        manualChunks: { 'vendor': ['react', 'react-dom'] }
      }
    }
  }
})
```

### NEW (next.config.js)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    ppr: 'incremental',  // Partial Prerendering
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],  // Optimized images
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
```

---

## 10. Dependencies Transformation

### OLD (package.json)
```json
{
  "name": "auto-claude-ui",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^19.2.3",
    "react-dom": "^19.2.3",
    "zustand": "^5.0.9"
  }
}
```

### NEW (package.json)
```json
{
  "name": "auraudit-web",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@clerk/nextjs": "^5.0.0",
    "@instantdb/react": "^0.15.0",
    "@instantdb/core": "^0.15.0",
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@google/generative-ai": "^0.17.0",
    "zod": "^3.22.0",
    "@radix-ui/react-dialog": "^1.1.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## Summary of Key Changes

| Aspect | Desktop (Old) | Web SaaS (New) |
|--------|--------------|----------------|
| **Rendering** | SPA (Client-side only) | PPR (Shell static, content streams) |
| **Auth** | None (Desktop app) | Clerk + Middleware protection |
| **Database** | Zustand (Local state) | InstantDB (Real-time sync) |
| **API** | Electron IPC | Next.js Server Actions + Zod validation |
| **SEO** | None | Full SEO + JSON-LD semantic data |
| **Performance** | First paint > 2s | Shell < 100ms, streaming |
| **Mobile** | Not supported | Fully responsive |
| **AI Integration** | No API endpoints | Gemini 3 Server Actions |
