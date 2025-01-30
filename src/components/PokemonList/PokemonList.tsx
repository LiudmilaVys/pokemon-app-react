import { Component } from 'react';
import { Pokemon } from '../../utils/types';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonList.css';

type PokemonListProps = { pokemons: Pokemon[]; generateAnError: boolean };

export default class PokemonList extends Component<PokemonListProps, unknown> {
  componentDidUpdate() {
    if (this.props.generateAnError) {
      throw new Error('Enabe ErrorBoundary fallback');
    }
  }

  render() {
    const pokemonCards = this.props.pokemons?.map((pokemon) => (
      <li key={pokemon.id}>
        <PokemonCard pokemon={pokemon}></PokemonCard>
      </li>
    ));

    return <ul>{pokemonCards}</ul>;
  }
}
