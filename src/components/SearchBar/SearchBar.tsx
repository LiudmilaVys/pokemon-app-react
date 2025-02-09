import { ChangeEvent } from 'react';
import { localStorageKey } from '../../utils/constants';
import useLocalStorage from '../../utils/useLocalStorage';
import './SearchBar.css';

type SearchBarProps = { onSearchSubmit: (value: string) => void };

const SearchBar = (props: SearchBarProps) => {
  const [searchValue, setSearchValue] = useLocalStorage(localStorageKey, '');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="ditto"
        className="search-bar__input"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <input
        type="button"
        value="Search"
        onClick={() => props.onSearchSubmit(searchValue)}
      />
    </div>
  );
};

export default SearchBar;
