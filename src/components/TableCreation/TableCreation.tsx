"use client"
import { FormEvent, useEffect, useState } from 'react'
import styles from './tablecreation.module.scss'

import { TfiArrowsVertical } from "react-icons/tfi";
import { PiTrashBold } from "react-icons/pi";
import { SpaceTableType, SpaceType, TableColumnType } from '@/@types/globalTypes';
import { DialogItem } from '../SpaceTable/TableItems/Dialog';
import { fetchInstanceWithCookies } from '@/api/account-requests';
import { getAllColumnsFromTable, getAllDataFromTable, onCreateTable, onSubmitNewColumn, onTableNameUpdate } from '../SpaceTable/utils/table-handler';
import { useRouter } from 'next/navigation';

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
  columnName: string;
  columnType: string;
} 

type TableDataConfig = {
  value: string;
  type: string
}

type TableCreationProps = {
  spaceTable?: SpaceTableType,
  space: SpaceType,
  isNewTable?: boolean,
  onTableCreateFinish?: () => void,
}

type TableFetchProps = {
  tableColumns: ColumnConfig[];
  tableData: TableDataConfig[];
}

export function TableCreation({
  spaceTable,
  space,
  isNewTable,
  onTableCreateFinish
}: TableCreationProps) {
  const router = useRouter()
  const [tableName, setTableName] = useState('')
  const [table, setTable] = useState<SpaceTableType | null>(null)

  const [isEditTableName, setIsEditTableName] = useState(false)
  const [isNewColumnConfigDialog, setIsNewColumnConfigDialog] = useState(false)

  const [tableDataState, setTableDataState] = useState<any[]>([])
  const [tableColumnsState, setTableColumnsState] = useState<TableColumnType[]>([])
  
  const onCreateNewTable = async () => {
    const newTable = await onCreateTable(tableName, space.ref)
    setTable(newTable)
    onTableCreateFinish && onTableCreateFinish()
    router.refresh()
  }

  // const onItemDataChange = ({
  //   value,
  //   column,
  //   item,
  //   index
  // }: {
  //   value: string | boolean,
  //   column: ColumnConfig,
  //   item: TableDataConfig,
  //   index: number
  // }) => {
  //   // console.log("valores parametros", {
  //   //   value,
  //   //   column,
  //   //   item,
  //   //   index
  //   // })
  //   const newTableDataState = [...tableDataState];
  //   newTableDataState[index][column.columnname].value = value
  //   console.log('newTableDataState[index]', newTableDataState[index][column.columnname].value)

  //   setTableDataState(newTableDataState)
  // }

  // const onDragStartListReorder = (e: DragEvent<HTMLTableRowElement>, index: number): void => {
  //   e.dataTransfer.setData('index', index.toString());
  // };

  // const onDragOverListReorder = (e: DragEvent<HTMLTableRowElement>, index: number): void => {
  //   e.preventDefault();
  //   const draggedIndex = Number(e.dataTransfer.getData('index'));
  //   if (draggedIndex === index) return;
  //   const reorderArray = [...tableDataState];
  //   reorderArray.splice(index, 0, reorderArray.splice(draggedIndex, 1)[0]);
  //   setTableDataState(reorderArray);
  // };

  useEffect(() => {
    setTableName(spaceTable ? spaceTable.name : '')
    setTable(spaceTable ? spaceTable : null)
    spaceTable && onRenderTable(spaceTable).catch(e => console.log(e))
  }, [])

  useEffect(() => {
    if(table?.name === 'escroto') {
      console.log(table)
    }
  }, [tableColumnsState])

  const onRenderTable = async (tableParam: SpaceTableType) => {
    const getColumns = await getAllColumnsFromTable(tableParam)
    setTableColumnsState(getColumns)
    console.log("getColumns", tableParam?.name, getColumns)
    const getAllTableData = await getAllDataFromTable(tableParam)
    console.log("getAllTableData", tableParam?.name, getAllTableData)
  }

  return (
    <section className={styles.Content}>
      {isNewTable || isEditTableName
      ?
        <div className={styles.InputName}>
          <input
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            placeholder="Nome da Tabela" 
            type="text" 
          />
          <button onClick={
            table
            ? () => onTableNameUpdate(tableName, table)
            : () => onCreateNewTable()
          }>
            Salvar
          </button>
        </div>
      :
        <h3>{tableName}</h3>
      }

      <table>
        {table && 
          <thead>
            <tr>
              {tableColumnsState?.map(column => (
                <th key={column.ref}>
                  {column.columnName}
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
                <DialogItem 
                  columnTypes={ColumnTypes}
                  isNewColumnConfigDialog={isNewColumnConfigDialog}
                  onSubmitNewColumn={(e) => onSubmitNewColumn(e, table, setTableColumnsState)}
                  setIsNewColumnConfigDialog={() => setIsNewColumnConfigDialog(false)}
                  styles={styles}
                />
              </th>
              {tableColumnsState?.length < 1 && 
                <th className={styles.empty}></th>
              }
              <th>
                Açoes
              </th>
            </tr>
          </thead>
        }

        <tbody>
          {tableDataState.map((item, index) => (
            <tr key={index} 
              draggable
              // onDragStart={(e) => onDragStartListReorder(e, index)}
              // onDragOver={(e) => onDragOverListReorder(e, index)}
            >
              {tableColumnsState?.map(column => (
                <td key={column.ref}>
                  {item[column.columnName]?.type !== 'catalog' && item[column.columnName]?.type !== 'client' 
                    ?  
                    <input
                      value={item[column.columnName].value}
                      checked={
                        item[column.columnName].type === 'checkbox' 
                        ? item[column.columnName].value 
                        : false
                      }
                      onChange={(e) => {
                        const value = item[column.columnName].type === 'checkbox' 
                        ? e.target.checked
                        : e.target.value 

                        // onItemDataChange({
                        //   value,
                        //   column,
                        //   item,
                        //   index
                        // })
                      }}
                      type={column.columnType}
                    />
                    : item[column.columnName].value
                  }
                </td>
              ))}

              {/* Fixed Columns */}
              <td className={styles.creation}>
              </td>
              {tableColumnsState?.length < 1 && 
                <td className={styles.empty}></td>
              }
              <td className={styles.actions}>
                <button>Detalhes</button>
                <button className={styles.exclude}>
                  <PiTrashBold 
                  />
                </button>
                
                <TfiArrowsVertical 
                  className={styles.reorder}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}