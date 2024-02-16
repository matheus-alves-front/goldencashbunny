"use client"
import { Input } from "../ui/input"
import { TBody, TColumn, THColumn, THead, TRow, Table } from "../ui/table"
import { CreateCustomerSheet } from "./TableItems/CreateCustomerSheet"
import { DetailsDialog } from "./TableItems/DetailsDialog"
import { OrderFilter } from "./TableItems/Filters/OrderFilter"

type CustomerTableProps = {
  workspaceId: string
}

export const CustomerTable = ({
 workspaceId
}: CustomerTableProps) => {
  return (
    <section className="p-2">
      <div className="p-2 py-4 mb-5 flex gap-4 items-end justify-start shadow-xl rounded">
        <fieldset className="w-1/4">
          <Input
            placeholder="Pesquisar"
            type="search"
            onChange={() => {}} 
          />
        </fieldset>
        <OrderFilter />
        <CreateCustomerSheet workspaceId={workspaceId} />
      </div>
      <Table className="shadow-xl rounded">
        <THead>
          <THColumn>
            Nome
          </THColumn>
          <THColumn>
            Empresa
          </THColumn>
          <THColumn>
            N Celular
          </THColumn>
          <THColumn>
            Email
          </THColumn>
          <THColumn>
            Açöes
          </THColumn>
          </THead>
        <TBody>
          <TRow>
            <TColumn>
              Matheus Alves
            </TColumn>
            <TColumn>
              Empresa Matheus
            </TColumn>
            <TColumn>
              31232123
            </TColumn>
            <TColumn>
              Matheus@matheus.com
            </TColumn>
            <TColumn>
              <div className="flex items-center justify-start gap-4">
                <DetailsDialog />
              </div>
            </TColumn>
          </TRow>
        </TBody>
      </Table>
    </section>
  )
}