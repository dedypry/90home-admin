import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import MenuItem from "./menu-item";

import { navigate } from "@/navigate/navigations";

export default function SidebarMenu() {
  const { pathname } = useLocation();
  const [selected, setSelected] = useState<string>(pathname);

  useEffect(() => {
    setSelected(pathname);
  }, [pathname]);

  return (
    <div className="flex max-h-screen flex-col">
      <Link className="my-5 ml-5 flex items-center gap-2" to="/">
        <h1 className="text-[35px] font-bold text-white">90Home</h1>
      </Link>
      <ul className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary-200 scrollbar-track-transparent flex-1 overflow-y-auto pb-10 pr-1">
        {navigate.map((item, i) => {
          const IconParent: any = item.icon;

          return (
            <div key={i}>
              {(item as any).header ? (
                <MenuItem item={item as any} selected={selected} />
              ) : (
                <Link
                  className={`sidebar-item ${selected === item.href ? "bg-white text-gray-800" : "text-white"}`}
                  to={item.href || ""}
                >
                  <IconParent /> {item.title}
                </Link>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
