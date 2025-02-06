import { Pokemon } from '../../utils/types';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonList.css';

type PokemonListProps = { pokemons: Pokemon[] };

const PokemonList = ({ pokemons }: PokemonListProps) => {
  const pokemonCards = pokemons?.map((pokemon) => (
    <li key={pokemon.id}>
      <PokemonCard pokemon={pokemon}></PokemonCard>
    </li>
  ));

  return <ul>{pokemonCards}</ul>;
};

export default PokemonList;
