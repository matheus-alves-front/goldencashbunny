import { Header } from '@/components/Header/Header'
import '../../../../styles/globals.scss'
import '../../../../styles/platform-globals.scss'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'Lótus Workspace',
  description: 'Área de trabalho Lótus, faça login para acessar.'
}

const inter = Inter({ subsets: ['latin'] })

export default function WorkspaceLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { 
    workspacename: string
  }
}) {
  console.log(params)
  return (
    <html lang="br">
      <body className={inter.className}>
        <Header />
        <SidebarMenu />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}