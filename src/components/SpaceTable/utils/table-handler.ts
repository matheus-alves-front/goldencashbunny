import { SpaceTableType, TableColumnType, TableDataType } from "@/@types/globalTypes"
import { fetchInstanceWithCookies } from "@/api/fetchInstances"
import { ChangeEvent, FormEvent } from "react"
import { FormattedRowsColumns } from "./tableDataFormat"

export const onCreateTable = async (
  name: string,
  spaceRef: string
) => {
  let createTablePost: SpaceTableType = await fetchInstanceWithCookies(`/space/${spaceRef}/table`, {
    method: 'POST',
    body: JSON.stringify({
      name
    })
  })

  console.log("createTablePost,", createTablePost)
  // @ts-ignore
  if (!createTablePost || createTablePost.error) {
    return null
  }

  return createTablePost
}

export const onTableNameUpdate = async (
  name: string,
  spaceRef: string
) => {
  let createTableObject = {
    spaceRef,
    data: {
      name
    }
  }
  
  let updateTablePost: SpaceTableType = await fetchInstanceWithCookies('/table', {
    method: 'POST',
    body: JSON.stringify(createTableObject)
  })

  // @ts-ignore
  if (!updateTablePost || updateTablePost.error) {
    return null
  }

  return updateTablePost
}

type ColumnConfig = {
  name: string;
  columnType: string;
} 

export const onSubmitNewColumn = async (
  e: FormEvent<HTMLFormElement>,
  table: SpaceTableType,
) => {
  e.preventDefault()
  
  const formData = new FormData(e.currentTarget)
  
  const name = formData.get('columnname') as string;
  const type = formData.get('columntype') as string;

  const submitNewColumn: ColumnConfig = {
    name,
    columnType: type
  }

  console.log(submitNewColumn)

  const newTable: SpaceTableType = await fetchInstanceWithCookies(`/space/table/${table.id}/column`, {
    method: 'POST',
    body: JSON.stringify(submitNewColumn)
  })

  return newTable
}

export async function onSubmitUpdateRowValue(
  value: string,
  tableRowId: string
) {  

  const newTable: SpaceTableType = await fetchInstanceWithCookies(`/space/table/column/row/${tableRowId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      value: value
    })
  })

  return newTable
}

export async function onSubmitCreateRowValue(
  value: string,
  tableColumnId: string,
  rowReference: number
) {  

  const newTable: SpaceTableType = await fetchInstanceWithCookies(`/space/table/column/${tableColumnId}/row`, {
    method: 'POST',
    body: JSON.stringify({
      rowReference,
      value
    })
  })

  return newTable
}