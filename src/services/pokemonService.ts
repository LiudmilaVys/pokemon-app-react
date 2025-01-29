import { POKEMON_API } from '../utils/constants';

export const getAll = async () => {
  const pokemons = await fetch(`${POKEMON_API}/pokemon?offset=0&limit=10`);
  const json = await pokemons.json();

  return json.results;
};

export const searchBy = async (searchValue: string) => {
  const pokemon = await fetch(`${POKEMON_API}/pokemon/${searchValue}`);
  return await pokemon.json();
};
