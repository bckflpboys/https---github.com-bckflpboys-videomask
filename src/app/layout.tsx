import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import MobileDock from '@/components/MobileDock'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VideoMask - Video Metadata Manipulation & Device Masking',
  description: 'Transform your videos to appear authentic across different platforms and devices with custom metadata.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} min-h-screen bg-[#F2F1ED] antialiased`}>
        <Providers>
          {children}
          <MobileDock />
        </Providers>
      </body>
    </html>
  )
}
