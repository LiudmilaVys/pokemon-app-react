import { useState } from 'react';
import './App.css';
import ErrorButton from './components/ErrorButton/ErrorButton';
import Results from './components/Results/Results';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorBoundary from './utils/ErrorBoundary/ErrorBoundary';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <Router>
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
      </Router>
      {isError ? <></> : <ErrorButton onError={onErrorHandler}></ErrorButton>}
    </>
  );
};

export default App;
