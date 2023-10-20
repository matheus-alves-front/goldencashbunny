"use client"
import { FormEvent, useEffect, useState } from 'react'
import styles from './tablecreation.module.scss'

const ColumnTypes = [
  'text',
  'number',
  'checkbox',
  'date',
  'file',
  'client',
  'catalog'
]

type ColumnConfig = {
  columnname: string;
  columntype: string;
} 

type TableDataConfig = {
  value: string;
  type: string
}

type TableCreationProps = {
  tableColumns: ColumnConfig[];
  tableData: any[];
  tableName: string;
  workspace: string;
  space: string;
  isInputMode?: boolean;
}

type TableFetchProps = {
  tableColumns: ColumnConfig[];
  tableData: TableDataConfig[];
}

export function TableCreation({
  tableColumns,
  tableData,
  tableName,
  workspace,
  space,
  isInputMode
}: TableCreationProps) {
  const [isNewColumnConfigDialog, setIsNewColumnConfigDialog] = useState(false)

  const [tableDataState, setTableDataState] = useState<any[]>([])
  const [tableColumnsState, setTableColumnsState] = useState<ColumnConfig[]>([])
  
  const onSubmitNewColumn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    
    const name = formData.get('columnname') as string;
    const type = formData.get('columntype') as string;

    const submitNewColumn: ColumnConfig = {
      columnname: name,
      columntype: type
    }

    await fetch('http://localhost:3000/api', {
      method: 'POST',
      body: JSON.stringify(submitNewColumn)
    })

    const newData = await fetch('http://localhost:3000/api', {
      method: 'GET',
    })

    const newDataJson = await newData.json() as TableFetchProps

    const {
      tableColumns: newTableColumns, 
      tableData: newTableData
    } = newDataJson 

    console.log('newTableColumns', newTableColumns)
    console.log('newTableData', newTableData)

    setTableDataState(newTableData)
    setTableColumnsState(newTableColumns)
    setIsNewColumnConfigDialog(false)
  }

  useEffect(() => {
    setTableDataState(tableData)
    setTableColumnsState(tableColumns)
  }, [])

  const onItemDataChange = ({
    value,
    column,
    item,
    index
  }: {
    value: string | boolean,
    column: ColumnConfig,
    item: TableDataConfig,
    index: number
  }) => {
    // console.log("valores parametros", {
    //   value,
    //   column,
    //   item,
    //   index
    // })
    const newTableDataState = [...tableDataState];
    newTableDataState[index][column.columnname].value = value
    console.log('newTableDataState[index]', newTableDataState[index][column.columnname].value)

    setTableDataState(newTableDataState)
  }

  return (
    <section className={styles.Content}>
      <input
        className={styles.InputName} 
        placeholder="Nome da Tabela" 
        type="text" 
      />
      <table>
        <thead>
          <tr>
            {tableColumnsState?.map(column => (
              <th key={column.columnname}>
                {column.columnname}
              </th>
            ))}

            {/* Fixed THeads */}
            <th  
              className={styles.creation}
            >
              <button 
                onClick={() => setIsNewColumnConfigDialog(!isNewColumnConfigDialog)} 
              >
                + {tableColumnsState?.length < 1 && 'Adicionar Coluna'}
              </button>

              {/* Column Configuration */}
              <dialog open={isNewColumnConfigDialog}>
                <form onSubmit={onSubmitNewColumn}>
                  <input
                    name='columnname'
                    placeholder='Nome da Coluna' 
                    type="text" 
                  />
                  <label htmlFor="columntype">
                    Tipo
                  </label>
                  <select name="columntype" id="columntype">
                    {ColumnTypes.map((type) => (
                      <option 
                        value={type}
                        key={type}
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                  <footer>
                    <button 
                      className={styles.resetCreation}
                      onClick={() => setIsNewColumnConfigDialog(false)}
                      type="reset"
                    >
                      Cancelar
                    </button>
                    <button 
                      className={styles.submitCreation}
                      type="submit"
                    >
                      Criar
                    </button>
                  </footer>
                </form>
              </dialog>
            </th>
            {tableColumnsState?.length < 1 && 
              <th className={styles.empty}></th>
            }
            <th>
              Açoes
            </th>
          </tr>
        </thead>
        <tbody>
          {tableDataState.map((item, index) => (
            <tr key={index}>
              {tableColumnsState?.map(column => (
                <td key={column.columnname}>
                  {item[column.columnname]?.type !== 'catalog' && item[column.columnname]?.type !== 'client' 
                    ?  
                    <input
                      value={item[column.columnname].value}
                      checked={
                        item[column.columnname].type === 'checkbox' 
                        ? item[column.columnname].value 
                        : false
                      }
                      onChange={(e) => {
                        const value = item[column.columnname].type === 'checkbox' 
                        ? e.target.checked
                        : e.target.value 

                        onItemDataChange({
                          value,
                          column,
                          item,
                          index
                        })
                      }}
                      type={column.columntype}
                    />
                    : item[column.columnname].value
                  }
                </td>
              ))}

              {/* Fixed Columns */}
              <td className={styles.creation}>
              </td>
              {tableColumnsState?.length < 1 && 
                <td className={styles.empty}></td>
              }
              <td>
                <button>Detalhes</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}