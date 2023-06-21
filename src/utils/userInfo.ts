import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", email: "" };

const userInfo = createSlice({
  name: "info",
  initialState: initialState,
  reducers: {
    name: (state, action) => {
      state.name = action.payload;
    },
    email: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { name, email } = userInfo.actions;
export default userInfo.reducer;
