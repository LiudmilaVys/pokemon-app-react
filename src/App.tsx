import { Component } from 'react';
import './App.css';
import PokemonList from './components/PokemonList/PokemonList';
import SearchBar from './components/SearchBar/SearchBar';
import * as pokemonService from './services/pokemonService';
import { Pokemon } from './utils/types';
import { parsePokemonsResponse } from './utils/utils';
import Loader from './utils/Loader/Loader';

type AppState = { pokemons: Pokemon[]; isLoading: boolean };

export default class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      pokemons: [],
      isLoading: false,
    };
  }

  submitSearch = async (searchValue: string | null) => {
    this.setState({ isLoading: true }, async () => {
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
          isLoading: false,
        });
      } else {
        const pokemonsResp = await pokemonService.getAll();
        const pokemons = parsePokemonsResponse(pokemonsResp);

        this.setState({ pokemons, isLoading: false });
      }
    });
  };

  render() {
    return (
      <>
        <SearchBar onSearchSubmit={this.submitSearch}></SearchBar>
        {this.state.isLoading ? (
          <Loader></Loader>
        ) : (
          <PokemonList pokemons={this.state?.pokemons}></PokemonList>
        )}
      </>
    );
  }
}
