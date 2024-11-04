import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  like: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialStateValues,
  reducers: {
    increment: (state) => {
      state.like += 1;
    },
    decrement: (state) => {
      state.like -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
