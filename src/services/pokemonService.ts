import { ITEMS_PER_PAGE, POKEMON_API } from '../utils/constants';
import { Pokemon } from '../utils/types';
import { parsePokemonsResponse } from '../utils/utils';

export const getPage = async (pageNumber: number): Promise<Pokemon[]> => {
  const resp = await fetch(
    `${POKEMON_API}/pokemon?offset=${pageNumber * ITEMS_PER_PAGE}&limit=20`
  );
  const json = await resp.json();
  const pokemons = parsePokemonsResponse(json.results);

  return pokemons;
};

export const searchBy = async (searchValue: string): Promise<Pokemon> => {
  const resp = await fetch(`${POKEMON_API}/pokemon/${searchValue}`);
  const pokemon = await resp.json();

  return {
    id: pokemon.id,
    name: pokemon.name,
    avatarSrc: pokemon.sprites.front_default,
    height: pokemon.height,
    weight: pokemon.weight,
  };
};
