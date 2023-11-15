import { Header } from '@/components/Header/Header'
import '../../../../styles/globals.scss'
import '../../../../styles/platform-globals.scss'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { Inter } from 'next/font/google'
import { getAllCookies } from '@/api/on-connects'
import { fetchInstance, setCookies } from '@/api/account-requests'
import { AccountType, CookiesType, WorkspaceType } from '@/@types/globalTypes'

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
  const { workspacename } = params
  const allCookies = await getAllCookies() as CookiesType
  
  const { 
    xgoldentoken
  } = allCookies

  const account: AccountType = await fetchInstance(`/account/id/${xgoldentoken}`, {
    method: 'GET',
    headers: {
      'xgoldentoken': String(xgoldentoken)
    }
  })

  const workspace: WorkspaceType = await fetchInstance(`/workspace/id/${workspacename}`, {
    method: 'GET',
    headers: {
      'xgoldentoken': String(xgoldentoken)
    }
  })
  
  return (
    <html lang="br">
      <body className={inter.className}>
        <Header 
          workspace={workspace} 
          account={account}
        />
        <SidebarMenu 
          workspace={workspace}
          cookies={allCookies} 
        />
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}