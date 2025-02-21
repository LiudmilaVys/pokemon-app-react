import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './paginationReducer';
import { pokemonApi } from './pokemonApi';
import pokemonReducer from './pokemonReducer';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    pokemon: pokemonReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default store;
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
