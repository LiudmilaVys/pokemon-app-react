import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ErrorButton from './components/ErrorButton/ErrorButton';
import Results from './components/Results/Results';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorBoundary from './utils/ErrorBoundary/ErrorBoundary';

const NotFound = () => <h2>404 - Not Found</h2>;

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
      <BrowserRouter>
        <SearchBar onSearchSubmit={submitSearch}></SearchBar>
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary fallback={<p>Oops.. Something went wrong</p>}>
                <Results search={search} generateAnError={isError}></Results>
              </ErrorBoundary>
            }
          />
          <Route path="/pokemon/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      {isError ? <></> : <ErrorButton onError={onErrorHandler}></ErrorButton>}
    </>
  );
};

export default App;
