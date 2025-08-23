import { Bell, LogOut, MenuIcon, Settings, UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
} from "@heroui/react";

import { confirmSweet } from "@/utils/helpers/confirm";

interface Props {
  isOpen: boolean;
  setIsOpen: CallableFunction;
}
export default function NavbarPartial({ setIsOpen, isOpen }: Props) {
  const route = useNavigate();

  function handleLogout() {}

  return (
    <Navbar
      isBordered
      className="sticky top-1 h-[50px] rounded-md border shadow-md"
      isBlurred={false}
      maxWidth="full"
    >
      <NavbarContent>
        <Button
          isIconOnly
          className="text-primary"
          radius="full"
          size="sm"
          variant="light"
          onPress={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </Button>
        <p className="font-bold text-primary">90Home</p>
      </NavbarContent>
      <NavbarContent justify="end">
        <Button
          isIconOnly
          className="text-sm font-bold text-black"
          radius="full"
          size="sm"
          variant="light"
        >
          <Bell />
        </Button>
        <Dropdown showArrow offset={15} placement="bottom-end">
          <DropdownTrigger>
            <Avatar size="sm" />
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key={1}
              startContent={<UserIcon />}
              onClick={() => route("/profile")}
            >
              My Profile
            </DropdownItem>
            <DropdownItem
              key={2}
              startContent={<Settings />}
              onClick={() => {}}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              key={3}
              startContent={<LogOut />}
              onClick={() =>
                confirmSweet(handleLogout, {
                  confirmButtonText: "Ya, Keluar",
                })
              }
            >
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
