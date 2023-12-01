import { createSlice } from "@reduxjs/toolkit";

// 1. localStorage에 저장한 토큰 꺼내오기 (Auth.jsx 106 에서 저장)
const accessToken = localStorage.getItem("accessToken");

// 2. localStorage에 저장한 id, nickname, avatar, success 꺼내오기 (FormArea.jsx 에서 저장할까?)
const id = localStorage.getItem("id");
const nickname = localStorage.getItem("nickname");
const success = localStorage.getItem("success");
const avatar = localStorage.getItem("avatar");

// 3. initialState에 저장한 값들 넣어주기

const initialState = {
  id: id,
  nickname: nickname,
  avatar: avatar,
  success: success,
  accessToken: accessToken,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    editUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { editUser } = userSlice.actions;
export default userSlice.reducer;
