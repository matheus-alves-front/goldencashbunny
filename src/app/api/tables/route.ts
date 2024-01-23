import { SpaceTableType, TableColumnType, TableDataType } from "@/@types/globalTypes";
import { fetchInstanceWithCookies } from "@/api/fetchInstances";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const spaceRef = searchParams.get('spaceRef')

  const spaceTables: SpaceTableType[] = await fetchInstanceWithCookies(`/table?spaceRef=${spaceRef}`, {
    method: 'GET'
  })

  const completeSpaceTables: SpaceTableType[] = []

  for (let i = 0; i < spaceTables.length; i++) {
    const actualTableRef = spaceTables[i].ref

    const getTableColumns: TableColumnType[] = await fetchInstanceWithCookies(`/table/${actualTableRef}/column`, {
      method: 'GET'
    })

    const getTableData: TableDataType[] = await fetchInstanceWithCookies(`/table/${actualTableRef}/data`, {
      method: 'GET'
    })

    const completeSpaceTable = {
      ...spaceTables[i],
      columns: getTableColumns, 
      data: getTableData
    }

    completeSpaceTables.push(completeSpaceTable)
  }

  return Response.json(completeSpaceTables)
}