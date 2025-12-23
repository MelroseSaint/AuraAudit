import type { Metadata } from 'next'
import DashboardPage from '@/app/dashboard/page'
import InstantAuthSync from '@/lib/instantdb'

export const metadata: Metadata = {
  title: 'AuraAudit - Identity Health Scanner',
  description: 'AI-powered identity health and security analysis'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <InstantAuthSync />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
