import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Pagination,
  Selection,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";

import CreateUserPage from "./create";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getUser } from "@/stores/features/user/action";
import { IUser } from "@/interface/IUser";
import { getRoles } from "@/stores/features/roles/action";
import TableAction from "@/components/table-action";
import { http } from "@/config/axios";
import { notify, notifyError } from "@/utils/helpers/notify";
import { setUser } from "@/stores/features/user/userSlice";
import CustomSelect from "@/components/forms/custom-select";
import CustomInput from "@/components/forms/custom-input";
import debounce from "@/utils/helpers/debounce";

export default function UserManagementPage() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<Selection>();
  const [search, setSearch] = useState("");
  const [data, setData] = useState<IUser>();
  const { list } = useAppSelector((state) => state.user);
  const { roles } = useAppSelector((state) => state.role);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser({}));
    dispatch(getRoles({}));
  }, []);

  useEffect(() => {
    const query = {
      role: "",
      q: search,
    };

    if (role && role !== "all") {
      const selectedRole = Array.from(role as Set<string>)[0];

      query.role = selectedRole;
    }
    dispatch(getUser(query));
  }, [role, search]);

  const searchDebounce = debounce((val) => setSearch(val), 1000);

  function handleDelete(id: number) {
    http
      .delete(`/users/${id}`)
      .then(({ data }) => {
        dispatch(getUser({}));
        notify(data.message);
      })
      .catch((err) => notifyError(err));
  }

  return (
    <>
      <CreateUserPage
        data={data}
        open={open}
        setOpen={(val: boolean) => {
          setOpen(val);
          if (!val) {
            setData(undefined);
          }
        }}
      />
      <Card>
        <CardHeader className="w-full flex justify-between">
          <p>User Management</p>
          <div>
            <Button
              color="primary"
              onPress={() => {
                setData(undefined);
                setOpen(true);
              }}
            >
              Tambah User
            </Button>
          </div>
        </CardHeader>
        <CardHeader className="flex justify-between">
          <div className="w-xs">
            <CustomSelect
              label="Roles"
              selectedKeys={role}
              onSelectionChange={setRole}
            >
              {(roles?.data || []).map((item) => (
                <SelectItem key={item.title}>{item.title}</SelectItem>
              ))}
            </CustomSelect>
          </div>
          <div className="w-sm">
            <CustomInput
              endContent={<SearchIcon className="text-gray-500" />}
              label="Search"
              labelPlacement="inside"
              placeholder="Ketikan nama, email"
              onChange={(e) => searchDebounce(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardBody>
          <Table removeWrapper>
            <TableHeader>
              <TableColumn>Photo</TableColumn>
              <TableColumn>Nama</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Phone</TableColumn>
              <TableColumn>Role</TableColumn>
              <TableColumn>Alamat</TableColumn>
            </TableHeader>
            <TableBody>
              {(list?.data || []).map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Avatar src={item?.profile?.photo} />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item?.profile?.phone}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {item?.roles?.map((role) => (
                        <Chip key={role.id} variant="bordered">
                          {role.title}
                        </Chip>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <TableAction
                      onDelete={() => handleDelete(item.id)}
                      onEdit={() => {
                        setData(item);
                        setOpen(true);
                      }}
                      onView={() => {}}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center">
            <Pagination
              isCompact
              showControls
              initialPage={list?.current_page}
              radius="full"
              total={list?.last_page}
              onChange={(page) => dispatch(setUser({ page }))}
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
}
