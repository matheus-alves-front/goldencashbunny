"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { TfiArrowsVertical } from "react-icons/tfi";
import { PiTrashBold } from "react-icons/pi";
import { FullSpaceTablesType, SpaceTableType, SpaceType, TableColumnType } from '@/@types/globalTypes';
import styles from './tablecreation.module.scss'
import { 
  onSubmitNewColumn, 
} from './utils/table-handler';
import { DialogItem } from './TableItems/Dialog';
import { TableHeader } from './TableItems/TableHeader';
import { THead } from './TableItems/THead';
import { FormattedTableData, formatTableData } from './utils/tableDataFormat';

const ColumnTypes = [
  'text',
  'number',
  'checkbox',
  'date',
  'file',
  'client',
  'catalog'
]

type TableCreationProps = {
  spaceTable: FullSpaceTablesType,
  space: SpaceType,
  onTableCreateFinish?: () => void,
}

export function SpaceTable({
  spaceTable,
  space,
  onTableCreateFinish
}: TableCreationProps) {
  const router = useRouter()
  const [table, setTable] = useState<SpaceTableType>({} as SpaceTableType)

  const [isNewColumnConfigDialog, setIsNewColumnConfigDialog] = useState(false)

  const [tableDataState, setTableDataState] = useState<FormattedTableData[]>([])
  const [tableColumnsState, setTableColumnsState] = useState<TableColumnType[]>([])
  
  const onCreateNewTable = async () => {
    onTableCreateFinish && onTableCreateFinish()
    router.refresh()
  }
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
    if (!spaceTable.ref) return
    setTable(spaceTable)
    setTableColumnsState(spaceTable.columns)
    const formated = formatTableData(spaceTable.data)
    setTableDataState(formated)
  }, [])

  // useEffect(() => {
  //   console.log("tableDataState", JSON.stringify(tableDataState))
  //   console.log("tableColumnsState", JSON.stringify(tableColumnsState))
  // }, [tableDataState])

  return (
    <section className={styles.Content}>
      <TableHeader 
        className={styles.InputName}
        isInputName={!spaceTable.name}
        onSuccessSubmit={() => onCreateNewTable()}
        table={spaceTable}
        spaceRef={space.ref}
      />

      {spaceTable && 
        <table>
          <THead>
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
                  onSubmitNewColumn={(e) => onSubmitNewColumn(e, spaceTable, setTableColumnsState)}
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
          </THead>

          <tbody>
            {tableDataState?.map((itemData, index) => (
              <tr key={index} 
                draggable
                // onDragStart={(e) => onDragStartListReorder(e, index)}
                // onDragOver={(e) => onDragOverListReorder(e, index)}
              >
                {tableColumnsState?.map(column => (
                  <td key={column.ref}>
                    {itemData[column.columnName]?.type !== 'catalog' && itemData[column.columnName]?.type !== 'client' 
                      ?  
                      <input
                        onChange={(e) => {
                          const value = itemData[column.columnName].type === 'checkbox' 
                          ? e.target.checked
                          : e.target.value 
                        }}
                        type={column.columnType}
                      />
                      : itemData[column.columnName].value
                    }
                  </td>
                ))}

                {/* Fixed Columns */}
                <td className={styles.creation}>
                </td>
                {/* {tableColumnsState?.length < 1 && 
                  <td className={styles.empty}></td>
                } */}
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
      }
    </section>
  )
}