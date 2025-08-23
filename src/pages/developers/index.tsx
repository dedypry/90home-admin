import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useEffect, useState } from "react";

import CreateModal from "./create";

import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getDeveloper } from "@/stores/features/developer/action";
import TableAction from "@/components/table-action";
import { IDeveloper } from "@/interface/IDeveloper";

export default function DeveloperPage() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<IDeveloper>();
  const { developers } = useAppSelector((state) => state.developer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDeveloper());
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between w-full items-center">
          <p>Developer List</p>
          <div>
            <CreateModal data={data} open={open} setOpen={setOpen} />
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <Table removeWrapper>
          <TableHeader>
            <TableColumn>Logo</TableColumn>
            <TableColumn>Nama Developer</TableColumn>
            <TableColumn>Phone</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn> </TableColumn>
          </TableHeader>
          <TableBody>
            {developers.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Avatar src={item.logo} />
                </TableCell>
                <TableCell>
                  <p>{item.company_name}</p>
                  <p className="text-xs italic text-gray-500">
                    {item.company_brand}
                  </p>
                </TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  <TableAction
                    onDelete={() => {}}
                    onEdit={() => {
                      setOpen(true);
                      setData(item);
                    }}
                    onView={() => {}}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
