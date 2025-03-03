import { Provider } from 'react-redux';
import '../styles/App.css';
import '../styles/DownloadControls.css';
import '../styles/ErrorButton.css';
import '../styles/index.css';
import '../styles/Loader.css';
import '../styles/mixins.css';
import '../styles/PageControls.css';
import '../styles/PokemonCard.css';
import '../styles/PokemonDetails.css';
import '../styles/SearchBar.css';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import { AppProps } from 'next/app';
import ThemeContext from 'theme/ThemeContext';
import ThemeProvider from 'theme/ThemeProvider';
import store from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(context) => {
            const { theme } = context;

            return (
              <ErrorBoundary fallback={<p>Oops.. Something went wrong</p>}>
                <div className={theme} id="body">
                  <Component {...pageProps} />
                </div>
              </ErrorBoundary>
            );
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
