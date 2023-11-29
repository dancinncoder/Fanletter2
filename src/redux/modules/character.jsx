
// const SET_CHARACTER = "character/SET_CHARACTER";

const { createSlice } = require("@reduxjs/toolkit");

// export const setCharacter = (payload) => {
//   return { 
//     type: SET_CHARACTER, payload
//   };
// }

// const initialState = {
//   'Paul' : true,
//   'Elio' : false,
//   'Gatsby' : false,
//   'Lee' : false,
// };

// const character = (state = initialState, action) => {
//   switch (action.type){
//     case  SET_CHARACTER:
//       const letterShown = action.payload;
//       console.log('letterShown',letterShown);
//       return letterShown;
//     default:
//       return state;
//   }
// };

// export default character;

const initialState = {
  'Paul' : true,
  'Elio' : false,
  'Gatsby' : false,
  'Lee' : false,
};

const characterSlice = createSlice({
  name: "character",
  initialState: initialState,
  reducers: {
    setCharacter : (state, action) => {
      return action.payload;
    }
  }
})

export const {setCharacter} = characterSlice.actions;
export default characterSlice.reducer;