"use client"
import { SpaceTableType } from "@/@types/globalTypes"
import { onCreateTable, onTableNameUpdate } from "@/components/SpaceTable/utils/table-handler"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { BaseHTMLAttributes, useEffect, useState } from "react"
import { FaPencilAlt } from "react-icons/fa";
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
  const [isEditName, setIsEditName] = useState(false)

  const onSubmitSpaceTable = async () => {
    setIsEditName(false)

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
      {isInputName || isEditName
      ?
        <header {...rest} className={cn('flex gap-2 items-center pt-8 pb-5')} >
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
        <header className="pt-4 pb-5">
          <h3 className="pb-4 font-semibold flex gap-2">
            {tableName}
            <FaPencilAlt onClick={() => setIsEditName(true)} className="hover:text-slate-800 cursor-pointer" />
          </h3>
          <nav>
            <label className="text-xs text-slate-600 font-semibold">Menu:</label>
            <Input
              className="w-64"
              placeholder="Procurar" 
              type="search" 
            />
          </nav>
        </header>
      }
    </>
  )
}