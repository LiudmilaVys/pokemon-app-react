import { Component } from 'react';
import './App.css';
import ErrorButton from './components/ErrorButton/ErrorButton';
import PokemonList from './components/PokemonList/PokemonList';
import SearchBar from './components/SearchBar/SearchBar';
import * as pokemonService from './services/pokemonService';
import Loader from './utils/Loader/Loader';
import { Pokemon } from './utils/types';
import { parsePokemonsResponse } from './utils/utils';
import { ErrorBoundary } from './utils/ErrorBoundary/ErrorBoundary';

type AppState = { pokemons: Pokemon[]; isLoading: boolean; isError: boolean };

export default class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      pokemons: [],
      isLoading: false,
      isError: false,
    };
  }

  submitSearch = async (searchValue: string | null) => {
    this.setState({ isLoading: true, isError: false }, async () => {
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

  onErrorHandler = () => {
    this.setState({ isError: !this.state.isError });
  };

  render() {
    return (
      <>
        <SearchBar onSearchSubmit={this.submitSearch}></SearchBar>
        <main>
          {this.state.isLoading ? (
            <Loader></Loader>
          ) : (
            <>
              <ErrorBoundary fallback={<p>Oops.. Please update search</p>}>
                <PokemonList
                  pokemons={this.state?.pokemons}
                  generateAnError={this.state.isError}
                ></PokemonList>
              </ErrorBoundary>
            </>
          )}
        </main>
        <ErrorButton onError={this.onErrorHandler}></ErrorButton>
      </>
    );
  }
}
