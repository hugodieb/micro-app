'use client'

import { Sidebar, SidebarHeader, SidebarMain, SidebarNav, SidebarNavMain, SidebarNavLink, SidebarNavHeader, SidebarNavHeaderTitle, SidebarFooter } from "@/components/ui/dashboard/sidebar";
import { usePathname } from "next/navigation";
import { HomeIcon, MixerVerticalIcon } from "@radix-ui/react-icons";
import { UserDropdown } from "./user-dropdown";
import { Session } from "next-auth";

type MainSideProps = {
  user: Session['user']
}

export function MainSidebar({ user }: MainSideProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <Sidebar>
        <SidebarHeader>
          <h3></h3>
        </SidebarHeader>
        <SidebarMain className="flex flex-col flex-grow">
          <SidebarNav>
            <SidebarNavMain>
              <SidebarNavLink href="/app" active={isActive('/app')}>
                <HomeIcon className="w-3 h-3 mr-3" />
                Tarefas
              </SidebarNavLink>
              <SidebarNavLink href="/app/settings" active={isActive('/app/settings')}>
                <MixerVerticalIcon className="w-3 h-3 mr-3" />
                Configurações
              </SidebarNavLink>
            </SidebarNavMain>
          </SidebarNav>

          <SidebarNav className="mt-auto ">
            <SidebarNavHeader>
              <SidebarNavHeaderTitle>
                Links Extras
              </SidebarNavHeaderTitle>
            </SidebarNavHeader>
            <SidebarNavMain>
              <SidebarNavLink href="/">
                Precisa de ajuda?
              </SidebarNavLink>
              <SidebarNavLink href="/">
                Site
              </SidebarNavLink>
            </SidebarNavMain>
          </SidebarNav>
        </SidebarMain>
        <SidebarFooter>
          <UserDropdown user={user} />
        </SidebarFooter>
      </Sidebar>
  )
}