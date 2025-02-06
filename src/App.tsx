import { useState } from 'react';
import './App.css';
import ErrorButton from './components/ErrorButton/ErrorButton';
import Results from './components/Results/Results';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorBoundary from './utils/ErrorBoundary/ErrorBoundary';

const App = () => {
  const [search, setSearch] = useState('');
  const [isError, setIsError] = useState(false);

  const submitSearch = async (searchValue: string) => {
    setSearch(searchValue || '');
  };

  const onErrorHandler = (): void => {
    setIsError(!isError);
  };

  return (
    <>
      <SearchBar onSearchSubmit={submitSearch}></SearchBar>
      <ErrorBoundary fallback={<p>Oops.. Something went wrong</p>}>
        <Results search={search} generateAnError={isError}></Results>
      </ErrorBoundary>
      {isError ? <></> : <ErrorButton onError={onErrorHandler}></ErrorButton>}
    </>
  );
};

export default App;
