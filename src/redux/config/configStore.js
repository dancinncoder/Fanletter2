// import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import letters from "../modules/letters";
import character from "../modules/character";
import auth from "redux/modules/auth";
import user from "redux/modules/user";

// 1. create rootReducer with reducers
const rootReducer = combineReducers({
  letters,
  character,
  auth,
  user,
});

// 2. create store
const store = configureStore({
  reducer: {
    letters,
    character,
    auth,
    user,
  },
});

// 3. export
export default store;
