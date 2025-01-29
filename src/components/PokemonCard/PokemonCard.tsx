import { Component } from 'react';
import { Pokemon } from '../../utils/types';
import './PokemonCard.css';

type PokemonCardProps = { pokemon: Pokemon | undefined };

export default class PokemonCard extends Component<PokemonCardProps, unknown> {
  render() {
    return this.props.pokemon ? (
      <div className="pokemon-card">
        <div>Name: {this.props.pokemon.name}</div>
        <div>Height: {this.props.pokemon.height}</div>
        <div>Weight: {this.props.pokemon.weight}</div>
      </div>
    ) : (
      <></>
    );
  }
}
