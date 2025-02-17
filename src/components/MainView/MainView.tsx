import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
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
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import NavigateRootOnClick from '../NavigateRootOnClick/NavigateRootOnClick';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

const MainView = () => {
  const dispatch = useDispatch();

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
    <ErrorBoundary fallback={<p>Oops.. Something went wrong</p>}>
      <main>
        <NavigateRootOnClick>
          <ThemeSwitch></ThemeSwitch>
          <SearchBar></SearchBar>
          <SearchResults></SearchResults>
          {selectedPokemonCount > 0 && <DownloadControls></DownloadControls>}
        </NavigateRootOnClick>
      </main>
      <aside>
        <Outlet />
      </aside>
    </ErrorBoundary>
  );
};

export default MainView;
