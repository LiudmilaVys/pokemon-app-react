import { useLoaderData } from 'react-router-dom';
import PokemonCard from '../PokemonCard/PokemonCard';

const PokemonDetails = () => {
  const pokemon = useLoaderData(); // Data from loader

  return (
    <>
      <PokemonCard pokemon={pokemon}> </PokemonCard>
    </>
  );
};

export default PokemonDetails;
