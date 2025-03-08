import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ITEMS_PER_PAGE, POKEMON_API_URL } from '../utils/constants';
import { parsePokemonsResponse } from '../utils/utils';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: POKEMON_API_URL }),
  endpoints: (builder) => ({
    getAll: builder.query({
      query: (pageNumber) =>
        `/pokemon?offset=${pageNumber * ITEMS_PER_PAGE}&limit=20`,
      transformResponse: (response: { results: [] }) =>
        parsePokemonsResponse(response.results),
    }),
    searchBy: builder.query({
      query: (searchValue) => `/pokemon/${searchValue}`,
      transformResponse: (response: {
        status: number;
        id: string;
        name: string;
        sprites: { front_default: string };
        height: number;
        weight: number;
      }) => {
        return {
          id: response.id,
          name: response.name,
          avatarSrc: response.sprites.front_default,
          height: response.height,
          weight: response.weight,
        };
      },
    }),
  }),
});

export const { useGetAllQuery, useSearchByQuery } = pokemonApi;
