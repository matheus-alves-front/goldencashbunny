import { redirect } from 'next/navigation'
import { Open_Sans } from 'next/font/google'
import { WorkspaceType } from '@/@types/globalTypes'
import { fetchInstanceWithCookies } from '@/api/fetchInstances'
import { ActualWorkspaceContextProvider } from '@/contexts/ActualWorkspaceContext'
import { Header } from '@/components/Header/Header'
import { SidebarMenu } from '@/components/SidebarMenu/SidebarMenu'
import { useAccountJWT } from '@/hooks/useAccountJWT'
import { ThemeContextProvider } from '@/contexts/ThemeContext'

import './workspace.layout.css'
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

  const workspace: WorkspaceType = await fetchInstanceWithCookies(`/workspace/${workspaceId}`, {})

  return (
    <ActualWorkspaceContextProvider>
      <html lang="br">
        <body className={`${opensans.className}
          LayoutGrid grid-cols-layout grid-rows-layout w-full px-3 py-2
        `}>
          <ThemeContextProvider
            attribute='class'
            defaultTheme='light'
          >
            <Header 
              workspace={workspace} 
              account={account}
            />
            <SidebarMenu 
              workspace={workspace}
              css=''
            />
            <main className='border-t border-foreground p-2 pb-6 pr-0 overflow-auto'>
              {children}
            </main>
          </ThemeContextProvider>
        </body>
      </html>
    </ActualWorkspaceContextProvider>
  )
}