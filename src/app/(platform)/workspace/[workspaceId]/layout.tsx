import { redirect } from 'next/navigation'
import { Open_Sans } from 'next/font/google'
import { WorkspaceType } from '@/@types/globalTypes'
import { fetchInstanceWithCookies } from '@/api/fetchInstances'
import { ActualWorkspaceContextProvider } from '@/contexts/ActualWorkspaceContext'
import { Header } from '@/components/Header/Header'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { useAccountJWT } from '@/hooks/useAccountJWT'
import '../../../../styles/globals.css'

export const metadata = {
  title: 'Lótus Workspace',
  description: 'Área de trabalho Lótus, faça login para acessar.'
}

const opensans = Open_Sans({ subsets: ['latin'] })

export default async function WorkspaceLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { 
    workspaceId: string
  }
}) {
  const { workspaceId } = params

  const account = await useAccountJWT()

  if (!account) return redirect('/')

  const workspaces: WorkspaceType[] = await fetchInstanceWithCookies(`/workspace/account/${account.id}`, {})
  
  const workspace = workspaces.find(workspace => workspace.id === workspaceId) as WorkspaceType

  return (
    <ActualWorkspaceContextProvider>
      <html lang="br">
        <body className={opensans.className}>
          <Header 
            workspace={workspace} 
            account={account}
          />
          <SidebarMenu 
            workspace={workspace}
          />
          <main>
            {children}
          </main>
        </body>
      </html>
    </ActualWorkspaceContextProvider>
  )
}