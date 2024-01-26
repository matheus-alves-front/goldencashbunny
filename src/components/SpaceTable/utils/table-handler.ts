import { SpaceTableType } from "@/@types/globalTypes"
import { fetchInstanceWithCookies } from "@/api/fetchInstances"
import { FormEvent } from "react"

type ColumnConfig = {
  name: string;
  columnType: string;
} 

export type CreateUpdateRowColumnType = {
  rowReference: number,
  columnReference: number,
  value: string
}

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

  const newTable: SpaceTableType = await fetchInstanceWithCookies(`/space/table/${table.id}/column`, {
    method: 'POST',
    body: JSON.stringify(submitNewColumn)
  })

  return newTable
}

export async function onSubmitUpdateRowValue(
  rowColumns: CreateUpdateRowColumnType[],
  spaceTableId: string
) {  

  const newTable: SpaceTableType = await fetchInstanceWithCookies(`/space/table/${spaceTableId}/rows`, {
    method: 'PATCH',
    body: JSON.stringify(rowColumns)
  })

  return newTable
}

export async function onSubmitCreateRowValue(
  rowColumns: CreateUpdateRowColumnType[],
  spaceTableId: string,
) {  

  const newTable: SpaceTableType = await fetchInstanceWithCookies(`/space/table/${spaceTableId}/rows`, {
    method: 'POST',
    body: JSON.stringify(rowColumns)
  })

  return newTable
}

export async function onSubmitDeleteRow(spaceTableId: string, rowReference: number) {
  const rowDeleted = await fetchInstanceWithCookies(`/space/table/${spaceTableId}/row/references/${rowReference}`, {
    method: 'DELETE'
  })

  return rowDeleted
}