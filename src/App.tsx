import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainView from './components/MainView/MainView';
import { setSearch } from './redux/pokemonReducer';
import { AppState } from './redux/store';
import { SEARCH_VALUE_KEY } from './utils/constants';
import useLocalStorage from './utils/useLocalStorage';

const App = ({ children }: { children?: React.ReactNode }) => {
  const [savedSearchQuery, setSavedSearchQuery] = useLocalStorage(
    SEARCH_VALUE_KEY,
    ''
  );
  const searchQuery = useSelector((state: AppState) => state.pokemon.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearch(savedSearchQuery));
  }, [savedSearchQuery, dispatch]);
  useEffect(() => {
    setSavedSearchQuery(searchQuery);
  }, [searchQuery, setSavedSearchQuery]);

  return <MainView>{children}</MainView>;
};

export default App;
