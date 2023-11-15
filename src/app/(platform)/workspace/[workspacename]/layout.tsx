import { Header } from '@/components/Header/Header'
import '../../../../styles/globals.scss'
import '../../../../styles/platform-globals.scss'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { Inter } from 'next/font/google'
import { getAllCookies } from '@/api/on-connects'
import { setCookies } from '@/api/account-requests'

export const metadata = {
  title: 'Lótus Workspace',
  description: 'Área de trabalho Lótus, faça login para acessar.'
}

const inter = Inter({ subsets: ['latin'] })

export default async function WorkspaceLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { 
    workspacename: string
  }
}) {
  const {
    xgoldentoken
  } = await getAllCookies()
  
  // await setCookies(
  //   String(xgoldentoken),
  //   params.workspacename
  // )
  return (
    <html lang="br">
      <body className={inter.className}>
        <Header />
        <SidebarMenu workspacename={params.workspacename} />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}