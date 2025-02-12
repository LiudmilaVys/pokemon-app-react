import { useNavigate, useParams } from 'react-router-dom';
import { useSearchByQuery } from '../../redux/pokemonApi';
import Loader from '../../utils/Loader/Loader';
import PokemonCard from '../PokemonCard/PokemonCard';
import './PokemonDetails.css';

const PokemonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: pokemon, isLoading } = useSearchByQuery(id);

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
