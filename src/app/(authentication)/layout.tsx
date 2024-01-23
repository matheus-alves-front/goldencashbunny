import '../../styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { useAccountJWT } from '@/hooks/useAccountJWT'
import { redirect } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const account = await useAccountJWT()

  if (account) {
    return redirect('/workspaces')
  }

  return (
    <html lang="br">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
