import { createSlice } from '@reduxjs/toolkit';

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    search: '',
    pokemons: [],
    selectedPokemonIds: [],
  },
  reducers: {
    // triggerSearch: (state) => {},
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    add: (state) => {
      state.pokemons.push();
    },
    // remove: (state) => {},
  },
});

export const { setSearch, add } = pokemonSlice.actions;

export default pokemonSlice.reducer;
