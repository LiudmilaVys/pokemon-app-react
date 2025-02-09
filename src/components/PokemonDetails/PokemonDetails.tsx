import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useNavigation } from 'react-router-dom';
import Loader from '../../utils/Loader/Loader';
import { Pokemon } from '../../utils/types';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonDetails.css';

const PokemonDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pokemon = useLoaderData<Pokemon | null>();
  const navigation = useNavigation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
  }, [pokemon]);

  useEffect(() => {
    if (navigation.state === 'loading') {
      setIsLoading(true);
    }
  }, [navigation.state]);

  if (isLoading) return <Loader />;

  if (!pokemon) return <p>No Pokémon found.</p>;

  return (
    <div className="pokemon-details">
      <h3>Details</h3>
      <PokemonCard pokemon={pokemon} />
      <button onClick={() => navigate('/')}>Close</button>
    </div>
  );
};

export default PokemonDetails;
