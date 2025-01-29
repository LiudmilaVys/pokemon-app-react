import { Component } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard/PokemonCard';
import SearchBar from './components/SearchBar/SearchBar';
import * as pokemonService from './services/pokemonService';
import { Pokemon } from './utils/types';

type AppState = { pokemon?: Pokemon | undefined };

export default class App extends Component<unknown, AppState> {
  submitSearch = async (searchValue: string) => {
    const pokemon = await pokemonService.searchBy(searchValue);
    this.setState({
      pokemon: {
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
      },
    });
  };

  render() {
    return (
      <>
        <SearchBar onSearchSubmit={this.submitSearch}></SearchBar>
        <PokemonCard pokemon={this.state?.pokemon}></PokemonCard>
      </>
    );
  }
}
