import { SpaceTableType, TableColumnType, TableDataType } from "@/@types/globalTypes"
import { fetchInstanceWithCookies } from "@/api/fetchInstances"
import { FormEvent } from "react"

export const onCreateTable = async (
  name: string,
  spaceRef: string
) => {
  let createTablePost: SpaceTableType = await fetchInstanceWithCookies('/table', {
    method: 'POST',
    body: JSON.stringify({
      spaceRef,
      data: {
        name
      }
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
  columnName: string;
  columnType: string;
} 

export const onSubmitNewColumn = async (
  e: FormEvent<HTMLFormElement>,
  table: SpaceTableType,
  onSuccess: (columns: TableColumnType[]) => void
) => {
  e.preventDefault()
  
  const formData = new FormData(e.currentTarget)
  
  const name = formData.get('columnname') as string;
  const type = formData.get('columntype') as string;

  const submitNewColumn: ColumnConfig = {
    columnName: name,
    columnType: type
  }

  await fetchInstanceWithCookies(`/table/${table?.ref}/column`, {
    method: 'POST',
    body: JSON.stringify(submitNewColumn)
  })

  const getUpdatedTableColumns = await fetchInstanceWithCookies(`/table/${table?.ref}/column`, {
    method: 'GET'
  })


  onSuccess(getUpdatedTableColumns)
}

export const getAllColumnsFromTable = async (table: SpaceTableType | null) => {
  const getTableColumns: TableColumnType[] = await fetchInstanceWithCookies(`/table/${table?.ref}/column`, {
    method: 'GET'
  })

  return getTableColumns
}

export const getAllDataFromTable = async (table: SpaceTableType | null) => {
  const getTableData: TableDataType[] = await fetchInstanceWithCookies(`/table/${table?.ref}/column`, {
    method: 'GET'
  })

  return getTableData
}