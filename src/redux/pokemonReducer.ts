import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../utils/types';

interface PokemonState {
  search: string;
  pokemons: Pokemon[];
  details: Pokemon | undefined;
  selectedPokemonIds: string[];
}

const initialState: PokemonState = {
  search: '',
  pokemons: [],
  details: undefined,
  selectedPokemonIds: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemons = action.payload;
    },
    setDetails: (state, action: PayloadAction<Pokemon | undefined>) => {
      state.details = action.payload;
    },
    selectPokemon: (state, action: PayloadAction<string>) => {
      state.selectedPokemonIds.push(action.payload);
    },
    deselectPokemon: (state, action: PayloadAction<string>) => {
      const ind = state.selectedPokemonIds.findIndex(
        (element) => element === action.payload
      );
      state.selectedPokemonIds.splice(ind, 1);
    },
  },
});

export const {
  setSearch,
  setPokemons,
  setDetails,
  selectPokemon,
  deselectPokemon,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
