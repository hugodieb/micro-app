import { DashboardPage, DashboardPageHeader, DashboardPageHeaderTitle, DashboardPageMain } from "@/components/dashboard/page";
import { PropsWithChildren } from "react";
import { SettingsSidebar } from "./_components/settings-sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <DashboardPage>
      <DashboardPageHeader>
        <DashboardPageHeaderTitle>Configurações</DashboardPageHeaderTitle>
      </DashboardPageHeader>
      <div className="container max-w-screen-lg">
        <DashboardPageMain>
          <div className="grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-12 h-screen">
            <SettingsSidebar />
            <div>
              {children}
            </div>
          </div>
        </DashboardPageMain>
      </div>
    </DashboardPage>

  )
}