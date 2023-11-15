import { HiOutlinePlus } from "react-icons/hi";
import styles from "./page.module.scss"
import Link from "next/link";
import { fetchInstanceWithCookies } from "@/api/account-requests";
import {  SpaceTableType, SpaceType } from "@/@types/globalTypes";
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

  const spaceTables: SpaceTableType[] = await fetchInstanceWithCookies(`/table?spaceRef=${space.ref}`, {
    method: 'GET'
  })

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