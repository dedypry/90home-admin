import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SelectItem,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { IDeveloper } from "@/interface/IDeveloper";
import UploadAvatar from "@/components/forms/upload-avatar";
import CustomInput from "@/components/forms/custom-input";
import QuillJS from "@/components/forms/quill-js";
import { http } from "@/config/axios";
import { notify, notifyError } from "@/utils/helpers/notify";
import { IUser } from "@/interface/IUser";
import CustomSelect from "@/components/forms/custom-select";

interface Props {
  data?: IDeveloper;
  open: boolean;
  setOpen: CallableFunction;
}
export default function CreateModal({ data, open, setOpen }: Props) {
  const [users, setUser] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    http
      .get("/users")
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => notifyError(err));
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IDeveloper>({
    defaultValues: {
      id: undefined,
      logo: "",
      company_name: "",
      company_brand: "",
      email: "",
      phone: "",
      address: "",
      coordinator_ids: [],
    },
  });

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  function onSubmit(data: IDeveloper) {
    if (typeof data.coordinator_ids == "string") {
      data.coordinator_ids = (data.coordinator_ids as any)
        .split(",")
        .filter(Boolean)
        .map((id: string) => id);
    }
    setLoading(true);
    http
      .post("developers", data)
      .then(({ data }) => {
        notify(data.message);
        reset();
        setOpen(false);
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Modal
        isOpen={open}
        scrollBehavior="outside"
        size="2xl"
        onOpenChange={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader>Tambah Developer</ModalHeader>
            <ModalBody className="flex flex-col gap-5">
              <Controller
                control={control}
                name="logo"
                render={({ field }) => (
                  <UploadAvatar
                    showButtonReset
                    showButtonUpload
                    file={field.value}
                    setFile={(file: string) => field.onChange(file)}
                  />
                )}
              />

              <Divider className="my-5" />
              <Controller
                control={control}
                name="company_name"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    errorMessage={
                      errors.company_name?.message ||
                      "Company Name tidak boleh kosong"
                    }
                    isInvalid={!!errors.company_name}
                    label="Nama Perusahaan"
                    placeholder="Masukan Nama Perusahaan"
                  />
                )}
                rules={{ required: true }}
              />
              <Controller
                control={control}
                name="company_brand"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    errorMessage={
                      errors.company_brand?.message ||
                      "Brand tidak boleh kosong"
                    }
                    isInvalid={!!errors.company_brand}
                    label="Nama Brand"
                    placeholder="Masukan Nama Brand"
                  />
                )}
                rules={{ required: true }}
              />
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    errorMessage={
                      errors.phone?.message || "Telp tidak boleh kosong"
                    }
                    isInvalid={!!errors.phone}
                    label="No. Telp"
                    placeholder="Masukan No. Telp"
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
                      errors.email?.message || "Email tidak boleh kosong"
                    }
                    isInvalid={!!errors.email}
                    label="Email"
                    placeholder="Masukan Email"
                  />
                )}
                rules={{ required: true }}
              />
              <Controller
                control={control}
                name="coordinator_ids"
                render={({ field }) => (
                  <CustomSelect
                    {...field}
                    errorMessage={
                      errors.coordinator_ids?.message ||
                      "Koordinator Tidak boleh kosong"
                    }
                    isInvalid={!!errors.coordinator_ids}
                    label="Sales Koordinator"
                    placeholder="Pilih Sales Koordinator"
                    selectedKeys={field.value}
                    selectionMode="multiple"
                  >
                    {users.map((e) => (
                      <SelectItem key={e.id}>{e.name}</SelectItem>
                    ))}
                  </CustomSelect>
                )}
                rules={{ required: true }}
              />
              <div>
                <p className="text-gray-700 text-sm pb-2">Alamat</p>
                <Controller
                  control={control}
                  name="address"
                  render={({ field }) => (
                    <QuillJS
                      value={field.value || ""}
                      onContent={(val: any) => field.onChange(val)}
                    />
                  )}
                  rules={{ required: true }}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={loading}
                variant="bordered"
                onPress={() => {
                  reset();
                  setOpen(false);
                }}
              >
                Batal
              </Button>
              <Button color="primary" isLoading={loading} type="submit">
                Simpan
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
      <Button color="primary" onPress={() => setOpen(true)}>
        Tambah Developer
      </Button>
    </>
  );
}
