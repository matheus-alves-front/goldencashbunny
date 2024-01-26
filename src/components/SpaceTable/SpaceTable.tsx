"use client"
import { FormEvent, Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { SpaceTableType, SpaceType, TableDataType } from '@/@types/globalTypes';
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
import { FormattedRowsColumns, transformTableRowColumns } from './utils/tableDataFormat';
import styles from './tablecreation.module.scss'
import { fetchInstanceWithCookies } from '@/api/fetchInstances';
import { cp } from 'fs';

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
  workspaceId: string,
  onTableCreateFinish?: () => void,
}

interface RowColumnCreationType extends Omit<TableDataType, 'id'> {
  columnId: string
}

export function SpaceTable({
  spaceTable,
  space,
  workspaceId,
  onTableCreateFinish
}: TableCreationProps) {
  const router = useRouter()

  // Table
  const [spaceTableState, setSpaceTableState] = useState(spaceTable)
  const [tableRowColumns, setTableRowColumns] = useState<FormattedRowsColumns[]>([])

  // Table Actions
  const onCreateNewTable = async () => {
    onTableCreateFinish && onTableCreateFinish()
    router.refresh()
  }

  const onCreateNewColumn = async (e: FormEvent<HTMLFormElement>) => {
    const responseNewTableData = await onSubmitNewColumn(e, spaceTableState)

    console.log(responseNewTableData)
    const spaces: SpaceType[] = await fetchInstanceWithCookies(`/workspace/${workspaceId}/spaces`, {
      method: 'GET'
    })
  
    const actualSpace = spaces.find(spaceItem => spaceItem.id === space.id)

    const spaceTable = actualSpace?.tables.find(spaceTable => spaceTable.id === spaceTableState.id)
    
    setIsNewColumnConfigDialog(false)

    if (!spaceTable) {
      return
    }

    setSpaceTableState(spaceTable)
  }
  
  // Managers
  const [isNewColumnConfigDialog, setIsNewColumnConfigDialog] = useState(false) // Column
  const [colSpanColumnReference, setColSpanColumnReference] = useState(0) // Expand Column

  const [editRowReference, setEditRowReference] = useState<number | null>(null) // Row
  const [rowsColumnsToUpdate, setRowsColumnsToUpdate] = useState<TableDataType[] | null>(null)

  const [isNewRow, setIsNewRow] = useState(false)
  const [rowsColumnsToCreate, setRowsColumnsToCreate] = useState<RowColumnCreationType[] | null>(null)
  
  const addColumnRowToCreateArray = async (columnRow: RowColumnCreationType) => {
    setRowsColumnsToCreate((prevRowsColumnsToUpdate) => {
      if (!prevRowsColumnsToUpdate) {
        return [columnRow]
      }
      const existingIndex = prevRowsColumnsToUpdate.findIndex(row => row.columnId === columnRow.columnId);
  
      if (existingIndex !== -1) {
        const updatedRows = [...prevRowsColumnsToUpdate];
        updatedRows[existingIndex] = { ...updatedRows[existingIndex], ...columnRow };
        return updatedRows;
      } else {
        return [...prevRowsColumnsToUpdate, columnRow];
      }
    });
  };

  const sendRowColumnsCreate = async () => {
    rowsColumnsToCreate?.map(async (row) => {
      console.log('enviou create', row)
      return await onSubmitCreateRowValue(row.rowValue, row.columnId, row.rowReference)
    })

    const spaces: SpaceType[] = await fetchInstanceWithCookies(`/workspace/${workspaceId}/spaces`, {
      method: 'GET'
    })
  
    const actualSpace = spaces.find(spaceItem => spaceItem.id === space.id)

    const spaceTable = actualSpace?.tables.find(spaceTable => spaceTable.id === spaceTableState.id)
    
    setRowsColumnsToCreate([])
    setIsNewRow(false)

    if (!spaceTable) {
      return
    }

    setSpaceTableState(spaceTable)
  }

  const addColumnRowToUpdateArray = async (columnRow: TableDataType) => {
    setRowsColumnsToUpdate((prevRowsColumnsToUpdate) => {
      if (!columnRow) {
        return []
      }
      if (!prevRowsColumnsToUpdate) {
        return [columnRow]
      }
      const existingIndex = prevRowsColumnsToUpdate.findIndex(row => row.id === columnRow.id);
  
      if (existingIndex !== -1) {
        const updatedRows = [...prevRowsColumnsToUpdate];
        updatedRows[existingIndex] = { ...updatedRows[existingIndex], ...columnRow };
        return updatedRows;
      } else {
        return [...prevRowsColumnsToUpdate, columnRow];
      }
    });
  };

  const sendRowColumnsUpdate = async () => {
    rowsColumnsToUpdate?.map(async (row) => {
      console.log('enviou update', row)
      return await onSubmitUpdateRowValue(row.rowValue, row.id)
    })

    const spaces: SpaceType[] = await fetchInstanceWithCookies(`/workspace/${workspaceId}/spaces`, {
      method: 'GET'
    })
  
    const actualSpace = spaces.find(spaceItem => spaceItem.id === space.id)

    const spaceTable = actualSpace?.tables.find(spaceTable => spaceTable.id === spaceTableState.id)
    
    setRowsColumnsToUpdate([])
    setEditRowReference(null)

    if (!spaceTable) {
      return
    }

    setSpaceTableState(spaceTable)
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

  useEffect(() => {
    console.log("transformTableRowColumns(spaceTableState)", transformTableRowColumns(spaceTableState))
    console.log("spaceTableState", spaceTableState)
    setTableRowColumns(transformTableRowColumns(spaceTableState))
  }, [spaceTableState])


  return (
    <section className={styles.Content}>
      <TableHeader 
        className={styles.InputName}
        isInputName={!spaceTable.name}
        onSuccessSubmit={() => onCreateNewTable()}
        table={spaceTable}
        spaceRef={space.id}
      />

      {spaceTableState && !onTableCreateFinish ? 
        <table>
          <THead>
            <tr>
              {spaceTableState.columns?.map(column => (
                <th 
                  colSpan={column.columnReference === colSpanColumnReference ? 2 : 1}
                  onClick={() => setColSpanColumnReference(column.columnReference)}
                  key={column.id}
                >
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
            {tableRowColumns.map((row) => (
                <tr key={row.id}>
                  {spaceTableState.columns.map((column) => (
                    <td key={`${column.columnReference}-${row.rowReference}`} colSpan={column.columnReference === colSpanColumnReference ? 2 : 1}>
                      {row.columns.map((rowColumn) => (
                        <Fragment key={`${rowColumn.rowId}-${rowColumn.columnId}`}>
                          {rowColumn.columnReference === column.columnReference
                          ? <>
                              {editRowReference !== row.rowReference
                                ? <span>{rowColumn.rowValue}</span>
                                :
                                  <input
                                    onChange={(e) => {
                                      const value = column.columnType === 'CHECKBOX' 
                                      ? e.target.checked
                                      : e.target.value 

                                      if (rowColumn.rowId) {
                                        addColumnRowToUpdateArray({
                                          id: rowColumn.rowId,
                                          rowReference: row.rowReference,
                                          rowValue: String(value)
                                        })
                                      } else {
                                        addColumnRowToCreateArray({
                                          columnId: rowColumn.columnId,
                                          rowReference: row.rowReference,
                                          rowValue: String(value)
                                        })
                                      }
                                    }}
                                    placeholder={rowColumn.rowValue}
                                    type={column.columnType.toLowerCase()}
                                  />
                              }
                            </>
                          : null}
                        </Fragment>
                      ))}
                    </td>
                  ))}
                  
                  {/* FIXED COLUMNS ACTIONS*/}
                  <td className={styles.creation}>
                    {editRowReference === row.rowReference
                    ? (
                      <button onClick={() => {
                        sendRowColumnsCreate()
                        sendRowColumnsUpdate()
                      }}>
                        Salvar
                      </button>
                    )
                    : <button onClick={() => setEditRowReference(row.rowReference)}>Editar</button>}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.exclude}>
                        <PiTrashBold 
                        />
                      </button>                      
                      <TfiArrowsVertical className={styles.reorder}/>
                    </div>
                  </td>
                </tr>
            ))}

            <tr>
              {isNewRow ?
                <>
                  {spaceTableState.columns.map((column) => (
                    <td key={column.columnReference} colSpan={column.columnReference === colSpanColumnReference ? 2 : 1}>
                      <input
                        onChange={(e) => {
                          const value = column.columnType === 'CHECKBOX' 
                          ? e.target.checked
                          : e.target.value 

                          const nextRowReference = tableRowColumns.length

                          addColumnRowToCreateArray({
                            columnId: column.id,
                            rowReference: column.rows.length ? nextRowReference + 1 : 0,
                            rowValue: String(value)
                          })
                        }}
                        type={column.columnType}
                      />
                    </td>
                  ))}
                  {/* FIXED COLUMNS ACTIONS*/}
                  <td className={styles.creation}>
                    <button onClick={() => {
                      sendRowColumnsCreate()
                    }}>
                        Salvar
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button onClick={() => setIsNewRow(!isNewRow)} className={styles.exclude}>
                        <PiTrashBold 
                        />
                      </button>
                      {/* <button>+</button> */}
                      <TfiArrowsVertical className={styles.reorder}/>
                    </div>
                  </td>
                </>
              : <>
                  {spaceTableState.columns.length ? <td colSpan={spaceTableState.columns.length + 1} className={styles.addNewRow} onClick={() => setIsNewRow(!isNewRow)}>+ Linha</td> : null}
                </>
              }
            </tr>
          </tbody>
        </table>
      : null}
    </section>
  )
}