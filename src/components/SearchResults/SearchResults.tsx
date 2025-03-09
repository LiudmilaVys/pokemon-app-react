import Link from 'next/link';
import { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deselectPokemon, selectPokemon } from '../../redux/pokemonReducer';
import { AppState } from '../../redux/store';
import { Pokemon } from '../../utils/types';
import Loader from '../Loader/Loader';
import NotFound from '../NotFound/NotFound';
import PageControls from '../PageControls/PageControls';

const SearchResults = () => {
  const isLoading = useSelector((state: AppState) => state.pokemon.isLoading);
  const notFound = useSelector((state: AppState) => state.pokemon.notFound);
  const pokemons = useSelector((state: AppState) => state.pokemon.pokemons);
  const selectedPokemons = useSelector(
    (state: AppState) => state.pokemon.selectedPokemons
  );
  const searchQuery = useSelector((state: AppState) => state.pokemon.search);

  const dispatch = useDispatch();
  const toggleCheckbox = (pokemon: Pokemon) => {
    if (isChecked(pokemon)) {
      dispatch(deselectPokemon(pokemon.id));
    } else {
      dispatch(selectPokemon(pokemon));
    }
  };

  const isChecked = (pokemon: Pokemon) => {
    return !!selectedPokemons.find((selected) => selected.id === pokemon.id);
  };

  const renderPokemons = () => {
    if (notFound) {
      return <NotFound></NotFound>;
    }

    return (
      <>
        <ul>
          {pokemons?.map((pokemon: Pokemon) => {
            return (
              <li key={pokemon.id}>
                <input
                  type="checkbox"
                  checked={isChecked(pokemon)}
                  onChange={() => toggleCheckbox(pokemon)}
                ></input>
                <Link href={`/details/${pokemon.id}`}> {pokemon.name} </Link>
              </li>
            );
          })}
        </ul>
        {!searchQuery && (
          <Suspense fallback={<Loader></Loader>}>
            <PageControls></PageControls>
          </Suspense>
        )}
      </>
    );
  };

  return <div>{isLoading ? <Loader></Loader> : renderPokemons()}</div>;
};

export default SearchResults;
