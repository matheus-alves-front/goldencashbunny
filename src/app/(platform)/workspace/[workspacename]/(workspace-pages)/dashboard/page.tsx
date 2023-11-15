export default async function DashboardPage(
  {
    params
  }: {
    params: {
      workspacename: string
    }
  }
) {
  return (
    <>
      <section>
        <h1>dashboard</h1>
        <h2>id: {params.workspacename}</h2>
      </section>
    </>
  )
}