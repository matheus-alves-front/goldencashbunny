"use client"
import { FormEvent, useContext, useState } from "react"
import { JWTAccountType, WorkspaceType } from "@/@types/globalTypes"
import styles from './page.module.scss'
import Link from "next/link"
import { IoAlbums } from "react-icons/io5"
import { fetchInstanceWithCookies } from "@/api/fetchInstances"
import { useRouter } from "next/navigation"
import { ActualWorkspaceContext } from "@/contexts/ActualWorkspaceContext"

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
     <section className={styles.Section}>
      {workspaces.length ? 
        <>
          {workspaces.map((workspace) => (
            <Link 
              key={workspace.id}
              className={styles.workspacesButton}
              onClick={() => UpdateActiveWorkspace(workspace)}
              href={`workspace/${workspace.id}/dashboard`} 
            >
              <span>{workspace.companyName} Workspace</span>
              <span>{workspace.socialCompanyName}</span>
              <IoAlbums className={styles.Icon} />
            </Link>
          ))}
        </>
      : null}
      {isNewWorkspace 
        ? 
          <form 
            onSubmit={onCreateWorkspace}
            className={styles.createWorkspaceForm}
          >
            <input 
              type="text" 
              placeholder="Nome da Empresa"
              name="companyname"
            />
            <input 
              type="text" 
              placeholder="Nome Social"
              name="socialcompanyname"
            />
            <input 
              type="number" 
              placeholder="cnpj"
              name="cnpj"
            />
            <button type="submit">
              Criar
            </button>
          </form>
        :
          <button 
            className={styles.createWorkspace}
            onClick={() => setIsNewWorkspace(true)}
          >
            <span>+</span>
          </button>
        }
      </section>
      
    </>
  )
}