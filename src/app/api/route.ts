type ColumnConfig = {
  columnname: string;
  columntype: string;
} 

let TableColumns = [
  {
    columnname: 'nome',
    columntype: 'string'
  }
] as ColumnConfig[]

let TableData = [
  {
    nome: {
      type: 'text',
      value: 'aaaa'
    }
  },
  {
    nome: {
      type: 'text',
      value: 'cccc'
    }
  },
  {
    nome: {
      type: 'text',
      value: 'bbbb'
    }
  },
] as any[]

export async function GET(request: Request) {
  return Response.json({
    tableColumns: TableColumns,
    tableData: TableData,
  })
}

export async function POST(request: Request) {
  const res = await request.json() as ColumnConfig

  TableColumns = [...TableColumns, res]

  const TableDataNew = TableData.map((item) => {
    const newItem = { ...item };

    if (res.columntype === 'checkbox') {
      newItem[res.columnname] = {
        type: res.columntype, 
        value: false,
      };
    } else {
      newItem[res.columnname] = {
        type: res.columntype, 
        value: '',
      };
    }
  
    return newItem;
  });

  TableData = TableDataNew

  return Response.json({
    tableColumns: TableColumns,
    tableData: TableData,
  })
}