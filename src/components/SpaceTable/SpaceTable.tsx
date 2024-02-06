"use client"
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SpaceTableType, SpaceType } from '@/@types/globalTypes';
import { fetchInstanceWithCookies } from '@/api/fetchInstances';
import { 
  CreateUpdateRowColumnType,
  onSubmitCreateRowValue,
  onSubmitDeleteRow,
  onSubmitNewColumn,
  onSubmitUpdateRowValue, 
} from './utils/table-handler';
import { TableHeader } from './TableItems/TableHeader';
import { FormattedRowsColumns, transformTableRowColumns } from './utils/tableDataFormat';
import {
  Table,
  TBody,
} from '../ui/table';
import { TableHead } from './TableItems/TableHead';
import { TableData } from './TableItems/TableData';
import { TableInputData } from './TableItems/TableInputData';

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
    setTableRowColumns(transformTableRowColumns(spaceTable))
  }, [])

  useEffect(() => {
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
        <Table className={cn('shadow-xl rounded-xl')}>
          <TableHead
            colSpanColumnReference={colSpanColumnReference}
            setColSpanColumnReference={setColSpanColumnReference}
            isNewColumnConfigDialog={isNewColumnConfigDialog}
            onSubmitNewColumn={(e) => onCreateNewColumn(e)}
            setIsNewColumnConfigDialog={() => setIsNewColumnConfigDialog(false)}
            spaceTable={spaceTableState}
          />
          <TBody>
            <TableData 
              tableRowColumns={tableRowColumns} 
              spaceTableState={spaceTableState} 
              editRowReference={editRowReference} 
              addColumnRowToUpdateArray={addColumnRowToUpdateArray} 
              addColumnRowToCreateArray={addColumnRowToCreateArray} 
              sendRowColumnsCreate={sendRowColumnsCreate} 
              sendRowColumnsUpdate={sendRowColumnsUpdate} 
              sendDeleteRow={sendDeleteRow} 
              setEditRowReference={setEditRowReference}
              colSpanColumnReference={colSpanColumnReference}
            />
            <TableInputData 
              spaceTableState={spaceTableState}
              tableRowColumns={tableRowColumns}
              addColumnRowToCreateArray={addColumnRowToCreateArray}
              sendRowColumnsCreate={sendRowColumnsCreate}
              colSpanColumnReference={colSpanColumnReference}
              isNewRow={isNewRow}
              setIsNewRow={setIsNewRow}
            />
            
          </TBody>
        </Table>
      : null}
    </section>
  )
}