import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/SessionProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CleX Research Publishing Platform',
    template: '%s | CleX',
  },
  description:
    'A trusted multi-journal open-access scholarly publishing platform. Submit manuscripts, manage peer review, and discover high-quality research.',
  keywords: ['academic publishing', 'open access', 'peer review', 'scientific journals', 'research publication'],
  authors: [{ name: 'CleX Publishing' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'CleX Research Publishing Platform',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-slate-900">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
