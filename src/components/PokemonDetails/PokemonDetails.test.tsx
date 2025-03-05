import { EnhancedStore } from '@reduxjs/toolkit';
import { fireEvent, render } from '@testing-library/react';
import { useParams, useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useSearchByQuery } from '../../redux/pokemonApi';
import { setDetails } from '../../redux/pokemonReducer';
import PokemonDetails from './PokemonDetails';

jest.mock('../../redux/pokemonApi', () => ({
  useSearchByQuery: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('PokemonDetails', () => {
  const mockStore = configureStore([]);
  let store: EnhancedStore;
  let routerPushMock: jest.Mock;

  beforeEach(() => {
    store = mockStore({
      pokemon: { details: null },
    });
    store.dispatch = jest.fn();
    (useSearchByQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });

    routerPushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show loading when fetching data', () => {
    (useSearchByQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
    });

    const { getByText } = render(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    expect(getByText('Content is loaging ...')).toBeInTheDocument();
  });

  it('should display Pokemon details when data is available', () => {
    (useSearchByQuery as jest.Mock).mockReturnValue({
      data: { id: '1', name: 'Pikachu' },
      isFetching: false,
    });
    store = mockStore({
      pokemon: { details: { id: '1', name: 'Pikachu' } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    expect(getByText(/Pikachu/)).toBeInTheDocument();
  });

  it('should display message when no Pokemon is found', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    expect(getByText('Not Found')).toBeInTheDocument();
  });

  it('should dispatch setDetails on unmount', () => {
    const { unmount } = render(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    unmount();
    expect(store.dispatch).toHaveBeenCalledWith(setDetails(undefined));
  });

  it('should navigate back when Close button is clicked', () => {
    const { getByRole } = render(
      <Provider store={store}>
        <PokemonDetails />
      </Provider>
    );

    const closeButton = getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    expect(routerPushMock).toHaveBeenCalledWith('/');
  });
});
