import { Grid2X2CheckIcon, Grid2X2PlusIcon, LayoutDashboard, ShieldEllipsis } from "lucide-react";

export const navigate = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
  },
  {
    title: "Developer",
    icon: LayoutDashboard,
    href: "/developers",
  },
  {
    header: "Products",
    children: [
      {
        title: "List",
        icon: Grid2X2CheckIcon,
        href: "/products",
      },
      {
        title: "Tambah Baru",
        icon: Grid2X2PlusIcon,
        href: "/products/create",
      },
    ],
  },
  {
    header: "Settings",
    children: [
      {
        title: "Role",
        icon: ShieldEllipsis,
        href: "/settings/roles",
      },
    ],
  },
];
