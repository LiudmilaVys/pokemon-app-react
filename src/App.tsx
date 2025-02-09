import { useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import ErrorButton from './components/ErrorButton/ErrorButton';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import Results from './components/Results/Results';
import SearchBar from './components/SearchBar/SearchBar';
import { searchBy } from './services/pokemonService';
import ErrorBoundary from './utils/ErrorBoundary/ErrorBoundary';

const App = () => {
  const [search, setSearch] = useState('');
  const [isError, setIsError] = useState(false);

  const submitSearch = async (searchValue: string) => {
    setSearch(searchValue || '');
  };

  const onErrorHandler = (): void => {
    setIsError(!isError);
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <main>
            <SearchBar onSearchSubmit={submitSearch}></SearchBar>
            <ErrorBoundary fallback={<p>Oops.. Something went wrong</p>}>
              <Results search={search} generateAnError={isError}></Results>
            </ErrorBoundary>

            <aside>
              <Outlet />
            </aside>
          </main>
          {isError ? (
            <></>
          ) : (
            <ErrorButton onError={onErrorHandler}></ErrorButton>
          )}
        </>
      ),
      children: [
        {
          path: '/details/:id',
          element: <PokemonDetails />,
          loader: async ({ params }) => {
            const { id } = params;
            return searchBy(id || '');
          },
          errorElement: <h2>404 - Not Found</h2>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
