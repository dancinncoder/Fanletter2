// import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import letters from "../modules/letters";
import character from "../modules/character";
import auth from "redux/modules/auth";

// 1. create rootReducer with reducers
const rootReducer = combineReducers({
  letters,
  character,
  auth,
});

// 2. create store
const store = configureStore({
  reducer: {
    letters,
    character,
    auth,
  },
});

// 3. export
export default store;
