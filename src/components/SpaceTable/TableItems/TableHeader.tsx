"use client"
import { SpaceTableType } from "@/@types/globalTypes"
import { onCreateTable, onTableNameUpdate } from "@/components/SpaceTable/utils/table-handler"
import { AllHTMLAttributes, BaseHTMLAttributes, useEffect, useState } from "react"

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
    console.log("isInputName", isInputName)
    if (isInputName || !tableName) {
      await onCreateTable(tableName, spaceRef)
      
      onSuccessSubmit()
    } else {
      await onTableNameUpdate(tableName, table.ref)
    }
  }

  useEffect(() => {
    setTableName(table.name ? table.name : '')
  }, [])

  return (
    <>
      {isInputName
      ?
        <header {...rest}>
          <input
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Nome da Tabela" 
            type="text" 
          />
          <button onClick={onSubmitSpaceTable}>
            Salvar
          </button>
        </header>
      :
        <h3>{tableName}</h3>
      }
    </>
  )
}