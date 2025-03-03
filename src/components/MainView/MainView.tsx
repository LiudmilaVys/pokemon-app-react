import ErrorButton from 'components/ErrorButton/ErrorButton';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllQuery, useSearchByQuery } from '../../redux/pokemonApi';
import {
  setIsLoading,
  setNotFound,
  setPokemons,
} from '../../redux/pokemonReducer';
import { AppState } from '../../redux/store';
import ThemeSwitch from '../../theme/ThemeSwitch';
import { Pokemon } from '../../utils/types';
import DownloadControls from '../DownloadControls/DownloadControls';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

const MainView = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (error) {
      throw new Error('Test error');
    }
  }, [error]);

  const selectedPokemonCount = useSelector(
    (state: AppState) => state.pokemon.selectedPokemons.length
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
    ? searchQueryResult.isFetching
    : allPokemonsResult.isFetching;

  useEffect(() => {
    dispatch(setIsLoading(isLoading));
    dispatch(setNotFound(!!notFound));

    if (!isLoading) {
      dispatch(setPokemons(loadedPokemons as Pokemon[]));
    }
  }, [loadedPokemons, isLoading, notFound, dispatch]);

  return (
    <>
      <main>
        <div>
          <ThemeSwitch></ThemeSwitch>
          <SearchBar></SearchBar>
          <SearchResults></SearchResults>
          {selectedPokemonCount > 0 && <DownloadControls></DownloadControls>}
        </div>
        <ErrorButton onError={() => setError(true)}></ErrorButton>
      </main>
      <aside>{children}</aside>
    </>
  );
};

export default MainView;
