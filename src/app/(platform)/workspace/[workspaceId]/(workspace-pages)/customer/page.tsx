import { CustomerType } from "@/@types/globalTypes"
import { fetchInstanceWithCookies } from "@/api/fetchInstances"
import { CustomerTable } from "@/components/CustomerTable/CustomerTable"

export default async function CustomerPage( {
  params
}: {
  params: {
    workspaceId: string
  }
}) {
  let customerListFetch: CustomerType[] = await fetchInstanceWithCookies(`/customer/workspace/${params.workspaceId}`, {
    method: 'GET'
  })

  if (!customerListFetch) {
    customerListFetch = []
  }

  return (
    <>
      <section className="p-2 pt-6">
        <h1 className="text-3xl font-bold text-primary text-slate-700 dark:text-gray-200 mb-5">
          Clientes
        </h1>
      </section>
      <CustomerTable 
        workspaceId={params.workspaceId}
        customerList={customerListFetch}
      />
    </>
  )
}