import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormEvent } from "react"
import { COLUMN_TYPES_LABELS } from "../contants/ColumnTypes"

export function DialogItem({
  onSubmitNewColumn,
  columnTypes,
}: {
  isNewColumnConfigDialog: boolean,
  onSubmitNewColumn: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  columnTypes: string[],
  setIsNewColumnConfigDialog: () => void,
}) {
  return (
    <>
      <form className="flex flex-col justify-start gap-2" onSubmit={onSubmitNewColumn}>
        <Input
          name='columnname'
          placeholder='Nome da Coluna' 
          type="text" 
        />
        <label htmlFor="columntype">
          Tipo
        </label>
        <select className="p-2 rounded" name="columntype" id="columntype">
          {columnTypes.map((type) => (
            <option 
              value={type}
              key={type}
            >
              {/* @ts-ignore */}
              {COLUMN_TYPES_LABELS[type]}
            </option>
          ))}
        </select>
        <Button 
          className="mt-3" 
          type="submit"
        >
            Criar
        </Button>
      </form>
    </>
  )
}