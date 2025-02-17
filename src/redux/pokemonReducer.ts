import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from '../utils/types';

interface PokemonState {
  search: string;
  pokemons: Pokemon[];
  details: Pokemon | undefined;
  selectedPokemons: Pokemon[];
  isLoading: boolean;
  notFound: boolean;
}

const initialState: PokemonState = {
  search: '',
  pokemons: [],
  details: undefined,
  selectedPokemons: [],
  isLoading: false,
  notFound: false,
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        search: action.payload,
      };
    },
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      return {
        ...state,
        pokemons: action.payload,
      };
    },
    setDetails: (state, action: PayloadAction<Pokemon | undefined>) => {
      return {
        ...state,
        details: action.payload,
      };
    },
    selectPokemon: (state, action: PayloadAction<Pokemon>) => {
      return {
        ...state,
        selectedPokemons: [...state.selectedPokemons, action.payload],
      };
    },
    deselectPokemon: (state, action: PayloadAction<string>) => {
      const ind = state.selectedPokemons.findIndex(
        (pokemon) => pokemon.id === action.payload
      );

      return {
        ...state,
        selectedPokemons: [
          ...state.selectedPokemons.slice(0, ind),
          ...state.selectedPokemons.slice(ind + 1),
        ],
      };
    },
    deselectAllPokemons: (state) => {
      return {
        ...state,
        selectedPokemons: [],
      };
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    setNotFound: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        notFound: action.payload,
      };
    },
  },
});

export const {
  setSearch,
  setPokemons,
  setDetails,
  selectPokemon,
  deselectPokemon,
  deselectAllPokemons,
  setIsLoading,
  setNotFound,
} = pokemonSlice.actions;

export default pokemonSlice.reducer;
