import { SpaceTable } from "@/components/SpaceTable/SpaceTable"
import { TableCreation } from "@/components/TableCreation/TableCreation"

export default function CreateTablePage({
  params
}: {
  params: { 
    space: string,
    workspacename: string  
  }
}) {
  const {
    space, 
    workspacename
  } = params
  
  return (
    <>
      <h1>Criação de tabela</h1>
      <h2>{space}</h2>

      <TableCreation />
    </>
  )
}