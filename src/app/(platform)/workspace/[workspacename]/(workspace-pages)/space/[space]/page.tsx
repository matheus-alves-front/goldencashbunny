import { fetchInstanceWithCookies } from "@/api/account-requests";
import { FullSpaceTablesType,  SpaceType } from "@/@types/globalTypes";
import SpacePageClient from "./page.client";

export default async function SpacePage({
  params
}: {
  params: { 
    space: string,
    workspacename: string  
  }
}) {
  const {
    workspacename: workspaceId,
    space: spaceId
  } = params

  const space: SpaceType = await fetchInstanceWithCookies(`/space/${spaceId}`, {
    method: 'GET'
  })

  // @ts-ignore 
  if (!space || space.error) {
    return (
      <>
        <h1>Alguma coisa deu errado...</h1>
        {/* @ts-ignore */}
        <p>{space.error}</p>
      </>
    )
  }

  const spaceTableComplete = await fetch(`${process.env.NEXT_API_URL}/api/tables?spaceRef=${space.ref}`, {
    method: 'GET'
  })

  const spaceTables: FullSpaceTablesType[] = await spaceTableComplete.json()

  return (
    <>
      <SpacePageClient 
        space={space}
        workspaceId={workspaceId}
        spaceTables={spaceTables}
      />
    </>
  )
}