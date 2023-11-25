"use client"
import { FullSpaceTablesType, SpaceType } from "@/@types/globalTypes"
import { HiOutlinePlus } from "react-icons/hi";
import styles from "./page.module.scss";
import { useState } from "react";
import { SpaceTable } from "@/components/SpaceTable/SpaceTable";

type SpacePageProps = {
  space: SpaceType,
  workspaceId: string,
  spaceTables: FullSpaceTablesType[]
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
      <section>
        {isCreateNewTable && 
          <SpaceTable 
            spaceTable={{} as FullSpaceTablesType}
            space={space}
            onTableCreateFinish={() => setIsCreateNewTable(false)}
          />
        }
        {spaceTables.map((table) => (
          <SpaceTable 
            key={table.ref}
            space={space}
            spaceTable={table}
          /> 
        ))}
      </section>
    </>
  )
}