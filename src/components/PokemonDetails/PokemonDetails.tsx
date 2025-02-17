import { useEffect } from 'react';
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
  const { data, isFetching } = useSearchByQuery(id, { skip: !id });

  useEffect(() => {
    if (data) {
      dispatch(setDetails(data as Pokemon));
    }
  }, [data, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(setDetails(undefined));
    };
  }, [id, dispatch]);

  return (
    <div className="pokemon-details fade-in">
      <h3>Details</h3>
      {isFetching ? (
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
