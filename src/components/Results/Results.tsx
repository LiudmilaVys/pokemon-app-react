import { useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as pokemonService from '../../services/pokemonService';
import Loader from '../../utils/Loader/Loader';
import { Pokemon } from '../../utils/types';
import { parsePokemonsResponse } from '../../utils/utils';
import PokemonList from '../PokemonList/PokemonList';

type ResultsProps = { search: string | undefined; generateAnError: boolean };

const Results = ({ search, generateAnError }: ResultsProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 0
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        navigate('/');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, navigate]);

  useEffect(() => {
    if (generateAnError) {
      throw new Error('Enabe ErrorBoundary fallback');
    }
  }, [generateAnError]);

  useEffect(() => {
    if (searchParams.get('page') !== currentPage.toString()) {
      setSearchParams({ page: currentPage.toString() });
    }
  }, [currentPage, setSearchParams, searchParams]);

  useEffect(() => {
    setIsLoading(true);

    if (search) {
      pokemonService
        .searchBy(search)
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
      pokemonService.getPage(currentPage).then((resp) => {
        const pokemons = parsePokemonsResponse(resp);

        setPokemons(pokemons);
        setIsLoading(false);
      });
    }
  }, [search, currentPage]);

  const renderPokemons = () => {
    return !!search && pokemons.length ? (
      <p>Not found</p>
    ) : (
      <div ref={ref}>
        <PokemonList
          pokemons={pokemons}
          currentPage={currentPage}
          nextPage={() => setCurrentPage((prev) => prev + 1)}
          prevPage={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
          setCurrentPage={(pageNumber) => setCurrentPage(pageNumber)}
        ></PokemonList>
      </div>
    );
  };

  return <div>{isLoading ? <Loader></Loader> : renderPokemons()}</div>;
};

export default Results;
