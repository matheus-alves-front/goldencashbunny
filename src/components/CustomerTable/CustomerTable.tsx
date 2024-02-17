"use client"
import { CustomerType } from "@/@types/globalTypes"
import { Input } from "../ui/input"
import { TBody, TColumn, THColumn, THead, TRow, Table } from "../ui/table"
import { CreateCustomerSheet } from "./TableItems/CreateCustomerSheet"
import { DetailsDialog } from "./TableItems/DetailsDialog"
import { OrderFilter } from "./TableItems/Filters/OrderFilter"

type CustomerTableProps = {
  workspaceId: string
  customerList: CustomerType[]
}

export const CustomerTable = ({
 workspaceId,
 customerList
}: CustomerTableProps) => {
  return (
    <section className="p-2">
      <div className=" py-4 flex gap-4 items-end justify-start rounded">
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
          {customerList.length 
          ?
            customerList.map((customer) => (
              <TRow>
                <TColumn>
                 {customer.firstName} {customer.lastName}
                </TColumn>
                <TColumn>
                  {customer.companyName}
                </TColumn>
                <TColumn>
                  {customer.phone}
                </TColumn>
                <TColumn>
                  {customer.email}
                </TColumn>
                <TColumn>
                  <div className="flex items-center justify-start gap-4">
                    <DetailsDialog />
                  </div>
                </TColumn>
              </TRow>
            ))
          : null}
        </TBody>
      </Table>
    </section>
  )
}