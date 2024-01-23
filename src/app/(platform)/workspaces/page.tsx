import { WorkspaceType } from "@/@types/globalTypes"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { fetchInstanceWithCookies} from "@/api/fetchInstances"
import { useAccountJWT } from "@/hooks/useAccountJWT"
import { WorkspacesClientPage } from "./pageClient"
import styles from './page.module.scss'

export default async function WorkspacesPage() {
  const cookie = cookies()

  const xgoldentoken = cookie.get('xgoldentoken')
  const account = await useAccountJWT()

  if (!account) {
    return redirect('/')
  }

  const workspaces: WorkspaceType[] = await fetchInstanceWithCookies(`/workspace/account/${account.id}`, {})

  return (
    <main className={styles.Main}>
      <header className={styles.Header}>
        <h1>Workspaces</h1>
        <h2>Crie ou selecione seu workspace</h2>
      </header>
      <WorkspacesClientPage 
        xgoldentoken={String(xgoldentoken?.value)}
        workspaces={workspaces} 
      />
    </main>
  )
}