"use client"
import { SpaceTableType, SpaceType } from "@/@types/globalTypes"
import { HiOutlinePlus } from "react-icons/hi";
import { TableCreation } from "@/components/TableCreation/TableCreation";
import styles from "./page.module.scss";
import { useState } from "react";
import { fetchInstanceWithCookies } from "@/api/account-requests";

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

  const onCreateTable = async (tableName: string) => await fetchInstanceWithCookies('/table', {
    method: 'POST',
    body: JSON.stringify({
      name: tableName
    })
  }) as SpaceTableType

  return (
    <>
      <h1 className={styles.pageTitle}>
        {space.name} 
        <button 
          className={styles.button}
          onClick={() => setIsCreateNewTable(true)}
        >
          <HiOutlinePlus />
        </button>
        <span className={styles.badge}><small>Criar Categoria</small></span>
      </h1>
      <section>
        {isCreateNewTable && 
          <TableCreation 
            isNewTable={isCreateNewTable} 
            space={space}
          />
        }
        {spaceTables.map((table) => (
          <TableCreation 
            key={table.ref}
            space={space}
            spaceTable={table}
          /> 
        ))}
      </section>
    </>
  )
}