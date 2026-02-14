import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Providers from '@/components/Providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-pretendard',
})

export const metadata: Metadata = {
  title: 'CloverPit',
  description: 'PUBG 클랜 전용 전적 관리 시스템',
  keywords: 'PUBG, 배틀그라운드, 클랜, 전적, 랭킹',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.variable}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
