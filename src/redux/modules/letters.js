import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getDatabase = async () => {
  try {
    const response = await axios.get("http://localhost:5000/letters");
    return response.data;
  } catch (error) {
    console.error("db 가져오기 에러", error);
    throw error;
  }
};

const addLetterToDatabase = async (newLetter) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/letters",
      newLetter
    );
    return response.data;
  } catch (error) {
    console.error("편지 추가 에러", error);
    throw error;
  }
};

const deleteLetterFromDatabase = async (letterId) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/letters/${letterId}`
    );
    return letterId;
  } catch (error) {
    console.error("편지 삭제 에러", error);
    throw error;
  }
};

const editLetterInDatabase = async ({ id, editedContent }) => {
  try {
    const response = await axios.put(`http://localhost:5000/letters/${id}`, {
      id,
      content: editedContent,
    });
    return { ...response.data, content: editedContent }; // 편지의 수정된 정보를 반환
  } catch (error) {
    console.error("편지 수정 에러", error);
    throw error;
  }
};

export const __getLetters = createAsyncThunk(
  "getLetters",
  async (payload, thunkAPI) => {
    try {
      const data = await getDatabase();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addNewLetter = createAsyncThunk(
  "addNewLetter",
  async (newLetter, thunkAPI) => {
    try {
      const data = await addLetterToDatabase(newLetter);
      console.log("data after adding letter", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteLetter = createAsyncThunk(
  "deleteLetter",
  async (letterId, thunkAPI) => {
    try {
      await deleteLetterFromDatabase(letterId);
      return letterId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __editLetter = createAsyncThunk(
  "editLetter",
  async ({ id, editedContent }, thunkAPI) => {
    try {
      const data = await editLetterInDatabase({ id, editedContent });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const lettersSlice = createSlice({
  name: "letters",
  initialState: { letters: [], isLoading: false, isError: false, error: null },
  reducers: {
    addLetter: (state, action) => {
      const newLetter = action.payload;
      return [newLetter, ...state];
    },
    deleteLetter: (state, action) => {
      const letterIdToDelete = action.payload;
      state.letters = state.letters.filter(
        (letter) => letter.id !== letterIdToDelete
      );
    },
    editLetter: (state, action) => {
      const { id, editedContent } = action.payload;
      const letterToEdit = state.letters.find((letter) => letter.id === id);
      if (letterToEdit) {
        letterToEdit.content = editedContent;
      }
    },
  },
  extraReducers: {
    [__getLetters.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__getLetters.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = action.payload;
    },
    [__getLetters.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__addNewLetter.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__addNewLetter.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = [action.payload, ...state.letters];
    },
    [__addNewLetter.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__deleteLetter.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__deleteLetter.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.letters = state.letters.filter(
        (letter) => letter.id !== action.payload
      );
    },
    [__deleteLetter.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },

    [__editLetter.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [__editLetter.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      const editedLetter = action.payload;
      state.letters = state.letters.map((letter) =>
        letter.id === editedLetter.id
          ? { ...letter, content: editedLetter.content }
          : letter
      );
    },
    [__editLetter.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { addLetter, deleteLetter, editLetter } = lettersSlice.actions;
export default lettersSlice.reducer;
