import { EnhancedStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Provider, useDispatch } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
import { setSearch } from './redux/pokemonReducer';
import { SEARCH_VALUE_KEY } from './utils/constants';
import useLocalStorage from './utils/useLocalStorage';
fetchMock.enableMocks();

jest.mock('./redux/pokemonApi', () => ({
  ...jest.requireActual('./redux/pokemonApi'),
  useGetAllQuery: jest.fn(),
  useSearchByQuery: jest.fn(),
}));
jest.mock('./utils/useLocalStorage', () => ({
  __esModule: true,
  default: jest.fn(() => ['', jest.fn()]),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('./components/MainView/MainView', () => {
  const MockMainView = () => <div>MainView</div>;
  MockMainView.displayName = 'MainView';
  return MockMainView;
});

describe('App Component', () => {
  let store: EnhancedStore;
  let mockDispatch: jest.Mock;

  beforeEach(() => {
    const mockStore = configureStore([]);
    store = mockStore({
      pokemon: {
        search: '',
        selectedPokemons: [],
      },
      pagination: {
        currentPage: 0,
      },
    });

    mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useLocalStorage as jest.Mock).mockReturnValue(['', jest.fn()]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve search query from localStorage and update Redux store', () => {
    (useLocalStorage as jest.Mock).mockImplementation(() => [
      'test',
      jest.fn(),
    ]);
    (useDispatch as unknown as jest.Mock).mockReturnValue(jest.fn());

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(useLocalStorage).toHaveBeenCalledWith(SEARCH_VALUE_KEY, '');
  });

  it('should dispatch setSearch action on mount', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(setSearch(''));
  });

  it('should save the updated search query to localStorage', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(useLocalStorage).toHaveBeenCalledWith(SEARCH_VALUE_KEY, '');
  });
});
