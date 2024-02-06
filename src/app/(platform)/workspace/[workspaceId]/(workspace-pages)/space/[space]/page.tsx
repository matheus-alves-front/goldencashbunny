import { fetchInstanceWithCookies } from "@/api/fetchInstances";
import { SpaceType } from "@/@types/globalTypes";
import SpacePageClient from "./page.client";
import { Suspense } from "react";
import Loading from "./Loading";

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

  const space: SpaceType = await fetchInstanceWithCookies(`/space/${spaceId}`, {
    method: 'GET'
  })

  return (
    <Suspense fallback={<Loading />}>
      <SpacePageClient 
        space={space}
        workspaceId={workspaceId}
        spaceTables={space.tables}
      />
    </Suspense>
  )
}