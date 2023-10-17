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

const TableColumns = [
  {
    columnname: 'nome',
    columntype: 'string'
  },
  {
    columnname: 'quantidade',
    columntype: 'number'
  },
  {
    columnname: 'data',
    columntype: 'date'
  },
  {
    columnname: 'outro',
    columntype: 'catalog'
  },
] as ColumnConfig[]

const TableData = [
  {
    nome: {
      type: 'text',
      value: 'aaaa'
    },
    quantidade: {
      type: 'number',
      value: '2'
    },
    data: {
      type: 'date',
      value: '30-03-2000'
    },
    outro: {
      type: 'catalog',
      value: '30-03-2000'
    },
  },
  {
    nome: {
      type: 'text',
      value: 'cccc'
    },
    quantidade: {
      type: 'number',
      value: '2'
    },
    data: {
      type: 'date',
      value: '30-03-2000'
    },
    outro: {
      type: 'catalog',
      value: '30-03-2000'
    },
  },
  {
    nome: {
      type: 'text',
      value: 'bbbb'
    },
    quantidade: {
      type: 'number',
      value: '5'
    },
    data: {
      type: 'date',
      value: '23-12-2000'
    },
    outro: {
      type: 'catalog',
      value: '30-03-2000'
    },
  },
] as any[]

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
        tableColumns={tableColumns}
        tableData={tableData} 
      />
    </>
  )
}