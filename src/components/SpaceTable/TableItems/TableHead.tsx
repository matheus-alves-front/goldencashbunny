"use client"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { THColumn, THead, TRow } from "@/components/ui/table";
import { DialogItem } from "./Dialog";
import { SpaceTableType } from "@/@types/globalTypes";
import { ColumnTypes } from "../contants/ColumnTypes";
import { FormEvent } from "react";
import { cn } from "@/lib/utils";

export function TableHead({
  spaceTable,
  isNewColumnConfigDialog,
  onSubmitNewColumn,
  setIsNewColumnConfigDialog,
  colSpanColumnReference,
  setColSpanColumnReference
}: {
  spaceTable: SpaceTableType,
  isNewColumnConfigDialog: boolean,
  onSubmitNewColumn: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  setIsNewColumnConfigDialog: () => void,
  colSpanColumnReference: number,
  setColSpanColumnReference: (ref: number) => void
}) {
  return (
    <THead>
      <TRow >
        {spaceTable.columns?.map(column => (
          <THColumn 
            colSpan={column.columnReference === colSpanColumnReference ? 2 : 1}
            onClick={() => setColSpanColumnReference(column.columnReference)}
            key={column.id}
          >
            {column.name}
          </THColumn>
        ))}

        {/* FIXED COLUMNS */}
        {/* Column Configuration */}
        <THColumn className={cn('py-4')}>
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
        <THColumn>
          Açoes
        </THColumn>
      </TRow>
    </THead>
  )
}