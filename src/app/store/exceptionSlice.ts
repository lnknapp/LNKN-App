import { createSlice } from "@reduxjs/toolkit";
import { ExceptionLevel } from "../../models/exception/ExceptionLevel";

interface ExceptionSlice {
  message: string | null;
  show: boolean;
  level: ExceptionLevel | null;
}

const initialState: ExceptionSlice = {
  message: null,
  show: false,
  level: null,
};

const errorSlice = createSlice({
  name: "exception",
  initialState,
  reducers: {
    setInformation: (state, action) => {
      state.message = action.payload;
      state.show = true;
      state.level = ExceptionLevel.primary;
    },
    setWarning: (state, action) => {
      state.message = action.payload;
      state.show = true;
      state.level = ExceptionLevel.warning;
    },
    setError: (state, action) => {
      state.message = action.payload;
      state.show = true;
      state.level = ExceptionLevel.danger;
    },
    setSuccess: (state, action) => {
      state.message = action.payload;
      state.show = true;
      state.level = ExceptionLevel.success;
    },
    clearException: (state) => {
      state.message = null;
      state.show = false;
      state.level = null;
    },
  },
});

export const { setInformation, setWarning, setError, clearException, setSuccess } = errorSlice.actions;
export default errorSlice.reducer;
