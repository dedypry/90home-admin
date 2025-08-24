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

export function productMinMaxPrice(variants: IProductVariant[]) {
  if (!variants || variants.length === 0) {
    return { min: 0, max: 0 };
  }

  const prices = variants.map((v) => Number(v.price));

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

export function formatCompactIdr(val: number | string) {
  if (!val) return "-";

  const num = Number(val);

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2).replace(/\.00$/, "") + " M";
  } else if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2).replace(/\.00$/, "") + " Jt";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(2).replace(/\.00$/, "") + " Rb";
  }

  return num.toString();
}
