import { WorkspaceType } from "@/@types/globalTypes"
import { fetchInstance } from "@/api/account-requests"
import { cookies } from "next/headers"
import styles from './page.module.scss'
import { redirect } from "next/navigation"
import { WorkspacesClientPage } from "./pageClient"

export default async function WorkspacesPage() {
  const cookie = cookies()

  const xgoldentoken = cookie.get('xgoldentoken')

  const workspaces: WorkspaceType[] = await fetchInstance('/workspace', {
    headers: {
      "xgoldentoken": xgoldentoken ? xgoldentoken.value : ''
    }
  })

  // @ts-ignore
  if (!workspaces || workspaces.error) {
    redirect('register')
  }

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