import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useSearchByQuery } from '../../redux/pokemonApi';
import { setDetails } from '../../redux/pokemonReducer';
import { AppState } from '../../redux/store';
import { Pokemon } from '../../utils/types';
import Loader from '../Loader/Loader';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonDetails.css';

const PokemonDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const pokemon = useSelector((state: AppState) => state.pokemon.details);

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { data } = useSearchByQuery(id, { skip: !id });

  useEffect(() => {
    if (data) {
      dispatch(setDetails(data));
      setIsLoading(false);
    }
  }, [data, dispatch]);

  useEffect(() => {
    setIsLoading(true);
  }, [id]);

  useEffect(() => {
    return () => {
      dispatch(setDetails(undefined));
    };
  }, [id, dispatch]);

  return (
    <div className="pokemon-details">
      <h3>Details</h3>
      {isLoading ? (
        <Loader />
      ) : pokemon ? (
        <PokemonCard pokemon={pokemon as Pokemon} />
      ) : (
        <p>No Pokémon found.</p>
      )}
      <button onClick={() => navigate('/')}>Close</button>
    </div>
  );
};

export default PokemonDetails;
