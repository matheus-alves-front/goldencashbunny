"use client"
import { SpaceTableType } from "@/@types/globalTypes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TColumn, TRow } from "@/components/ui/table"
import { PiTrashBold } from "react-icons/pi"
import { TfiArrowsVertical } from "react-icons/tfi"
import { FormattedRowsColumns } from "../utils/tableDataFormat"
import { CreateUpdateRowColumnType } from "../utils/table-handler"

export function TableInputData({
  spaceTableState,
  tableRowColumns,
  addColumnRowToCreateArray,
  sendRowColumnsCreate,
  isNewRow,
  colSpanColumnReference,
  setIsNewRow
}: {
  spaceTableState: SpaceTableType,
  tableRowColumns: FormattedRowsColumns[],
  addColumnRowToCreateArray: (columnRow: CreateUpdateRowColumnType) => void,
  sendRowColumnsCreate: () => void,
  isNewRow: boolean,
  colSpanColumnReference: number,
  setIsNewRow: (bool: boolean) => void
}) {
  return (
    <TRow>
      {isNewRow ?
        <>
          {spaceTableState.columns.map((column) => (
            <TColumn key={column.columnReference} colSpan={column.columnReference === colSpanColumnReference ? 2 : 1}>
              {/* {column.columnType === 'DATE' 
              ?  
              <Popover>
                <PopoverTrigger>
                  <Button variant={'outline'}>  
                    {'Data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar 
                    mode='single'
                    
                  />
                </PopoverContent>
              </Popover>
              : */}
                <Input
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
              {/* } */}
            </TColumn>
          ))}
          {/* FIXED COLUMNS ACTIONS*/}
          <TColumn className="text-center">
            <Button onClick={() => {
              sendRowColumnsCreate()
            }}>
                Salvar
            </Button>
          </TColumn>
          <TColumn>
            <div className='flex items-center justify-center gap-2'>
              <Button variant={'destructive'} onClick={() => setIsNewRow(!isNewRow)}>
                <PiTrashBold 
                />
              </Button>
              {/* <button>+</button> */}
              <TfiArrowsVertical/>
            </div>
          </TColumn>
        </>
      : <>
          {spaceTableState.columns.length 
          ? <TColumn 
            className='cursor-pointer hover:bg-neutral-200 dark:hover:bg-slate-500 rounded-xl' 
            colSpan={spaceTableState.columns.length + 1} 
            onClick={() => setIsNewRow(!isNewRow)}
            >
              + Linha
            </TColumn> 
          : null}
        </>
      }
    </TRow>
  )
}