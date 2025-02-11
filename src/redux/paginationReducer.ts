import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 0,
  },
  reducers: {
    prev: (state) => {
      state.currentPage += 1;
    },
    next: (state) => {
      state.currentPage = Math.max(state.currentPage - 1, 0);
    },
    set: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { prev, next, set } = paginationSlice.actions;

export default paginationSlice.reducer;
