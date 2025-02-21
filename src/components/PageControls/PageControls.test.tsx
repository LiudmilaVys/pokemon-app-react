import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { next, prev, set } from '../../redux/paginationReducer';
import PageControls from './PageControls';
import { EnhancedStore } from '@reduxjs/toolkit';
import { AppState } from '../../redux/store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

describe('PageControls Component', () => {
  let store: EnhancedStore;
  let setSearchParamsMock: jest.Mock;

  beforeEach(() => {
    setSearchParamsMock = jest.fn();
    (useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams({ page: '0' }),
      setSearchParamsMock,
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (initialState: AppState) => {
    const mockStore = configureStore([]);
    store = mockStore(initialState);
    store.dispatch = jest.fn();

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <PageControls />
        </MemoryRouter>
      </Provider>
    );
  };

  it('renders page controls correctly', () => {
    renderComponent({
      pagination: { currentPage: 1 },
      pokemon: { pokemons: new Array(20) },
    } as AppState);

    expect(screen.getByPlaceholderText('page number')).toHaveValue('1');
    expect(screen.getByText('Prev')).toBeEnabled();
    expect(screen.getByText('Next')).toBeEnabled();
  });

  it('dispatches prev action when Prev button is clicked', () => {
    renderComponent({
      pagination: { currentPage: 1 },
      pokemon: { pokemons: new Array(20) },
    } as AppState);
    fireEvent.click(screen.getByText('Prev'));
    expect(store.dispatch).toHaveBeenCalledWith(prev());
  });

  it('dispatches next action when Next button is clicked', () => {
    renderComponent({
      pagination: { currentPage: 1 },
      pokemon: { pokemons: new Array(20) },
    } as AppState);
    fireEvent.click(screen.getByText('Next'));
    expect(store.dispatch).toHaveBeenCalledWith(next());
  });

  it('disables Prev button on first page', () => {
    renderComponent({
      pagination: { currentPage: 0 },
      pokemon: { pokemons: new Array(20) },
    } as AppState);
    expect(screen.getByText('Prev')).toBeDisabled();
  });

  it('disables Next button when pokemon count is less than items per page', () => {
    renderComponent({
      pagination: { currentPage: 1 },
      pokemon: { pokemons: new Array(5) },
    } as AppState);
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('dispatches set action when input is changed', () => {
    renderComponent({
      pagination: { currentPage: 1 },
      pokemon: { pokemons: new Array(20) },
    } as AppState);
    const input = screen.getByPlaceholderText('page number');
    fireEvent.change(input, { target: { value: '3' } });
    expect(store.dispatch).toHaveBeenCalledWith(set(3));
  });

  it('updates search params when currentPage changes', () => {
    renderComponent({
      pagination: { currentPage: 2 },
      pokemon: { pokemons: new Array(20) },
    } as AppState);
    expect(setSearchParamsMock).toHaveBeenCalledWith({ page: '2' });
  });
});
