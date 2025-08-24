import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";

import CustomInput from "@/components/forms/custom-input";
import CustomDatePicker from "@/components/forms/custom-date-picker";
import { dateFormat } from "@/utils/helpers/formater";
import CustomInputNumber from "@/components/forms/custom-input-number";
import DropZone from "@/components/forms/drop-zone";
import { uploadMultipleFile } from "@/utils/helpers/upload-file";

interface Props {
  variantId: string[];
}
export default function FormOrder({ variantId }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      blok: "",
      payment_type: "",
      customer: "",
      promo: "",
      booking_at: dateFormat(new Date().toISOString()),
      booking_fee: undefined as any,
      attachment: [],
      variantId: [] as string[],
    },
  });

  useEffect(() => {
    setValue("variantId", variantId);
  }, [variantId]);

  async function onSubmit(data: any) {
    if (files.length > 0) {
      const { urls } = await uploadMultipleFile(files);

      data.attachment = urls;
    }

    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Controller
          control={control}
          name="customer"
          render={({ field }) => (
            <CustomInput
              {...field}
              className="col-span-2"
              errorMessage="Nama Pembeli Tidak boleh kosong"
              isInvalid={!!errors.customer}
              label="Nama Pembeli"
              labelPlacement="inside"
              placeholder="Contoh: Dani "
            />
          )}
          rules={{ required: true }}
        />
        <Controller
          control={control}
          name="blok"
          render={({ field }) => (
            <CustomInput
              {...field}
              errorMessage="Blok Tidak boleh kosong"
              isInvalid={!!errors.blok}
              label="Blok"
              labelPlacement="inside"
              placeholder="Contoh: B6/7"
            />
          )}
          rules={{ required: true }}
        />

        <Controller
          control={control}
          name="promo"
          render={({ field }) => (
            <CustomInput
              {...field}
              label="Promo"
              labelPlacement="inside"
              placeholder="Contoh: Sale 99 "
            />
          )}
        />
        <Controller
          control={control}
          name="booking_fee"
          render={({ field }) => (
            <CustomInputNumber
              {...field}
              errorMessage="Booking Fee Tidak boleh kosong"
              isInvalid={!!errors.booking_fee}
              label="Booking Fee"
              labelPlacement="inside"
              placeholder="Contoh: 100.0000 "
              onInput={(val) => field.onChange(val)}
            />
          )}
        />
        <Controller
          control={control}
          name="booking_at"
          render={({ field }) => (
            <CustomDatePicker
              label="Tanggal Booking"
              labelPlacement="inside"
              placeholder="Contoh: Sale 99 "
              value={field.value}
              onChageValue={(val: string) => field.onChange(val)}
            />
          )}
        />

        <div className="col-span-2 mt-2">
          <p className="text-gray-600 pb-2">File Pendukung</p>
          <DropZone files={files} setFiles={setFiles} />
        </div>
      </div>

      <div className="py-5 flex justify-end">
        <Button color="primary" type="submit">
          Buat Order Baru
        </Button>
      </div>
    </form>
  );
}
