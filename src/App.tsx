import { Component } from 'react';
import './App.css';
import PokemonList from './components/PokemonList/PokemonList';
import SearchBar from './components/SearchBar/SearchBar';
import * as pokemonService from './services/pokemonService';
import { Pokemon } from './utils/types';
import { parsePokemonsResponse } from './utils/utils';

type AppState = { pokemons: Pokemon[] };

export default class App extends Component<unknown, AppState> {
  submitSearch = async (searchValue: string | null) => {
    if (searchValue) {
      const pokemonResp = await pokemonService.searchBy(searchValue);

      this.setState({
        pokemons: [
          {
            id: pokemonResp.id,
            name: pokemonResp.name,
            height: pokemonResp.height,
            weight: pokemonResp.weight,
          },
        ],
      });
    } else {
      const pokemonsResp = await pokemonService.getAll();
      const pokemons = parsePokemonsResponse(pokemonsResp);

      this.setState({ pokemons });
    }
  };

  render() {
    return (
      <>
        <SearchBar onSearchSubmit={this.submitSearch}></SearchBar>
        <PokemonList pokemons={this.state?.pokemons}></PokemonList>
      </>
    );
  }
}
