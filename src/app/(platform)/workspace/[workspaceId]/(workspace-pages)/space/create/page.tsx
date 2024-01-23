"use client"
import { fetchInstanceWithCookies } from "@/api/fetchInstances";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import styles from './page.module.scss';
import { SpaceType } from "@/@types/globalTypes";

export default function SpaceCreatePage({
  params
}: {
  params: {
    workspaceId: string
  }
}) {
  const { workspaceId } = params
  const router = useRouter()

  const onCreateSpace = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const target = e.target as HTMLFormElement

    const name = target.elements.namedItem("name") as HTMLInputElement;

    const postSpace: SpaceType = await fetchInstanceWithCookies(`/workspace/${workspaceId}/space`, {
      method: 'POST',
      body: JSON.stringify({
        name: name.value
      })
    }) 

    if (postSpace) {
      router.push(`${postSpace.id}`)
    }
  }

  return (
    <>
      <section className={styles.Container}>
        <h1>Crie seu Espaço</h1>
        <p>
          Cada espaço te possibilita de organizar suas planilhas do seu jeito e integra-los cada uma em seus Dashboards
        </p>
        <form onSubmit={onCreateSpace}>
          <input 
            type="text"
            name="name" 
            placeholder="Nome do Espaço"
          />
          <button type="submit">
            Criar
          </button>
        </form>
      </section>
    </>
  )
}