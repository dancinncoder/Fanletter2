// import { createStore } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import letters from "../modules/letters";
import character from "../modules/character";

// const rootReducer = combineReducers({
//     letters,
//     character,
// });
// const store = createStore(rootReducer);

// export default store;

// 1. create rootReducer with reducers
const rootReducer = combineReducers({
  letters,
  character,
});

// 2. create store
const store = configureStore({
  reducer: {
    letters,
    character,
  },
});

// 3. export
export default store;
