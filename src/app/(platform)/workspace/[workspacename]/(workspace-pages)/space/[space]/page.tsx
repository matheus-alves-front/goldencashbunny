import { fetchInstanceWithCookies } from "@/api/account-requests";
import {  SpaceTableType, SpaceType, TableColumnType, TableDataType } from "@/@types/globalTypes";
import SpacePageClient from "./page.client";

interface FullSpaceTables extends SpaceTableType {
  columns: TableColumnType[],
  data: TableDataType
}

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

  const spaceTableComplete = await fetch(`http://localhost:3000/api/tables?spaceRef=${space.ref}`, {
    method: 'GET'
  })

  const spaceTables: FullSpaceTables[] = await spaceTableComplete.json()

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