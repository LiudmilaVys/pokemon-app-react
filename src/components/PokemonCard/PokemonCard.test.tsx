import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

describe('PokemonCard', () => {
  it('renders the relevant card data', () => {
    render(
      <PokemonCard
        pokemon={{
          id: '13',
          name: 'Pikachu',
          avatarSrc:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
          height: 4,
          weight: 6,
        }}
      />
    );
    expect(screen.getByText('Name: Pikachu')).toBeInTheDocument();
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      'src',
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
    );
    expect(screen.getByText('Height: 4')).toBeInTheDocument();
    expect(screen.getByText('Weight: 6')).toBeInTheDocument();
  });

  it('renders the relevant card data when data is presented parcially', () => {
    render(<PokemonCard pokemon={{ name: 'Pikachu', id: '1' }} />);
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('Name: Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Height:')).toBeNull();
    expect(screen.queryByText('Weight:')).toBeNull();
  });
});
