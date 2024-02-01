import { WorkspaceType } from "@/@types/globalTypes"
import { redirect } from "next/navigation"
import { fetchInstanceWithCookies} from "@/api/fetchInstances"
import { useAccountJWT } from "@/hooks/useAccountJWT"
import { WorkspacesClientPage } from "./pageClient"

export default async function WorkspacesPage() {
  const account = await useAccountJWT()

  if (!account) {
    return redirect('/')
  }

  let workspaces: WorkspaceType[] = await fetchInstanceWithCookies(`/workspace/account/${account.id}`, {})

  // tratar erro
  if (!workspaces) workspaces = []

  return (
    <main className="container">
      <header 
        className="w-full min-h-48 p-11 bg-foreground text-primary-foreground text-center 
          flex flex-col align-center justify-center my-5 rounded-xl
        "
      >
        <h1 className="text-4xl font-bold">Workspaces</h1>
        <h2>Crie ou selecione seu workspace</h2>
      </header>
      <WorkspacesClientPage 
        account={account}
        workspaces={workspaces} 
      />
    </main>
  )
}