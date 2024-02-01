"use client"
import { FormEvent, Fragment, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { SpaceTableType, SpaceType } from '@/@types/globalTypes';
import { TfiArrowsVertical } from "react-icons/tfi";
import { PiTrashBold } from "react-icons/pi";
import { fetchInstanceWithCookies } from '@/api/fetchInstances';
import { 
  CreateUpdateRowColumnType,
  onSubmitCreateRowValue,
  onSubmitDeleteRow,
  onSubmitNewColumn,
  onSubmitUpdateRowValue, 
} from './utils/table-handler';
import { DialogItem } from './TableItems/Dialog';
import { TableHeader } from './TableItems/TableHeader';
import { FormattedRowsColumns, transformTableRowColumns } from './utils/tableDataFormat';

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
  const [rowsColumnsToUpdate, setRowsColumnsToUpdate] = useState<CreateUpdateRowColumnType[]>([])

  const [isNewRow, setIsNewRow] = useState(false)
  const [rowsColumnsToCreate, setRowsColumnsToCreate] = useState<CreateUpdateRowColumnType[]>([])
  
  const addColumnRowToCreateArray = async (columnRow: CreateUpdateRowColumnType) => {
    setRowsColumnsToCreate((prevRowsColumnsToUpdate) => {
      if (!prevRowsColumnsToUpdate) {
        return [columnRow]
      }
      const existingIndex = prevRowsColumnsToUpdate.findIndex(row => row.columnReference === columnRow.columnReference && row.rowReference === row.rowReference);
  
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
    await onSubmitCreateRowValue(rowsColumnsToCreate, spaceTableState.id)

    const spaceTable: SpaceTableType = await fetchInstanceWithCookies(`/space/table/${spaceTableState.id}`, {
      method: 'GET'
    })
    
    setRowsColumnsToCreate([])
    setIsNewRow(false)

    if (!spaceTable) {
      return
    }

    setSpaceTableState(spaceTable)
  }

  const addColumnRowToUpdateArray = async (columnRow: CreateUpdateRowColumnType) => {
    setRowsColumnsToUpdate((prevRowsColumnsToUpdate) => {
      if (!columnRow) {
        return []
      }
      if (!prevRowsColumnsToUpdate) {
        return [columnRow]
      }
      const existingIndex = prevRowsColumnsToUpdate.findIndex(row => row.rowReference === columnRow.rowReference && row.columnReference === columnRow.columnReference);
  
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
    await onSubmitUpdateRowValue(rowsColumnsToUpdate, spaceTableState.id)

    const spaceTable: SpaceTableType = await fetchInstanceWithCookies(`/space/table/${spaceTableState.id}`, {
      method: 'GET'
    })
    
    setRowsColumnsToUpdate([])
    setEditRowReference(null)

    if (!spaceTable) {
      return
    }

    setSpaceTableState(spaceTable)
  }

  const sendDeleteRow = async (rowReference: number) => {
    await onSubmitDeleteRow(spaceTableState.id, rowReference)

    const spaceTable: SpaceTableType = await fetchInstanceWithCookies(`/space/table/${spaceTableState.id}`, {
      method: 'GET'
    })

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
    <section>
      <TableHeader 
        isInputName={!spaceTable.name}
        onSuccessSubmit={() => onCreateNewTable()}
        table={spaceTable}
        spaceRef={space.id}
      />

      {spaceTableState && !onTableCreateFinish ? 
        <table>
          <thead>
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
              <th >
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
                />
              </th>
              {spaceTableState.columns?.length < 1 && 
                <th></th>
              }
              <th>
                Açoes
              </th>
            </tr>
          </thead>

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
                                          columnReference: rowColumn.columnReference,
                                          rowReference: row.rowReference,
                                          value: String(value)
                                        })
                                      } else {
                                        addColumnRowToCreateArray({
                                          columnReference: rowColumn.columnReference,
                                          rowReference: row.rowReference,
                                          value: String(value)
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
                  <td>
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
                    <div>
                      <button 
                      
                        onClick={() => sendDeleteRow(row.rowReference)}
                      >
                        <PiTrashBold 
                        />
                      </button>                      
                      <TfiArrowsVertical/>
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
                            columnReference: column.columnReference,
                            rowReference: column.rows.length ? nextRowReference + 1 : 0,
                            value: String(value)
                          })
                        }}
                        type={column.columnType}
                      />
                    </td>
                  ))}
                  {/* FIXED COLUMNS ACTIONS*/}
                  <td>
                    <button onClick={() => {
                      sendRowColumnsCreate()
                    }}>
                        Salvar
                    </button>
                  </td>
                  <td>
                    <div>
                      <button onClick={() => setIsNewRow(!isNewRow)}>
                        <PiTrashBold 
                        />
                      </button>
                      {/* <button>+</button> */}
                      <TfiArrowsVertical/>
                    </div>
                  </td>
                </>
              : <>
                  {spaceTableState.columns.length ? <td colSpan={spaceTableState.columns.length + 1} onClick={() => setIsNewRow(!isNewRow)}>+ Linha</td> : null}
                </>
              }
            </tr>
          </tbody>
        </table>
      : null}
    </section>
  )
}