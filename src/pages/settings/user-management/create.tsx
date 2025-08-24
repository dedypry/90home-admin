import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SelectItem,
} from "@heroui/react";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { IUser } from "@/interface/IUser";
import UploadAvatar from "@/components/forms/upload-avatar";
import CustomInput from "@/components/forms/custom-input";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import CustomSelect from "@/components/forms/custom-select";
import InputPassword from "@/components/forms/input-password";
import { http } from "@/config/axios";
import { notify, notifyError } from "@/utils/helpers/notify";
import { getUser } from "@/stores/features/user/action";

interface Props {
  open: boolean;
  setOpen: CallableFunction;
  data?: IUser;
}
export default function CreateUserPage({ open, setOpen, data }: Props) {
  const [loading, setLoading] = useState(false);
  const { roles } = useAppSelector((state) => state.role);
  const dispatch = useAppDispatch();
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      id: undefined,
      photo: "",
      name: "",
      email: "",
      profileId: undefined,
      password: "",
      phone: "",
      roleIds: [],
    },
  });

  useEffect(() => {
    if (data && open) {
      reset({
        id: data.id as any,
        photo: data?.profile?.photo,
        name: data.name,
        email: data.email,
        profileId: data?.profile?.id as any,
        phone: data?.profile?.phone,
        roleIds: data?.roles.map((e) => e.id) as any,
      });
    } else {
      console.log("MASUK", data, open);
      reset({
        id: undefined,
        photo: "",
        name: "",
        email: "",
        profileId: undefined,
        password: "",
        phone: "",
        roleIds: [],
      });
    }
  }, [data, open]);

  function onSubmit(data: any) {
    if (typeof data.roleIds == "string") {
      data.roleIds = (data.roleIds as any)
        .split(",")
        .filter(Boolean)
        .map((id: string) => id);
    }
    setLoading(true);

    http
      .post("/users", data)
      .then(({ data }) => {
        notify(data.message);
        reset();
        setOpen(false);
        dispatch(getUser({}));
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  }

  return (
    <Modal isOpen={open} size="2xl" onOpenChange={() => setOpen(false)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          <ModalHeader>Tambah User Baru</ModalHeader>
          <ModalBody className="flex flex-col gap-2">
            <Controller
              control={control}
              name="photo"
              render={({ field }) => (
                <UploadAvatar
                  showButtonReset
                  showButtonUpload
                  file={field.value}
                  label="Upload Photo Terbaik anda"
                  setFile={(val: string) => field.onChange(val)}
                />
              )}
            />
            <div className="my-2" />
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <CustomInput
                  {...field}
                  errorMessage="Nama Tidak boleh kosong"
                  isInvalid={!!errors.name}
                  label="Nama"
                  labelPlacement="inside"
                  placeholder="Masukan Nama"
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <CustomInput
                  {...field}
                  errorMessage={
                    errors.email?.message || "Email Tidak boleh kosong"
                  }
                  isInvalid={!!errors.email}
                  label="Email"
                  labelPlacement="inside"
                  placeholder="Masukan Email"
                />
              )}
              rules={{
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // regex sederhana utk email
                  message: "Format email tidak valid",
                },
              }}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <InputPassword
                  {...field}
                  errorMessage="Password Tidak boleh kosong"
                  isInvalid={!!errors.password}
                  labelPlacement="inside"
                />
              )}
              {...(!data && {
                rules: {
                  required: true,
                },
              })}
            />
            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <CustomInput
                  {...field}
                  errorMessage="No. Telp Tidak boleh kosong"
                  isInvalid={!!errors.phone}
                  label="No. Telp"
                  labelPlacement="inside"
                  placeholder="Masukan No. Telp"
                />
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="roleIds"
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  errorMessage="Role Tidak boleh kosong"
                  isInvalid={!!errors.roleIds}
                  label="Role"
                  labelPlacement="inside"
                  placeholder="Masukan Role"
                  selectedKeys={field.value}
                  selectionMode="multiple"
                >
                  {(roles?.data || []).map((role) => (
                    <SelectItem key={role.id}>{role.title}</SelectItem>
                  ))}
                </CustomSelect>
              )}
              rules={{ required: true }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" isLoading={loading} type="submit">
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
