import { ChangeEvent, KeyboardEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { next, prev, set } from '../../redux/paginationReducer';
import { AppState } from '../../redux/store';
import { ITEMS_PER_PAGE } from '../../utils/constants';

const PageControls = () => {
  const currentPage = useSelector(
    (state: AppState) => state.pagination.currentPage
  );
  const pokemonCount = useSelector(
    (state: AppState) => state.pokemon.pokemons.length
  );
  const dispatch = useDispatch();

  return (
    <div className="pokemon-list__controls">
      <button onClick={() => dispatch(prev())} disabled={currentPage === 0}>
        Prev
      </button>
      <input
        type="text"
        placeholder="page number"
        value={currentPage}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          dispatch(set(Number(event.target.value)))
        }
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === 'Enter') {
            //  dispatch(triggerSearch());
          }
        }}
      ></input>
      <button
        onClick={() => dispatch(next())}
        disabled={pokemonCount < ITEMS_PER_PAGE}
      >
        Next
      </button>
    </div>
  );
};

export default PageControls;
