import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTtile, DashboardPageMain } from "@/components/dashboard/page";


export default async function Page() {


  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTtile>Tarefas</DashboardPageHeaderTtile>
      </DashboardPageHeader>
      <DashboardPageMain>
        <h1>Tarefas</h1>
      </DashboardPageMain>
    </DashboardPage>
  )
}