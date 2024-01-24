"use client"
import { ChangeEvent, FormEvent, Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { SpaceTableType, SpaceType, TableColumnType } from '@/@types/globalTypes';
import { TfiArrowsVertical } from "react-icons/tfi";
import { PiTrashBold } from "react-icons/pi";
import { 
  onSubmitCreateRowValue,
  onSubmitNewColumn,
  onSubmitUpdateRowValue, 
} from './utils/table-handler';
import { DialogItem } from './TableItems/Dialog';
import { TableHeader } from './TableItems/TableHeader';
import { THead } from './TableItems/THead';
import { transformTableData } from './utils/tableDataFormat';
import styles from './tablecreation.module.scss'

const ColumnTypes = [
  'TEXT',
  'NUMBER',
  'CHECKBOX',
  'DATE',
  'FILE',
  'CLIENT',
  'CATALOG'
]

type TableCreationProps = {
  spaceTable: SpaceTableType,
  space: SpaceType,
  onTableCreateFinish?: () => void,
}

export function SpaceTable({
  spaceTable,
  space,
  onTableCreateFinish
}: TableCreationProps) {
  const router = useRouter()
  const [isNewColumnConfigDialog, setIsNewColumnConfigDialog] = useState(false)
  const [spaceTableState, setSpaceTableState] = useState(spaceTable)
  const [editRowReference, setEditRowReference] = useState<number | null>(null)

  
  const onCreateNewTable = async () => {
    onTableCreateFinish && onTableCreateFinish()
    router.refresh()
  }

  const onCreateNewColumn = async (e: FormEvent<HTMLFormElement>) => {
    const responseNewTableData = await onSubmitNewColumn(e, spaceTable)

    
    setSpaceTableState(responseNewTableData)
    // router.refresh()
  }

  const onUpdateColumnRow = async (
    rowValue: string | boolean,
    tableRowId: string
  ) => {
    const responseNewTableData = await onSubmitUpdateRowValue(String(rowValue), tableRowId)

    setSpaceTableState(responseNewTableData)
    setEditRowReference(null)
    // router.refresh()

  }

  const onCreateNewColumnRow = async (
    value: string | boolean,
    tableColumnId: string,
    rowReference: number
  ) => {
    const responseNewTableData = await onSubmitCreateRowValue(String(value), tableColumnId, rowReference)


    setEditRowReference(null)
    setSpaceTableState(responseNewTableData)
    // router.refresh()
  }

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
    setSpaceTableState(spaceTable)
  }, [])

  return (
    <section className={styles.Content}>
      <TableHeader 
        className={styles.InputName}
        isInputName={!spaceTable.name}
        onSuccessSubmit={() => onCreateNewTable()}
        table={spaceTable}
        spaceRef={space.id}
      />

      {spaceTableState && 
        <table>
          <THead>
            <tr>
              {spaceTableState.columns?.map(column => (
                <th key={column.id}>
                  {column.name}
                </th>
              ))}

              {/* FIXED COLUMNS */}
              <th  
                className={styles.creation}
              >
                <button 
                  onClick={() => setIsNewColumnConfigDialog(!isNewColumnConfigDialog)} 
                >
                  + {spaceTableState.columns?.length < 1 && 'Adicionar Coluna'}
                </button>

                {/* Column Configuration */}
                <DialogItem 
                  columnTypes={ColumnTypes}
                  isNewColumnConfigDialog={isNewColumnConfigDialog}
                  onSubmitNewColumn={(e) => onCreateNewColumn(e)}
                  setIsNewColumnConfigDialog={() => setIsNewColumnConfigDialog(false)}
                  styles={styles}
                />
              </th>
              {spaceTableState.columns?.length < 1 && 
                <th className={styles.empty}></th>
              }
              <th>
                Açoes
              </th>
            </tr>
          </THead>

          <tbody>
            {transformTableData(spaceTableState).map((row) => (
              <tr key={row.id} onClick={() => setEditRowReference(row.rowReference)}>
                {row.columns.map((column, index) => (
                  <Fragment key={index}>
                    {column.rowValue 
                    ? 
                      <>
                        {editRowReference !== row.rowReference 
                          ? 
                            <td>
                              {column.rowValue}
                            </td>
                          :
                          <td>
                            <input
                              onChange={(e) => {
                                const value = column.columnType === 'CHECKBOX' 
                                ? e.target.checked
                                : e.target.value 
      
                                onUpdateColumnRow(value, row.id)
                              }}
                              type={column.columnType.toLowerCase()}
                            />
                          </td>
                          }
                      </>
                    : 
                    <td>
                      <input
                        onChange={(e) => {
                          const value = column.columnType === 'CHECKBOX' 
                          ? e.target.checked
                          : e.target.value 

                          onCreateNewColumnRow(value, column.columnId, row.rowReference)
                          // onUpdateRow(e, column.columnId, row.rowReference)
                        }}
                        type={column.columnType}
                      />
                    </td>
                    }
                  </Fragment>
                ))}
                {/* FIXED COLUMNS */}
                <td className={styles.creation}>
                </td>
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