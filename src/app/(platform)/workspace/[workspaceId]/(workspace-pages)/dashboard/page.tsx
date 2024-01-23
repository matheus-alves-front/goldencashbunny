export default async function DashboardPage(
  {
    params
  }: {
    params: {
      workspaceId: string
    }
  }
) {
  return (
    <>
      <section>
        <h1>dashboard</h1>
        <h2>id: {params.workspaceId}</h2>
      </section>
    </>
  )
}