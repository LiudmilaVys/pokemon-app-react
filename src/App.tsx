import { Component } from 'react';
import './App.css';
import ErrorButton from './components/ErrorButton/ErrorButton';
import Results from './components/Results/Results';
import SearchBar from './components/SearchBar/SearchBar';
import { ErrorBoundary } from './utils/ErrorBoundary/ErrorBoundary';

type AppState = { search: string | undefined; isError: boolean };

export default class App extends Component<unknown, AppState> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      search: undefined,
      isError: false,
    };
  }

  submitSearch = async (searchValue: string) => {
    this.setState({ search: searchValue || '' });
  };

  onErrorHandler = () => {
    this.setState({ isError: !this.state.isError });
  };

  render() {
    return (
      <>
        <SearchBar onSearchSubmit={this.submitSearch}></SearchBar>
        <ErrorBoundary fallback={<p>Oops.. Something went wrong</p>}>
          <Results
            search={this.state.search}
            generateAnError={this.state.isError}
          ></Results>
        </ErrorBoundary>
        {this.state.isError ? (
          <></>
        ) : (
          <ErrorButton onError={this.onErrorHandler}></ErrorButton>
        )}
      </>
    );
  }
}
