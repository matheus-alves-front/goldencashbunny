import { CustomerTable } from "@/components/CustomerTable/CustomerTable"

export default function CustomerPage( {
  params
}: {
  params: {
    workspaceId: string
  }
}) {
  return (
    <>
      <section className="p-2 pt-6">
        <h1 className="text-3xl font-bold text-primary text-slate-700 dark:text-gray-200 mb-5">
          Clientes
        </h1>
      </section>
      <CustomerTable />
    </>
  )
}