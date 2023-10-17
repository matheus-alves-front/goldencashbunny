let TableColumns = [
  {
    columnname: 'nome',
    columntype: 'string'
  },
  {
    columnname: 'quantidade',
    columntype: 'number'
  },
]

let TableData = [
  {
    nome: {
      type: 'text',
      value: 'aaaa'
    },
    quantidade: {
      type: 'number',
      value: '2'
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
  },
] as any[]

export async function GET(request: Request) {
  return Response.json({
    tableColumns: TableColumns,
    tableData: TableData,
  })
}

export async function POST(request: Request) {
  const res = await request.json()

  TableColumns = [...TableColumns, res]

  const TableDataNew = TableData.map((item) => {
    const newItem = { ...item }; // Crie uma cópia do objeto existente
  
    // Adicione a nova coluna com o nome de res.columnname e um valor inicial vazio
    newItem[res.columnname] = {
      type: res.columntype, // Utilize o tipo do res para a nova coluna
      value: '',
    };
  
    return newItem;
  });

  TableData = TableDataNew

  return Response.json({
    tableColumns: TableColumns,
    tableData: TableData,
  })
}