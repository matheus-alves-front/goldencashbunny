"use client"
import { fetchInstanceWithCookies } from "@/api/fetchInstances";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { SpaceType } from "@/@types/globalTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

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
    <section className="p-5">
      <Card className="w-full md:max-w-[500px] md:m-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold text-primary">Crie seu Espaço</h1>
          <p className="mb-2">
            Cada espaço te possibilita de organizar suas planilhas do seu jeito e integra-los cada uma em seus Dashboards
          </p>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-2 py-2" onSubmit={onCreateSpace}>
            <Input 
              type="text"
              name="name" 
              placeholder="Nome do Espaço"
            />
            <Button type="submit">
              Criar
            </Button>
          </form>
        </CardContent> 
      </Card>
    </section>
  )
}