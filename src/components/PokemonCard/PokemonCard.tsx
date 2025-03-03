import { Pokemon } from '../../utils/types';

type PokemonCardProps = { pokemon: Pokemon | undefined };

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  return pokemon ? (
    <div className="pokemon-card">
      {pokemon.avatarSrc && <img src={pokemon.avatarSrc}></img>}
      <div>Name: {pokemon.name}</div>
      {pokemon.height && <div>Height: {pokemon.height}</div>}
      {pokemon.weight && <div>Weight: {pokemon.weight}</div>}
    </div>
  ) : (
    <></>
  );
};

export default PokemonCard;
