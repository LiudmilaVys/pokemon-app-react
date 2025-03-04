import { EnhancedStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { Provider, useDispatch, useSelector } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useGetAllQuery, useSearchByQuery } from '../../redux/pokemonApi';
import { setIsLoading } from '../../redux/pokemonReducer';
import MainView from './MainView';
fetchMock.enableMocks();

jest.mock('../../redux/pokemonApi', () => ({
  ...jest.requireActual('../../redux/pokemonApi'),
  useGetAllQuery: jest.fn(),
  useSearchByQuery: jest.fn(),
}));
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../DownloadControls/DownloadControls', () => {
  const DownloadControls = () => <div>DownloadControls</div>;
  DownloadControls.displayName = 'DownloadControls';
  return DownloadControls;
});
jest.mock('../SearchBar/SearchBar', () => {
  const SearchBar = () => <div>SearchBar</div>;
  SearchBar.displayName = 'SearchBar';
  return SearchBar;
});
jest.mock('../SearchResults/SearchResults', () => {
  const SearchResults = () => <div>SearchResults</div>;
  SearchResults.displayName = 'SearchResults';
  return SearchResults;
});
jest.mock('../../theme/ThemeSwitch', () => {
  const ThemeSwitch = () => <div>ThemeSwitch</div>;
  ThemeSwitch.displayName = 'ThemeSwitch';
  return ThemeSwitch;
});
jest.mock('../NavigateRootOnClickOurside/NavigateRootOnClickOurside', () => {
  const NavigateRootOnClickOurside = ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>;
  NavigateRootOnClickOurside.displayName = 'NavigateRootOnClickOurside';
  return NavigateRootOnClickOurside;
});
jest.mock('../ErrorBoundary/ErrorBoundary', () => {
  const ErrorBoundary = ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  );
  ErrorBoundary.displayName = 'ErrorBoundary';
  return ErrorBoundary;
});

describe('MainView', () => {
  let store: EnhancedStore;
  let dispatch: jest.Mock;

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  beforeEach(() => {
    const mockStore = configureStore([]);
    store = mockStore({
      pokemon: {
        selectedPokemons: [],
        search: '',
        selectedPokemonIds: [],
      },
      pagination: {
        currentPage: 0,
      },
    });

    dispatch = jest.fn();
    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatch);
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(store.getState())
    );
    (useGetAllQuery as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isFetching: false,
    });
    (useSearchByQuery as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isFetching: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the main view correctly', () => {
    render(
      <Provider store={store}>
        <MainView />
      </Provider>
    );

    expect(screen.getByText('ThemeSwitch')).toBeInTheDocument();
    expect(screen.getByText('SearchBar')).toBeInTheDocument();
    expect(screen.getByText('SearchResults')).toBeInTheDocument();
  });

  it('displays "DownloadControls" when selectedPokemons > 0', () => {
    (useSelector as unknown as jest.Mock).mockImplementationOnce((selector) =>
      selector({
        pokemon: { selectedPokemons: [{ name: 'Pikachu' }] },
        pagination: { currentPage: 1 },
      })
    );

    render(
      <Provider store={store}>
        <MainView />
      </Provider>
    );

    expect(screen.getByText('DownloadControls')).toBeInTheDocument();
  });

  it('does not display "DownloadControls" when selectedPokemons is empty', () => {
    render(
      <Provider store={store}>
        <MainView />
      </Provider>
    );

    expect(screen.queryByText('DownloadControls')).not.toBeInTheDocument();
  });

  it('handles loading state properly', () => {
    const mockUseGetAllQuery = useGetAllQuery as jest.Mock;
    mockUseGetAllQuery.mockReturnValue({ isFetching: true, data: null });

    render(
      <Provider store={store}>
        <MainView />
      </Provider>
    );

    expect(dispatch).toHaveBeenCalledWith(setIsLoading(true));
  });

  it('handles error btn click', () => {
    const mockUseGetAllQuery = useGetAllQuery as jest.Mock;
    mockUseGetAllQuery.mockReturnValue({ isFetching: true, data: null });

    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <Provider store={store}>
        <MainView />
      </Provider>
    );

    const button = screen.getByRole('button', { name: 'Trigger an error' });

    expect(() => {
      fireEvent.click(button);
    }).toThrow('Test error');

    consoleErrorSpy.mockRestore();
  });
});
