import { Component } from 'react';
import { Pokemon } from '../../utils/types';
import './PokemonCard.css';

type PokemonCardProps = { pokemon: Pokemon | undefined };

export default class PokemonCard extends Component<PokemonCardProps, unknown> {
  render() {
    return this.props.pokemon ? (
      <div className="pokemon-card">
        <div>Name: {this.props.pokemon.name}</div>
        {this.props.pokemon.height && (
          <div>Height: {this.props.pokemon.height}</div>
        )}
        {this.props.pokemon.weight && (
          <div>Weight: {this.props.pokemon.weight}</div>
        )}
      </div>
    ) : (
      <></>
    );
  }
}
