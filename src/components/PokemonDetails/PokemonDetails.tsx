import { useEffect, useState } from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loader from '../../utils/Loader/Loader';
import { Pokemon } from '../../utils/types';
import PokemonCard from '../PokemonCard/PokemonCard';

const PokemonDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pokemon = useLoaderData<Pokemon>();

  useEffect(() => {
    setIsLoading(false);
  }, [pokemon]);

  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') {
      setIsLoading(true);
    }
  }, [navigation.state]);

  return isLoading ? (
    <Loader></Loader>
  ) : (
    <PokemonCard pokemon={{ ...pokemon }}> </PokemonCard>
  );
};

export default PokemonDetails;
