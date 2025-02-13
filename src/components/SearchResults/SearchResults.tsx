import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAllQuery, useSearchByQuery } from '../../redux/pokemonApi';
import {
  deselectPokemon,
  selectPokemon,
  setPokemons,
} from '../../redux/pokemonReducer';
import { AppState } from '../../redux/store';
import { Pokemon } from '../../utils/types';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import PageControls from '../PageControls/PageControls';

const SearchResults = () => {
  const pokemons = useSelector((state: AppState) => state.pokemon.pokemons);
  const selectedPokemonIds = useSelector(
    (state: AppState) => state.pokemon.selectedPokemonIds
  );
  const searchQuery = useSelector((state: AppState) => state.pokemon.search);
  const currentPage = useSelector(
    (state: AppState) => state.pagination.currentPage
  );
  const searchQueryResult = useSearchByQuery(searchQuery, {
    skip: !searchQuery,
  });
  const allPokemonsResult = useGetAllQuery(currentPage, {
    skip: !!searchQuery,
  });
  const notFound = searchQuery
    ? searchQueryResult.error
    : allPokemonsResult.error;
  const loadedPokemons = useMemo(() => {
    return searchQuery ? [searchQueryResult.data] : allPokemonsResult.data;
  }, [searchQuery, searchQueryResult.data, allPokemonsResult.data]);
  const isLoading = searchQuery
    ? searchQueryResult.isLoading
    : allPokemonsResult.isLoading;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading) {
      dispatch(setPokemons(loadedPokemons as Pokemon[]));
    }
  }, [loadedPokemons, isLoading, dispatch]);

  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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

  const toggleCheckbox = (id: string) => {
    if (isChecked(id)) {
      dispatch(deselectPokemon(id));
    } else {
      dispatch(selectPokemon(id));
    }
  };

  const isChecked = (id: string) => {
    return selectedPokemonIds.indexOf(id) > -1;
  };

  const renderPokemons = () => {
    if (notFound) {
      return <NotFound></NotFound>;
    }

    return (
      <div ref={ref}>
        <>
          <ul>
            {pokemons?.map((pokemon: Pokemon) => {
              return (
                <li key={pokemon.id}>
                  <input
                    type="checkbox"
                    defaultChecked={isChecked(pokemon.id)}
                    onChange={() => toggleCheckbox(pokemon.id)}
                  ></input>
                  <Link to={`/details/${pokemon.id}`}> {pokemon.name} </Link>
                </li>
              );
            })}
          </ul>
          {!searchQuery && <PageControls></PageControls>}
        </>
      </div>
    );
  };

  return <div>{isLoading ? <Loader></Loader> : renderPokemons()}</div>;
};

export default SearchResults;
