import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import MainView from './components/MainView/MainView';
import NotFound from './components/NotFound/NotFound';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import { setSearch } from './redux/pokemonReducer';
import { AppState } from './redux/store';
import ThemeProvider from './theme/ThemeProvider';
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
      element: <MainView></MainView>,
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

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
