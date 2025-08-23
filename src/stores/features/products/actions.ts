import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "@/config/axios";
import { IProductVariant } from "@/interface/Iproduct";

export const getProduct = createAsyncThunk("product", async () => {
  try {
    const { data } = await http.get("/products");

    return data;
  } catch (error) {
    return null;
  }
});

export function productAvgPrice(variants: IProductVariant[]) {
  let price = 0;
  let no = 0;

  for (const item of variants) {
    no++;
    price += Number(item.price);
  }

  return price / no;
}
