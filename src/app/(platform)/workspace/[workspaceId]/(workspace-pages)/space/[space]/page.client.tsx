"use client"
import { FullSpaceTablesType, SpaceTableType, SpaceType } from "@/@types/globalTypes"
import { HiOutlinePlus } from "react-icons/hi";
import { Suspense, useState } from "react";
import { SpaceTable } from "@/components/SpaceTable/SpaceTable";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Loading from "./Loading";

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
    <section className={cn('px-3 py-6')}>
      <h1 className="text-3xl font-bold text-slate-700 dark:text-gray-200 mb-5">
        {space.name} 
        <Button
          variant={'goldenPrimary'}
          className={cn('font-bold text-lg rounded-3xl py-0 px-3 ml-4 mr-1')} 
          onClick={() => setIsCreateNewTable(!isCreateNewTable)}
        >
          <HiOutlinePlus />
        </Button>
        <Badge variant={'secondary'}><small>Criar Categoria</small></Badge>
      </h1>
    
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
    </section>
  )
}