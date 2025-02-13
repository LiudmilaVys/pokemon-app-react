import { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { next, prev, set } from '../../redux/paginationReducer';
import { AppState } from '../../redux/store';
import { ITEMS_PER_PAGE } from '../../utils/constants';
import './PageControls.css';

const PageControls = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = useSelector(
    (state: AppState) => state.pagination.currentPage
  );
  const pokemonCount = useSelector(
    (state: AppState) => state.pokemon.pokemons.length
  );

  useEffect(() => {
    if (currentPage !== Number(searchParams.get('page'))) {
      setSearchParams({ page: currentPage.toString() });
    }
  }, [currentPage, searchParams, setSearchParams]);

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
