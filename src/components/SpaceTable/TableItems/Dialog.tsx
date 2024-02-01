import { CustomStylesType } from "@/@types/globalTypes"
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
    <dialog open={isNewColumnConfigDialog}>
      <form onSubmit={onSubmitNewColumn}>
        <input
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
        <footer>
          <button 
            onClick={setIsNewColumnConfigDialog}
            type="reset"
          >
            Cancelar
          </button>
          <button  
            type="submit"
          >
            Criar
          </button>
        </footer>
      </form>
    </dialog>
  )
}