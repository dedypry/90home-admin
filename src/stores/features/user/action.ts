import { createAsyncThunk } from "@reduxjs/toolkit";

import { http } from "@/config/axios";
import { notifyError } from "@/utils/helpers/notify";
import { IQueryPagination } from "@/interface/IPagination";

export const getUser = createAsyncThunk(
  "user/get-user",
  async ({
    page = 1,
    pageSize = 10,
    q = "",
    status = "",
  }: IQueryPagination) => {
    try {
      const { data } = await http.get(
        `/members?page=${page}&pageSize=${pageSize}&q=${q}&status=${status}`,
      );

      return data;
    } catch (error) {
      console.log("GET USER", error);

      return {};
    }
  },
);

export const getUserDetail = createAsyncThunk(
  "user-detail",
  async ({ id }: { id: number }) => {
    try {
      const { data } = await http.get(`/members/${id}`);

      return data;
    } catch (error) {
      notifyError(error as any);

      return null;
    }
  },
);
