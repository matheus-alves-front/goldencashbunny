import { SpaceTable } from "@/components/SpaceTable/SpaceTable"
import { TableCreation } from "@/components/TableCreation/TableCreation"

type ColumnConfig = {
  columnname: string;
  columntype: string;
} 

type TableResponse = {
  tableColumns: ColumnConfig[],
  tableData: any[]
} 

export default async function CreateTablePage({
  params
}: {
  params: { 
    space: string,
    workspacename: string  
  }
}) {
  const {
    space, 
    workspacename
  } = params

  const getFullResponse = async () => {
    const getapi = await fetch('http://localhost:3000/api', {
      method: 'GET'
    })
  
    const {
      tableColumns,
      tableData
    }: TableResponse = await getapi.json()
  
    return {
      tableColumns,
      tableData
    }
  }

  const {
    tableColumns,
    tableData
  } = await getFullResponse()

  console.log({
    tableColumns,
    tableData
  })
  
  return (
    <>
      <h1>Criação de tabela</h1>
      <h2>{space}</h2>

      <TableCreation 
        space={space}
        workspace={workspacename}
        tableName="hehehe"
        tableColumns={tableColumns}
        tableData={tableData} 
      />
    </>
  )
}