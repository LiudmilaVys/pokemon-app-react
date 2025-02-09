import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import { Pokemon } from '../../utils/types';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonList.css';

type PokemonListProps = {
  pokemons: Pokemon[];
  currentPage: number;
  prevPage: () => void;
  nextPage: () => void;
  setCurrentPage: (pageNumber: number) => void;
};

const PokemonList = ({
  pokemons,
  currentPage,
  prevPage,
  nextPage,
  setCurrentPage,
}: PokemonListProps) => {
  const [inputValue, setInputValue] = useState(currentPage);

  const pokemonCards = pokemons?.map((pokemon) => (
    <li key={pokemon.id}>
      <Link to={`/details/${pokemon.id}`}>
        <PokemonCard pokemon={pokemon}></PokemonCard>
      </Link>
    </li>
  ));

  return (
    <>
      <ul>{pokemonCards}</ul>

      <div className="pokemon-list__controls">
        <button onClick={prevPage} disabled={currentPage === 0}>
          {' '}
          Prev{' '}
        </button>
        <input
          type="text"
          placeholder="page number"
          value={inputValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setInputValue(Number(event.target.value))
          }
          onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
              setCurrentPage(inputValue);
            }
          }}
        ></input>
        <button onClick={nextPage} disabled={pokemons.length < ITEMS_PER_PAGE}>
          {' '}
          Next{' '}
        </button>
      </div>
    </>
  );
};

export default PokemonList;
