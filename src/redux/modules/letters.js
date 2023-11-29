import { createSlice } from '@reduxjs/toolkit';
import fakeData from 'database/fakeData.json';
const initialState = fakeData;

const lettersSlice = createSlice({
  name: "letters",
  initialState: initialState,
  reducers: {
    addLetter: (state, action) => {
      const newLetter = action.payload;
      return [newLetter, ...state];
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