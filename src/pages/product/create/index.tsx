import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DropZone from "@/components/forms/drop-zone";
import CustomInput from "@/components/forms/custom-input";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getDeveloper } from "@/stores/features/developer/action";
import CustomSelect from "@/components/forms/custom-select";
import CustomInputNumber from "@/components/forms/custom-input-number";
import QuillJS from "@/components/forms/quill-js";
import { uploadMultipleFile } from "@/utils/helpers/upload-file";
import { http } from "@/config/axios";
import { notify, notifyError } from "@/utils/helpers/notify";

export default function ProductCreatePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { developers } = useAppSelector((state) => state.developer);

  const dispatch = useAppDispatch();
  const route = useNavigate();

  useEffect(() => {
    dispatch(getDeveloper());
  }, []);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      images: [],
      listing_title: "",
      developer_id: undefined,
      cluster: "",
      description: "",
      variants: [
        {
          type: "",
          commission_fee: undefined,
          price: undefined,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  async function onSubmit(data: any) {
    const { urls } = await uploadMultipleFile(files, "products/90-home");

    data.images = urls;
    setLoading(true);
    http
      .post("/products", data)
      .then(({ data }) => {
        notify(data.message);
        reset();
        route("/products");
      })
      .catch((err) => notifyError(err))
      .finally(() => setLoading(false));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>Tambah Product</CardHeader>
        <CardBody className="flex flex-col gap-5">
          <DropZone files={files} setFiles={setFiles} />

          <Controller
            control={control}
            name="listing_title"
            render={({ field }) => (
              <CustomInput
                {...field}
                errorMessage={
                  errors.listing_title?.message ||
                  "Listing Title Tidak boleh kosong"
                }
                isInvalid={!!errors.listing_title}
                label="Listing Title"
                labelPlacement="inside"
                placeholder="Masukan Listing Title"
              />
            )}
            rules={{ required: true }}
          />
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <Controller
              control={control}
              name="developer_id"
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  errorMessage={
                    errors.developer_id?.message ||
                    "Developer Tidak boleh kosong"
                  }
                  isInvalid={!!errors.developer_id}
                  label="Developer"
                  placeholder="Masukan Developer"
                >
                  {developers.map((item) => (
                    <SelectItem key={item.id}>{item.company_name}</SelectItem>
                  ))}
                </CustomSelect>
              )}
              rules={{ required: true }}
            />
            <Controller
              control={control}
              name="cluster"
              render={({ field }) => (
                <CustomInput
                  {...field}
                  errorMessage={
                    errors.cluster?.message || "Cluster Tidak boleh kosong"
                  }
                  isInvalid={!!errors.cluster}
                  label="Cluster"
                  labelPlacement="inside"
                  placeholder="Masukan Cluster"
                />
              )}
              rules={{ required: true }}
            />
          </div>
          <Table removeWrapper>
            <TableHeader>
              <TableColumn>Type</TableColumn>
              <TableColumn>Harga</TableColumn>
              <TableColumn>Komisi</TableColumn>
              <TableColumn className="text-right">
                <Button
                  isIconOnly
                  radius="full"
                  size="sm"
                  variant="light"
                  onPress={() =>
                    append({
                      type: "",
                      price: undefined,
                      commission_fee: undefined,
                    })
                  }
                >
                  <PlusCircleIcon className="text-success" />
                </Button>
              </TableColumn>
            </TableHeader>
            <TableBody>
              {fields.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Controller
                      control={control}
                      name={`variants.${i}.type`}
                      render={({ field }) => (
                        <CustomInput
                          {...field}
                          errorMessage={
                            errors?.variants?.[i]?.type?.message ||
                            "Type tidak boleh kosong"
                          }
                          isInvalid={!!errors?.variants?.[i]?.type}
                          placeholder="Masukan Tipe"
                        />
                      )}
                      rules={{ required: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={control}
                      name={`variants.${i}.price`}
                      render={({ field }) => (
                        <CustomInputNumber
                          {...field}
                          errorMessage={
                            errors?.variants?.[i]?.price?.message ||
                            "Price tidak boleh kosong"
                          }
                          isInvalid={!!errors?.variants?.[i]?.price}
                          labelPlacement="inside"
                          placeholder="contoh: 100.0000.000"
                          startContent={<p className="text-sm">Rp.</p>}
                          value={field.value as any}
                          onInput={(val) => field.onChange(val)}
                        />
                      )}
                      rules={{ required: true }}
                    />
                  </TableCell>
                  <TableCell>
                    <Controller
                      control={control}
                      name={`variants.${i}.commission_fee`}
                      render={({ field }) => (
                        <CustomInputNumber
                          {...field}
                          endContent={<p className="text-sm">%</p>}
                          errorMessage={
                            errors?.variants?.[i]?.commission_fee?.message ||
                            "Komisi tidak boleh kosong"
                          }
                          isInvalid={!!errors?.variants?.[i]?.commission_fee}
                          labelPlacement="inside"
                          placeholder="contoh: 2"
                          value={field.value as any}
                          onInput={(val) => field.onChange(val)}
                        />
                      )}
                      rules={{ required: true }}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      isIconOnly
                      radius="full"
                      size="sm"
                      variant="light"
                      onPress={() => remove(i)}
                    >
                      <Trash2Icon className="text-danger" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div>
            <p className="text-gray-600 pb-2">Description</p>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <QuillJS
                  value={field.value}
                  onContent={(val) => field.onChange(val)}
                />
              )}
            />
          </div>
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button color="primary" isLoading={loading} type="submit">
            Simpan
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
