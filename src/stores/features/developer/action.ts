import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "@/config/axios";

export const getDeveloper = createAsyncThunk("developer-get", async () => {
  try {
    const { data } = await http.get("/developers");

    return data;
  } catch (error) {
    console.log(error);

    return [];
  }
});
