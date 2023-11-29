const { createSlice } = require("@reduxjs/toolkit");

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