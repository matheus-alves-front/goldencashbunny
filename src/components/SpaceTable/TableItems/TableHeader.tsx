"use client"
import { SpaceTableType } from "@/@types/globalTypes"
import { onCreateTable, onTableNameUpdate } from "@/components/SpaceTable/utils/table-handler"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { BaseHTMLAttributes, useEffect, useState } from "react"

interface TableHeaderProps extends BaseHTMLAttributes<HTMLHeadingElement> {
  isInputName: boolean,
  table: SpaceTableType,
  spaceRef: string,
  onSuccessSubmit: () => void
}

export function TableHeader({
  isInputName,
  spaceRef,
  table,
  onSuccessSubmit,
  ...rest
}: TableHeaderProps) {
  const [tableName, setTableName] = useState('')

  const onSubmitSpaceTable = async () => {
    if (isInputName || !tableName) {
      await onCreateTable(tableName, spaceRef)
      
      onSuccessSubmit()
    } else {
      await onTableNameUpdate(tableName, table.id)
    }
  }

  useEffect(() => {
    setTableName(table.name ? table.name : '')
  }, [])

  return (
    <>
      {isInputName
      ?
        <header {...rest} className={cn('flex gap-2 items-center pt-8')} >
          <Input
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Nome da Tabela" 
            type="text" 
          />
          <Button onClick={onSubmitSpaceTable}>
            Salvar
          </Button>
        </header>
      :
        <h3 className="pt-8 pb-5 font-semibold">{tableName}</h3>
      }
    </>
  )
}