import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
}

const initialState: PaginationState = {
  currentPage: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    prev: (state) => {
      return {
        ...state,
        currentPage: Math.max(state.currentPage - 1, 0),
      };
    },
    next: (state) => {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    },
    set: (state, action: PayloadAction<number>) => {
      if (Number.isInteger(action.payload)) {
        return {
          ...state,
          currentPage: Math.max(action.payload, 0),
        };
      }
    },
  },
});

export const { prev, next, set } = paginationSlice.actions;

export default paginationSlice.reducer;
