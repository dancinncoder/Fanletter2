// import fakeData from 'database/fakeData.json';
// const ADD_LETTER = "letters/ADD_LETTER";
// const DELETE_LETTER = "letters/DELETE_LETTER";
// const EDIT_LETTER = "letters/EDIT_LETTER";


// export const addLetter = (payload) => {
//   return {
//     type: ADD_LETTER,
//     payload,
//   }
// }
// export const deleteLetter = (payload) => {
//   return {
//     type: DELETE_LETTER,
//     payload,
//   }
// }
// export const editLetter = (payload) => {
//   return {
//     type: EDIT_LETTER,
//     payload,
//   }
// }

// const initialState = fakeData;

// const letters = (state = initialState, action) => {
//   switch (action.type){
//     case ADD_LETTER:
//       const newLetter = action.payload;
//       return [...state, newLetter]; //OK
//     case DELETE_LETTER:
//       const filteredLetters = state.filter(letter => letter.id !== action.payload);
//       return filteredLetters;
//     case EDIT_LETTER:
//       const  { id, editedMessage } = action.payload;
//       const updatedLetters = state.map((letter)=> {
//         if(letter.id === id){
//           return {...letter, message: editedMessage};
//         } else {
//           return letter;
//         }
//       });
//       return updatedLetters;
//     default:
//       return state;
//   }
// }

// export default letters;


////////

import { createSlice } from '@reduxjs/toolkit';
import fakeData from 'database/fakeData.json';
const initialState = fakeData;

const lettersSlice = createSlice({
  name: "letters",
  initialState: initialState,
  reducers: {
    addLetter: (state, action) => {
      const newLetter = action.payload;
      return [...state, newLetter];
    },
    deleteLetter: (state, action) => {
      const filteredLetters = state.filter(letter => letter.id !== action.payload);
      return filteredLetters;
    },
    editLetter: (state, action) => {
      const  { id, editedMessage } = action.payload;
      const updatedLetters = state.map((letter)=> {
        if(letter.id === id){
          return {...letter, message: editedMessage};
        } else {
          return letter;
        }
      });
      return updatedLetters;
    }
  }
});

export const { addLetter, deleteLetter, editLetter } = lettersSlice.actions;
export default lettersSlice.reducer;