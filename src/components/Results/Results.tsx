import { useEffect, useState } from 'react';
import * as pokemonService from '../../services/pokemonService';
import Loader from '../../utils/Loader/Loader';
import { Pokemon } from '../../utils/types';
import { parsePokemonsResponse } from '../../utils/utils';
import PokemonList from '../PokemonList/PokemonList';

type ResultsProps = { search: string | undefined; generateAnError: boolean };

const Results = (props: ResultsProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.generateAnError) {
      throw new Error('Enabe ErrorBoundary fallback');
    }
  }, [props.generateAnError]);

  useEffect(() => {
    setIsLoading(true);

    if (props.search) {
      pokemonService
        .searchBy(props.search)
        .then((pokemonResp) => {
          setPokemons([
            {
              id: pokemonResp.id,
              name: pokemonResp.name,
              height: pokemonResp.height,
              weight: pokemonResp.weight,
            },
          ]);
        })
        .catch(() => {
          setPokemons([]);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      pokemonService.getAll().then((resp) => {
        const pokemons = parsePokemonsResponse(resp);

        setPokemons(pokemons);
        setIsLoading(false);
      });
    }
  }, [props.search]);

  const renderPokemons = () => {
    return pokemons.length ? (
      <PokemonList pokemons={pokemons}></PokemonList>
    ) : (
      <p>Not found</p>
    );
  };

  return <main>{isLoading ? <Loader></Loader> : renderPokemons()}</main>;
};

export default Results;
