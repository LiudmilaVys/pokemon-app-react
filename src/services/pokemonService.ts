import { POKEMON_API } from '../utils/constants';

export const searchBy = async (searchValue: string) => {
  const pokemons = await fetch(`${POKEMON_API}/pokemon/${searchValue}`);
  return await pokemons.json();
};
