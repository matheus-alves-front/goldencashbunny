import { fetchInstanceWithCookies } from "@/api/fetchInstances";
import { FullSpaceTablesType,  SpaceType } from "@/@types/globalTypes";
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

  const space = spaces.find(space => space.id === spaceId)

  console.log(space)
  // @ts-ignore 
  if (!space) {
    return (
      <>
        <h1>Alguma coisa deu errado...</h1>
        {/* @ts-ignore */}
        <p>{space.error}</p>
      </>
    )
  }

  // const spaceTableComplete = await fetch(`${process.env.NEXT_API_URL}/api/tables?spaceRef=${space.id}`, {
  //   method: 'GET'
  // })

  // const spaceTables: FullSpaceTablesType[] = await spaceTableComplete.json()

  return (
    <>
      {/* <SpacePageClient 
        space={space}
        workspaceId={workspaceId}
        spaceTables={spaceTables}
      /> */}
    </>
  )
}