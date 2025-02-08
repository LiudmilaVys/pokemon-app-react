import { ITEMS_PER_PAGE, POKEMON_API } from '../utils/constants';

export const getPage = async (pageNumber: number) => {
  const pokemons = await fetch(
    `${POKEMON_API}/pokemon?offset=${pageNumber * ITEMS_PER_PAGE}&limit=20`
  );
  const json = await pokemons.json();

  return json.results;
};

export const searchBy = async (searchValue: string) => {
  const pokemon = await fetch(`${POKEMON_API}/pokemon/${searchValue}`);
  return await pokemon.json();
};
