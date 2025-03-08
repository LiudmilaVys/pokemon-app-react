import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import App from '../App';
import useLocalStorage from '../utils/useLocalStorage';
import store from './store';

const server = setupServer(
  http.get('https://pokeapi.co/api/v2/pokemon', () => {
    return HttpResponse.json({
      results: [
        {
          id: '1',
          name: 'pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/25/',
        },
        {
          id: '2',
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ],
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/ditto', () => {
    return HttpResponse.json({
      id: '25',
      name: 'ditto',
      sprites: { front_default: 'ditto.png' },
      height: 4,
      weight: 6,
    });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/unknown', () => {
    return new HttpResponse(null, {
      status: 404,
      statusText: '404',
    });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('../utils/useLocalStorage', () => ({
  __esModule: true,
  default: jest.fn(() => ['', jest.fn()]),
}));
jest.mock('../components/NotFound/NotFound', () => {
  const NotFound = () => <div>NotFound</div>;
  NotFound.displayName = 'NotFound';
  return NotFound;
});
jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

describe('pokemonApi', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      query: {
        page: '1',
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('fetches all Pokemon successfully', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/pikachu/)).toBeInTheDocument();
      expect(screen.getByText(/bulbasaur/)).toBeInTheDocument();
    });
  });

  it('fetches Pokemon by search successfully', async () => {
    (useLocalStorage as jest.Mock).mockReturnValue(['ditto', jest.fn()]);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText(/ditto/)).toBeInTheDocument();
    });
  });

  it('handles Pokemon not found', async () => {
    (useLocalStorage as jest.Mock).mockReturnValue(['unknown', jest.fn()]);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await waitFor(() => {
      expect(getByText(/NotFound/)).toBeInTheDocument();
    });
  });
});
