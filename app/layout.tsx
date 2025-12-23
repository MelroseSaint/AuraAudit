import { Inter, JetBrains_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://auraaudit.com'),
  title: {
    default: 'AuraAudit - AI-Powered Code Audit Platform',
    template: '%s | AuraAudit',
  },
  description: 'Autonomous coding audit framework with AI-powered code analysis. Real-time code insights, security scanning, and quality metrics.',
  keywords: ['audit', 'code-analysis', 'ai', 'automation', 'security', 'code-review'],
  authors: [{ name: 'AuraAudit' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://auraaudit.com',
    siteName: 'AuraAudit',
    title: 'AuraAudit - AI-Powered Code Audit Platform',
    description: 'Autonomous coding audit framework with AI-powered code analysis',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AuraAudit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AuraAudit - AI-Powered Code Audit Platform',
    description: 'Autonomous coding audit framework with AI-powered code analysis',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <body className="min-h-screen bg-background font-sans antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
