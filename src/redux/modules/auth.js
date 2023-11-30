import { createSlice } from "@reduxjs/toolkit";

const accessToken = localStorage.getItem("accessToken");
const initialState = !!accessToken; // local 토큰이 있으면, true / false

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
