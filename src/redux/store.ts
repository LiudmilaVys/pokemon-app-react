import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './paginationReducer';
import pokemonReducer from './pokemonReducer';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    pokemon: pokemonReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
