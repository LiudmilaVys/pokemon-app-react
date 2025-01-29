import { Pokemon } from './types';

export function parsePokemonsResponse(result: object[]): Pokemon[] {
  return result.map((pokemon: object) => {
    const rx = /https:\/\/pokeapi.co\/api\/v2\/pokemon\/([0-9]*)\//;
    const groups = rx.exec((pokemon as { url: string }).url) || [];

    return {
      id: groups[1],
      name: (pokemon as { name: string }).name,
    };
  });
}
