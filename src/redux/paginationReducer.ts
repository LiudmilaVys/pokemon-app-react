import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 0,
  },
  reducers: {
    prev: (state) => {
      state.currentPage = Math.max(state.currentPage - 1, 0);
    },
    next: (state) => {
      state.currentPage += 1;
    },
    set: (state, action) => {
      if (Number.isInteger(action.payload)) {
        state.currentPage = Math.max(action.payload, 0);
      }
    },
  },
});

export const { prev, next, set } = paginationSlice.actions;

export default paginationSlice.reducer;
