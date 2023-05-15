import Providers from '@/react-query/providers'
import './globals.css'
import { Roboto } from 'next/font/google'
import { Suspense } from 'react'
import Loading from '@/components/shares/Loading'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata = {
  title: 'Chat App',
  description: 'Chat app by Long Thai',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={roboto.className}>
        <Providers>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  )
}
