import { Component } from 'react';
import { Pokemon } from '../../utils/types';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonList.css';

type PokemonListProps = { pokemons: Pokemon[] };

export default class PokemonList extends Component<PokemonListProps, unknown> {
  render() {
    const pokemonCards = this.props.pokemons?.map((pokemon) => (
      <li key={pokemon.id}>
        <PokemonCard pokemon={pokemon}></PokemonCard>
      </li>
    ));

    return <ul>{pokemonCards}</ul>;
  }
}
