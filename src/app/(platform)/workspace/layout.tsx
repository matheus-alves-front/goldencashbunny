import { Header } from '@/components/Header/Header'
import '../../../styles/globals.scss'
import styles from './page.module.scss'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="br">
      <body className={inter.className}>
        <Header />
        <main className={styles.main}>
          <SidebarMenu />
          {children}
        </main>
      </body>
    </html>
  )
}