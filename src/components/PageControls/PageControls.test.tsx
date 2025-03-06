import { EnhancedStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { next, prev, set } from '../../redux/paginationReducer';
import { AppState } from '../../redux/store';
import PageControls from './PageControls';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe('PageControls Component', () => {
  let store: EnhancedStore;
  let routerPushMock: jest.Mock;

  beforeEach(() => {
    routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    (useSearchParams as jest.Mock).mockReturnValue({ get: () => '1' });
    (usePathname as jest.Mock).mockReturnValue('/');
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
        <PageControls />
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

    const params = new URLSearchParams({
      get: () => '1',
    } as unknown as URLSearchParams);
    params.set('page', '2');
    expect(routerPushMock).toHaveBeenCalledWith(`/?${params.toString()}`);
  });
});
