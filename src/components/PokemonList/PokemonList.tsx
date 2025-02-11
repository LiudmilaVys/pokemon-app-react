import { Link } from 'react-router-dom';
import { Pokemon } from '../../utils/types';
import PageControls from '../PageControls/PageControls';
import './PokemonList.css';

type PokemonListProps = { pokemons: Pokemon[] };

const PokemonList = ({ pokemons }: PokemonListProps) => {
  const pokemonCards = pokemons?.map((pokemon) => (
    <li key={pokemon.id}>
      <Link to={`/details/${pokemon.id}`}> {pokemon.name} </Link>
    </li>
  ));

  return (
    <>
      <ul>{pokemonCards}</ul>
      <PageControls></PageControls>
    </>
  );
};

export default PokemonList;
