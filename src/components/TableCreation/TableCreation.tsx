"use client"
import { FormEvent, useState } from 'react'
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

type TableCreationProps = {
  tableColumns: ColumnConfig[];
  tableData: any[];
  tableName: string;
  workspace: string;
  space: string;
}

export function TableCreation({
  tableColumns,
  tableData,
  tableName,
  workspace,
  space,
}: TableCreationProps) {
  const [isNewColumnConfigDialog, setIsNewColumnConfigDialog] = useState(false)
  
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
            {tableColumns?.map(column => (
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
                + {tableColumns?.length < 1 && 'Adicionar Coluna'}
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
            {tableColumns?.length < 1 && 
              <th className={styles.empty}></th>
            }
            <th>
              Açoes
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, index) => (
            <tr key={index}>
              {tableColumns?.map(column => (
                <td key={column.columnname}>
                  {item[column.columnname].type !== 'catalog' && item[column.columnname].type !== 'client' 
                    ?  
                    <input 
                      defaultValue={item[column.columnname].value}
                      type={column.columntype}
                    />
                    : item[column.columnname].value
                  }
                </td>
              ))}

              {/* Fixed Columns */}
              <td className={styles.creation}>
              </td>
              {tableColumns?.length < 1 && 
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