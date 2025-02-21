import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { deselectAllPokemons } from '../../redux/pokemonReducer';
import DownloadControls from './DownloadControls';
import { EnhancedStore } from '@reduxjs/toolkit';

jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
jest.mock('papaparse', () => ({
  unparse: jest.fn(() => 'mocked-csv-content'),
}));

const mockStore = configureStore([]);

describe('DownloadControls Component', () => {
  let store: EnhancedStore;

  beforeEach(() => {
    store = mockStore({
      pokemon: { selectedPokemons: [{ name: 'Pikachu', type: 'Electric' }] },
    });

    store.dispatch = jest.fn();
  });

  it('renders with selected Pokemon count', () => {
    render(
      <Provider store={store}>
        <DownloadControls />
      </Provider>
    );

    expect(screen.getByText('1 pokemon(s) selected')).toBeInTheDocument();
  });

  it('dispatches deselectAllPokemons when "Unselect all" is clicked', () => {
    render(
      <Provider store={store}>
        <DownloadControls />
      </Provider>
    );

    const unselectButton = screen.getByText('Unselect all');
    fireEvent.click(unselectButton);

    expect(store.dispatch).toHaveBeenCalledWith(deselectAllPokemons());
  });

  it('calls saveAs with correct CSV data when "Download" is clicked', () => {
    render(
      <Provider store={store}>
        <DownloadControls />
      </Provider>
    );

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    expect(Papa.unparse).toHaveBeenCalledWith([
      { name: 'Pikachu', type: 'Electric' },
    ]);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), '1_pokemons.csv');
  });
});
