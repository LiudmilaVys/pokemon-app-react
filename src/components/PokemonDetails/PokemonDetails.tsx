import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchByQuery } from '../../redux/pokemonApi';
import { setDetails } from '../../redux/pokemonReducer';
import { AppState } from '../../redux/store';
import { Pokemon } from '../../utils/types';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import PokemonCard from '../PokemonCard/PokemonCard';

const PokemonDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const pokemon = useSelector((state: AppState) => state.pokemon.details);

  const pokemonId = Number(id);
  const { data, isFetching } = useSearchByQuery(pokemonId, {
    skip: !pokemonId,
  });

  useEffect(() => {
    if (data) {
      dispatch(setDetails(data as Pokemon));
    }
  }, [data, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setDetails(undefined));
    };
  }, [pokemonId, dispatch]);

  return (
    <div className="pokemon-details fade-in">
      <h3>Details</h3>
      {isFetching ? (
        <Loader />
      ) : pokemon ? (
        <PokemonCard pokemon={pokemon as Pokemon} />
      ) : (
        <NotFound></NotFound>
      )}
      <button onClick={() => router.push('/')}>Close</button>
    </div>
  );
};

export default PokemonDetails;
