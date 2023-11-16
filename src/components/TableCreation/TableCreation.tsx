"use client"
import { FormEvent, useEffect, useState } from 'react'
import styles from './tablecreation.module.scss'

import { TfiArrowsVertical } from "react-icons/tfi";
import { PiTrashBold } from "react-icons/pi";
import { SpaceTableType, SpaceType } from '@/@types/globalTypes';
import { DialogItem } from './TableItems/Dialog';
import { fetchInstanceWithCookies } from '@/api/account-requests';
import { onCreateTable, onTableNameUpdate } from './utils/table-handler';
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
  columnname: string;
  columntype: string;
} 

type TableDataConfig = {
  value: string;
  type: string
}

type TableCreationProps = {
  spaceTable?: SpaceTableType,
  space: SpaceType,
  isNewTable?: boolean,
  onCreateTable?: () => Promise<SpaceTableType>,
}

type TableFetchProps = {
  tableColumns: ColumnConfig[];
  tableData: TableDataConfig[];
}

export function TableCreation({
  spaceTable,
  space,
  isNewTable
}: TableCreationProps) {
  const router = useRouter()
  const [tableName, setTableName] = useState('')
  const [isEditTableName, setIsEditTableName] = useState(false)
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

    console.log(submitNewColumn)

    const submitTableColumn = await fetchInstanceWithCookies(`/table/${spaceTable?.ref}/column`, {
      method: 'POST',
      body: JSON.stringify(submitNewColumn)
    })

    console.log(submitTableColumn)
    // const newData = await fetch('http://localhost:3000/api', {
    //   method: 'GET',
    // })

    // const newDataJson = await newData.json() as TableFetchProps

    // const {
    //   tableColumns: newTableColumns, 
    //   tableData: newTableData
    // } = newDataJson 

    // console.log('newTableColumns', newTableColumns)
    // console.log('newTableData', newTableData)

    // setTableDataState(newTableData)
    // setTableColumnsState(newTableColumns)
    // setIsNewColumnConfigDialog(false)
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
  }, [])

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
            spaceTable
            ? () => onTableNameUpdate(tableName, spaceTable)
            : async () => {
              await onCreateTable(tableName, space.ref)
              console.log(tableName, space.ref)
            }
          }>
            Salvar
          </button>
        </div>
      :
        <h3>{tableName}</h3>
      }
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
              <DialogItem 
                columnTypes={ColumnTypes}
                isNewColumnConfigDialog={isNewColumnConfigDialog}
                onSubmitNewColumn={(e) => onSubmitNewColumn(e)}
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

        <tbody>
          {tableDataState.map((item, index) => (
            <tr key={index} 
              draggable
              // onDragStart={(e) => onDragStartListReorder(e, index)}
              // onDragOver={(e) => onDragOverListReorder(e, index)}
            >
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

                        // onItemDataChange({
                        //   value,
                        //   column,
                        //   item,
                        //   index
                        // })
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