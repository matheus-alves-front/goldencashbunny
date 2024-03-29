"use client"
import { TColumn, TRow } from "@/components/ui/table"
import { FormattedRowsColumns } from "../utils/tableDataFormat"
import { SpaceTableType } from "@/@types/globalTypes"
import { DragEvent, Fragment } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { CreateUpdateRowColumnType } from "../utils/table-handler";
import { PiTrashBold } from "react-icons/pi";
import { TfiArrowsVertical } from "react-icons/tfi";
import { cn } from "@/lib/utils"

type OnDragStartFunctionType = (rowReference: number) => (event: DragEvent<HTMLDivElement>) => void;
type OnDragOverFunctionType = (rowReference: number) => (event: DragEvent<HTMLDivElement>) => void;
type OnDropFunctionType = (rowReference: number) => (event: DragEvent<HTMLDivElement>) => void;

export function TableData({
  tableRowColumns,
  spaceTableState,
  editRowReference,
  setEditRowReference,
  addColumnRowToUpdateArray,
  addColumnRowToCreateArray,
  sendRowColumnsCreate,
  sendRowColumnsUpdate,
  sendDeleteRow,
  colSpanColumnReference,
  OnDragStartFunction,
  OnDragOverFunction,
  OnDropFunction,
}: {
  tableRowColumns: FormattedRowsColumns[],
  spaceTableState: SpaceTableType,
  editRowReference: number | null,
  addColumnRowToUpdateArray: (columnRow: CreateUpdateRowColumnType) => void,
  addColumnRowToCreateArray: (columnRow: CreateUpdateRowColumnType) => void,
  sendRowColumnsCreate: () => void,
  sendRowColumnsUpdate: () => void,
  sendDeleteRow: (rowReference: number) => void
  setEditRowReference: (rowReference: number | null) => void,
  colSpanColumnReference: number,
  OnDragStartFunction: OnDragStartFunctionType,
  OnDragOverFunction: OnDragOverFunctionType,
  OnDropFunction: OnDropFunctionType,
}) {

  return (
    <>
      {tableRowColumns.map((row) => (
        <TRow key={row.id} 
          draggable
          onDragStart={OnDragStartFunction(row.rowReference)}
          onDragOver={OnDragOverFunction(row.rowReference)}
          onDrop={OnDropFunction(row.rowReference)}
        >
          {spaceTableState.columns.map((column) => (
            <TColumn key={`${column.columnReference}-${row.rowReference}`} colSpan={column.columnReference === colSpanColumnReference ? 2 : 1}>
              {row.columns.map((rowColumn) => (
                <Fragment key={`${rowColumn.rowId}-${rowColumn.columnId}`}>
                  {rowColumn.columnReference === column.columnReference
                  ? <>
                      {editRowReference !== row.rowReference
                        ? <span>{rowColumn.rowValue}</span>
                        :
                          <>
                            {column.columnType === "DATE" ?
                              <Popover>
                                <PopoverTrigger>
                                  <Button variant={'outline'}>                                          
                                    {rowColumn.rowValue ? rowColumn.rowValue : 'Selecione a Data'}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                  <Calendar 
                                    mode='single'
                                    
                                  />
                                </PopoverContent>
                              </Popover>
                            :
                            <Input
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
                      }
                    </>
                  : null}
                </Fragment>
              ))}
            </TColumn>
          ))}
          
          {/* FIXED COLUMNS ACTIONS*/}
          <TColumn className="text-center">
            {editRowReference === row.rowReference
            ? (
              <Button
                onClick={() => {
                  sendRowColumnsCreate()
                  sendRowColumnsUpdate()
                }}
              >
                Salvar
              </Button>
            )
            : (
              <Button 
                variant={'outline'} 
                onClick={() => setEditRowReference(row.rowReference)}>
                  Editar
              </Button>
            )}
          </TColumn>
          <TColumn className="border">
            <div className='flex items-center justify-center gap-4 pl-2'>
              <Popover>
                <PopoverTrigger>
                  <Button 
                    variant={'destructive'}
                  >
                    <PiTrashBold 
                    />
                  </Button>                      
                </PopoverTrigger>
                <PopoverContent className="w-auto text-center">
                  <p className="pb-4">Confirmar</p>
                  <Button 
                    variant={'destructive'}
                    onClick={() => sendDeleteRow(row.rowReference)}
                  >
                    Excluir
                  </Button>  
                </PopoverContent>
              </Popover>
              
              <span className="text-xl cursor-grab p-2 flex-1 flex justify-end">
                <TfiArrowsVertical />
              </span>
            </div>
          </TColumn>
        </TRow>
      ))}
    </>
  )
}