import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { useAppSelector } from "@/stores/hooks";

export default function GuestGuard({ children }: { children: ReactNode }) {
  const { token } = useAppSelector((state) => state.auth);

  if (token) {
    return <Navigate to="/" />;
  }

  return children;
}
