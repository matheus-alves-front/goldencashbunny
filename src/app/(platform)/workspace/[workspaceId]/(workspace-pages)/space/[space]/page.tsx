import { fetchInstanceWithCookies } from "@/api/fetchInstances";
import { SpaceType } from "@/@types/globalTypes";
import SpacePageClient from "./page.client";

export default async function SpacePage({
  params
}: {
  params: { 
    space: string,
    workspaceId: string  
  }
}) {
  const {
    workspaceId ,
    space: spaceId
  } = params

  const spaces: SpaceType[] = await fetchInstanceWithCookies(`/workspace/${workspaceId}/spaces`, {
    method: 'GET'
  })

  const space = spaces.find(space => space.id === spaceId) as SpaceType

  return (
    <SpacePageClient 
      space={space}
      workspaceId={workspaceId}
      spaceTables={space.tables}
    />
  )
}