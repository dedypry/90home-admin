import { createSlice } from "@reduxjs/toolkit";

import { getProduct } from "./actions";

import { IPagination } from "@/interface/IPagination";
import { IProduct } from "@/interface/Iproduct";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: null as IPagination<IProduct[]> | null,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.products = action.payload;
    }),
});

export default productSlice.reducer;
