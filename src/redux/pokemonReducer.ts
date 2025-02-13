import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    search: '',
    pokemons: [],
    details: {},
    selectedPokemonIds: [],
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setPokemons: (state, action) => {
      state.pokemons = action.payload;
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setSearch, setPokemons, setDetails } = pokemonSlice.actions;

export default pokemonSlice.reducer;
