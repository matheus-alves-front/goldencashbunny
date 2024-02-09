"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { THColumn, THead, TRow } from "@/components/ui/table";
import { DialogItem } from "./Dialog";
import { SpaceTableType } from "@/@types/globalTypes";
import { ColumnTypes } from "../contants/ColumnTypes";
import { FormEvent } from "react";
import { cn } from "@/lib/utils";

// Definindo tipos para os manipuladores de eventos de arrastar colunas
type OnColumnDragStartFunctionType = (columnReference: number, columnId: string) => (event: React.DragEvent<HTMLDivElement>) => void;
type OnColumnDragOverFunctionType = (event: React.DragEvent<HTMLDivElement>) => void;
type OnColumnDropFunctionType = (columnReference: number) => (event: React.DragEvent<HTMLDivElement>) => void;


export function TableHead({
  spaceTable,
  isNewColumnConfigDialog,
  onSubmitNewColumn,
  setIsNewColumnConfigDialog,
  colSpanColumnReference,
  setColSpanColumnReference,
  OnColumnDragStartFunction,
  OnColumnDragOverFunction,
  OnColumnDropFunction
}: {
  spaceTable: SpaceTableType,
  isNewColumnConfigDialog: boolean,
  onSubmitNewColumn: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  setIsNewColumnConfigDialog: () => void,
  colSpanColumnReference: number,
  setColSpanColumnReference: (ref: number) => void,
  OnColumnDragStartFunction: OnColumnDragStartFunctionType,
  OnColumnDragOverFunction: OnColumnDragOverFunctionType,
  OnColumnDropFunction: OnColumnDropFunctionType,
}) {
  return (
    <THead>
      <TRow>
        {spaceTable.columns?.map(column => (
          <THColumn 
            key={column.id}
            className="cursor-pointer"
            colSpan={column.columnReference === colSpanColumnReference ? 2 : 1}
            onClick={() => setColSpanColumnReference(column.columnReference)}
            draggable={true}
            onDragStart={OnColumnDragStartFunction(column.columnReference, column.id)}
            onDragOver={OnColumnDragOverFunction}
            onDrop={OnColumnDropFunction(column.columnReference)}
          >
            {column.name}
          </THColumn>
        ))}

        {/* FIXED COLUMNS */}
        {/* Column Configuration */}
        <THColumn className={cn('py-4 text-center')}>
          <Popover>
            <PopoverTrigger>
              <Button variant={'outline'}>
                + {spaceTable.columns?.length < 1 && 'Adicionar Coluna'}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <DialogItem 
                columnTypes={ColumnTypes}
                isNewColumnConfigDialog={isNewColumnConfigDialog}
                onSubmitNewColumn={onSubmitNewColumn}
                setIsNewColumnConfigDialog={setIsNewColumnConfigDialog}
              />
            </PopoverContent>
          </Popover>
        </THColumn>
        {/* Column Empty */}
        {spaceTable.columns?.length < 1 && 
          <THColumn></THColumn>
        }
        <THColumn className={cn('py-4 text-center')}>
          Açoes
        </THColumn>
      </TRow>
    </THead>
  )
}