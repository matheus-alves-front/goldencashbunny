"use client"
import { FormEvent, useState } from "react"
import { WorkspaceType } from "@/@types/globalTypes"
import styles from './page.module.scss'
import Link from "next/link"
import { IoAlbums } from "react-icons/io5"
import { fetchInstance, setCookies } from "@/api/account-requests"
import { useRouter } from "next/navigation"

export function WorkspacesClientPage({
  workspaces,
  xgoldentoken
}: {
  workspaces: WorkspaceType[],
  xgoldentoken: string
}) {
  const router = useRouter()
  const [isNewWorkspace, setIsNewWorkspace] = useState(false)

  const onCreateWorkspace = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const target = e.target as HTMLFormElement

    const companyname = target.elements.namedItem("companyname") as HTMLInputElement;
    const socialcompanyname = target.elements.namedItem("socialcompanyname") as HTMLInputElement;
    const cnpj = target.elements.namedItem("cnpj") as HTMLInputElement;

    const bodyRequest = {
      companyname: companyname.value,
      socialcompanyname: socialcompanyname.value,
      cnpj: Number(cnpj.value)
    }

    await fetchInstance('/workspace', {
      method: 'POST',
      headers: {
        "xgoldentoken": xgoldentoken
      },
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
              onClick={() => setCookies(xgoldentoken, workspace.id)}
              href={`workspace/${workspace.id}/dashboard`} 
            >
              <span>{workspace.companyname} Workspace</span>
              <span>{workspace.socialcompanyname}</span>
              <span>{workspace.cnpj}</span>
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