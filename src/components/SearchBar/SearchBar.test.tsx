import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SearchBar from './SearchBar';
import { setSearch } from '../../redux/pokemonReducer';
import { EnhancedStore } from '@reduxjs/toolkit';

describe('SearchBar', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    const mockStore = configureStore([]);
    store = mockStore({
      pokemon: { search: 'pikachu' },
    });
    store.dispatch = jest.fn();
  });

  it('should render with initial state value', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    expect(getByPlaceholderText('ditto')).toHaveValue('pikachu');
  });

  it('should update input value on change', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = getByPlaceholderText('ditto');
    fireEvent.change(input, { target: { value: 'charizard' } });
    expect(input).toHaveValue('charizard');
  });

  it('should dispatch setSearch action on Enter key press', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = getByPlaceholderText('ditto');
    fireEvent.change(input, { target: { value: 'bulbasaur' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(store.dispatch).toHaveBeenCalledWith(setSearch('bulbasaur'));
  });

  it('should dispatch setSearch action on button click', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = getByPlaceholderText('ditto');
    fireEvent.change(input, { target: { value: 'eevee' } });
    fireEvent.click(getByText('Search'));

    expect(store.dispatch).toHaveBeenCalledWith(setSearch('eevee'));
  });
});
