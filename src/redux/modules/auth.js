import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsAuthorized: (state, action) => {
      // return action.payload;
      return !action.payload;
    },
  },
});

export const { setIsAuthorized } = authSlice.actions;
export default authSlice.reducer;
