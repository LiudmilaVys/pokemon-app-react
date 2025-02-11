import { useState } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';
import PokemonDetails from './components/PokemonDetails/PokemonDetails';
import Results from './components/Results/Results';
import SearchBar from './components/SearchBar/SearchBar';
import { searchBy } from './services/pokemonService';
import ErrorBoundary from './utils/ErrorBoundary/ErrorBoundary';

const App = () => {
  const [search, setSearch] = useState('');

  const submitSearch = async (searchValue: string) => {
    setSearch(searchValue || '');
  };

  const NotFound = () => <h2>404 - Not Found</h2>;

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ErrorBoundary fallback={<p>Oops.. Something went wrong</p>}>
          <main>
            <SearchBar onSearchSubmit={submitSearch}></SearchBar>
            <Results search={search}></Results>
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
          loader: async ({ params }) => {
            const { id } = params;
            return searchBy(id || '');
          },
          errorElement: <NotFound />,
        },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
