import './PageControls.css';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect } from 'react';
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

  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const pathname = usePathname();
  useEffect(() => {
    if (pathname == '/' && currentPage !== Number(page)) {
      const params = new URLSearchParams(searchParams);

      params.set('page', currentPage.toString());
      router.push(`/?${params.toString()}`);
    }
  }, [currentPage, page, router, searchParams, pathname]);

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
