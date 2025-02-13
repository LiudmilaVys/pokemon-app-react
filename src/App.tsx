import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import NotFound from './components/NotFound/NotFound';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';
import { setSearch } from './redux/pokemonReducer';
import { AppState } from './redux/store';
import { SEARCH_VALUE_KEY } from './utils/constants';
import useLocalStorage from './utils/useLocalStorage';

const App = () => {
  const [savedSearchQuery, setSavedSearchQuery] = useLocalStorage(
    SEARCH_VALUE_KEY,
    ''
  );
  const searchQuery = useSelector((state: AppState) => state.pokemon.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearch(savedSearchQuery));
  }, [savedSearchQuery, dispatch]);
  useEffect(() => {
    setSavedSearchQuery(searchQuery);
  }, [searchQuery, setSavedSearchQuery]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ErrorBoundary fallback={<p>Oops.. Something went wrong</p>}>
          <main>
            <SearchBar></SearchBar>
            <SearchResults></SearchResults>
          </main>
          <aside>
            <Outlet />
          </aside>
        </ErrorBoundary>
      ),
      children: [
        {
          path: '/details/:id',
          element: <PokemonDetails />,
          errorElement: <NotFound />,
        },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
