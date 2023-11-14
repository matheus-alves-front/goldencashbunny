let fullworkspace = {
  name: `Lotus`,
  id: `463edrty43unoo6`,
  creationDate: `30/03/2000`,
  admins: [
    {
      id: `463edrty43unoo6`,
      name: `joao`,
      email: `joao@joao.com`,
      position: `owner`
    }
  ],
  dashboards: [],
  clients: [],
  catalog: [],
  configurations: [],
  precifications: [],
  spaces: [
    {
      id: `463edrty43unoo6`,
      name: `custos`,
      creationDate: `xx/xx/xxxx`,
      tables: [
       {
        id: `463edrty43unoo6`,
        name: `software`,
        creationDate: `xx/xx/xxxx`,
        tableColumns: [
          {
            columnname: 'nome',
            columntype: 'string'
          }
        ],
        tableData: [
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
          }
        ]
       }
      ],
      tableMetrics: [
        {
          id: `ijbhu3424bj32432y`,
          tableId: `463edrty43unoo6`,
          columnname: ``,
          columntype: ``,
          expression: `xx + x2`,
          value: ``
        }
      ]
    }
  ]
}

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