import { createSlice } from "@reduxjs/toolkit";

import { getDeveloper } from "./action";

import { IDeveloper } from "@/interface/IDeveloper";

export const developerSlice = createSlice({
  name: "developer",
  initialState: {
    developers: [] as IDeveloper[],
  },
  reducers: {},
  extraReducers: (builder) =>
    builder.addCase(getDeveloper.fulfilled, (state, action) => {
      state.developers = action.payload;
    }),
});

export const {} = developerSlice.actions;
export default developerSlice.reducer;
