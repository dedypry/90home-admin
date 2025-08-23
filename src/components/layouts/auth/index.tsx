import { Outlet } from "react-router-dom";

import GuestGuard from "@/guards/GuestGuard";

export default function AuthLayout() {
  return (
    <GuestGuard>
      <div className="flex h-screen w-full items-center justify-center bg-primary-100">
        <Outlet />
      </div>
    </GuestGuard>
  );
}
