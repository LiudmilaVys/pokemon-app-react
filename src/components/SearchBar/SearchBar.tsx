import './SearchBar.css';

import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../redux/pokemonReducer';
import { AppState } from '../../redux/store';

const SearchBar = () => {
  const searchQuery = useSelector((state: AppState) => state.pokemon.search);
  const dispatch = useDispatch();
  const [input, setInput] = useState(searchQuery);

  useEffect(() => {
    setInput(searchQuery);
  }, [searchQuery]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(setSearch((event.target as HTMLInputElement).value));
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="ditto"
        className="search-bar__input"
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        onKeyDown={handleKeyDown}
      />
      <button onClick={() => dispatch(setSearch(input))}>Search</button>
    </div>
  );
};

export default SearchBar;
