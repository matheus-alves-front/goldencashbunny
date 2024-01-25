"use client"
import { FullSpaceTablesType, SpaceTableType, SpaceType } from "@/@types/globalTypes"
import { HiOutlinePlus } from "react-icons/hi";
import styles from "./page.module.scss";
import { useState } from "react";
import { SpaceTable } from "@/components/SpaceTable/SpaceTable";

type SpacePageProps = {
  space: SpaceType,
  workspaceId: string,
  spaceTables: SpaceTableType[]
}

export default function SpacePageClient({
  space,
  workspaceId,
  spaceTables
}: SpacePageProps) {
  const [isCreateNewTable, setIsCreateNewTable] = useState(false)

  return (
    <>
      <h1 className={styles.pageTitle}>
        {space.name} 
        <button 
          className={styles.button}
          onClick={() => setIsCreateNewTable(!isCreateNewTable)}
        >
          <HiOutlinePlus />
        </button>
        <span className={styles.badge}><small>Criar Categoria</small></span>
      </h1>
      <>
        {isCreateNewTable && 
          <SpaceTable 
            workspaceId={workspaceId}
            spaceTable={{} as FullSpaceTablesType}
            space={space}
            onTableCreateFinish={() => setIsCreateNewTable(false)}
          />
        }
        {spaceTables.map((table) => (
          <SpaceTable 
            workspaceId={workspaceId}
            key={table.id}
            space={space}
            spaceTable={table}
          /> 
        ))}
      </>
    </>
  )
}