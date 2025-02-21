import { EnhancedStore } from '@reduxjs/toolkit';
import { fireEvent, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { deselectPokemon, selectPokemon } from '../../redux/pokemonReducer';
import SearchResults from './SearchResults';

describe('SearchResults', () => {
  const mockStore = configureStore([]);
  let store: EnhancedStore;

  beforeEach(() => {
    store = mockStore({
      pokemon: {
        isLoading: false,
        notFound: false,
        search: '',
        pokemons: [
          { id: '1', name: 'Pikachu' },
          { id: '2', name: 'Charmander' },
        ],
        selectedPokemons: [],
      },
      pagination: {
        currentPage: 0,
      },
    });
    store.dispatch = jest.fn();
  });

  it('should show loading when isLoading is true', () => {
    store = mockStore({
      pokemon: {
        isLoading: true,
        notFound: false,
        pokemons: [],
        selectedPokemons: [],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('Content is loaging ...')).toBeInTheDocument();
  });

  it('should show NotFound component when notFound is true', () => {
    store = mockStore({
      pokemon: {
        isLoading: false,
        notFound: true,
        pokemons: [],
        selectedPokemons: [],
      },
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('Not Found')).toBeInTheDocument();
  });

  it('should render list of pokemons', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </Provider>
    );

    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('should dispatch selectPokemon action when checkbox is checked', () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </Provider>
    );

    const checkboxes = getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(store.dispatch).toHaveBeenCalledWith(
      selectPokemon({ id: '1', name: 'Pikachu' })
    );
  });

  it('should dispatch deselectPokemon action when checkbox is unchecked', () => {
    store = mockStore({
      pokemon: {
        isLoading: false,
        notFound: false,
        search: '',
        pokemons: [{ id: '1', name: 'Pikachu' }],
        selectedPokemons: [{ id: '1', name: 'Pikachu' }],
      },
      pagination: {
        currentPage: 0,
      },
    });
    store.dispatch = jest.fn();

    const { getByRole } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchResults />
        </MemoryRouter>
      </Provider>
    );
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(store.dispatch).toHaveBeenCalledWith(deselectPokemon('1'));
  });
});
