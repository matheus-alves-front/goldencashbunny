"use client"
import { FormEvent, useContext, useState } from "react"
import { JWTAccountType, WorkspaceType } from "@/@types/globalTypes"
import Link from "next/link"
import { IoAlbums } from "react-icons/io5"
import { fetchInstanceWithCookies } from "@/api/fetchInstances"
import { useRouter } from "next/navigation"
import { ActualWorkspaceContext } from "@/contexts/ActualWorkspaceContext"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function WorkspacesClientPage({
  workspaces,
  account
}: {
  workspaces: WorkspaceType[],
  account: JWTAccountType
}) {
  const router = useRouter()
  const { UpdateActiveWorkspace } = useContext(ActualWorkspaceContext)
  const [isNewWorkspace, setIsNewWorkspace] = useState(false)

  const onCreateWorkspace = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const target = e.target as HTMLFormElement

    const companyname = target.elements.namedItem("companyname") as HTMLInputElement;
    const socialcompanyname = target.elements.namedItem("socialcompanyname") as HTMLInputElement;

    const bodyRequest = {
      companyName: companyname.value,
      socialCompanyName: socialcompanyname.value
    }

    await fetchInstanceWithCookies(`/workspace/account/${account.id}`, {
      method: 'POST',
      body: JSON.stringify(bodyRequest)
    })

    router.refresh()
    setIsNewWorkspace(false)
  }

  return (
    <>
     <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 items-stretch">
      {workspaces.length ? 
        <>
          {workspaces.map((workspace) => (
            <Link 
              key={workspace.id}
              className="p-5 bg-foreground text-primary-foreground rounded
              relative"
              // onClick={() => UpdateActiveWorkspace(workspace)}
              href={`workspace/${workspace.id}/dashboard`} 
            >
              <h5 className="font-bold">Workspace</h5>
              <span>{workspace.companyName}</span>
              <br />
              <span>{workspace.socialCompanyName}</span>
              <IoAlbums className="absolute right-2 bottom-2 text-2xl" />
            </Link>
          ))}
        </>
      : null}
      {isNewWorkspace 
        ? 
          <form 
            onSubmit={onCreateWorkspace}
            className="p-5 bg-foreground font-bold
            rounded flex flex-col gap-2"
          >
            <Input 
              type="text" 
              placeholder="Nome da Empresa"
              name="companyname"
            />
            <Input 
              type="text" 
              placeholder="Nome Social"
              name="socialcompanyname"
            />
            <Input 
              type="number" 
              placeholder="cnpj"
              name="cnpj"
            />
            <Button variant={'secondary'} type="submit">
              Criar
            </Button>
          </form>
        :
          <button 
            className="p-5 bg-foreground text-primary-foreground font-bold text-4xl
            py-20 rounded"
            onClick={() => setIsNewWorkspace(true)}
          >
            <span>+</span>
          </button>
        }
      </section>
    </>
  )
}