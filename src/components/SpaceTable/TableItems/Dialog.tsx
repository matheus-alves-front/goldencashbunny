import { CustomStylesType } from "@/@types/globalTypes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverTrigger } from "@/components/ui/popover"
import { FormEvent } from "react"

export function DialogItem({
  isNewColumnConfigDialog,
  onSubmitNewColumn,
  columnTypes,
  setIsNewColumnConfigDialog
}: {
  isNewColumnConfigDialog: boolean,
  onSubmitNewColumn: (e: FormEvent<HTMLFormElement>) => Promise<void>,
  columnTypes: string[],
  setIsNewColumnConfigDialog: () => void,
}) {
  return (
    <>
      <form className="flex flex-col justify-start gap-1" onSubmit={onSubmitNewColumn}>
        <Input
          name='columnname'
          placeholder='Nome da Coluna' 
          type="text" 
        />
        <label htmlFor="columntype">
          Tipo
        </label>
        <select name="columntype" id="columntype">
          {columnTypes.map((type) => (
            <option 
              value={type}
              key={type}
            >
              {type}
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