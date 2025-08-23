import { ReactNode, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { Outlet } from "react-router-dom";

import SidebarMenu from "./partials/sidebar-menu";
import NavbarPartial from "./partials/navbar";

import { responsive } from "@/config/responsive";
import AuthGuard from "@/guards/AuthGuard";

interface Props {
  children?: ReactNode;
}
export default function DashboardLayout({ children }: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const isMobile = useMediaQuery(responsive.mobile);

  return (
    <AuthGuard>
      {isMobile ? (
        <Drawer
          className="bg-primary pl-4"
          isOpen={isOpen}
          placement="left"
          size="xs"
          onClose={() => setIsOpen(false)}
        >
          <DrawerContent>{() => <SidebarMenu />}</DrawerContent>
        </Drawer>
      ) : (
        <aside
          className={`translation-all z-50 fixed h-screen w-[266px] transform bg-gradient-to-tr from-primary-900 to-primary-600 pl-3 shadow-lg shadow-primary-200 duration-300 ease-in-out ${
            !isOpen ? "-translate-x-full" : "translate-x-0"
          } ${isMobile && "-translate-x-full"} `}
        >
          <SidebarMenu />
        </aside>
      )}

      <div
        className={`${!isOpen ? "pl-0" : "lg:pl-[266px]"} translation-all duration-300 ease-in-out`}
      >
        <main className="px-5 pt-1">
          <NavbarPartial isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="py-5">
            <Outlet />
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
