'use client';

import { Provider } from 'react-redux';
import App from '../App';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';
import store from '../redux/store';
import ThemeContext from '../theme/ThemeContext';
import ThemeProvider from '../theme/ThemeProvider';

export default function IndexPage() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ThemeContext.Consumer>
          {(context) => {
            const { theme } = context;

            return (
              <ErrorBoundary fallback={<p>Oops.. Something went wrong</p>}>
                <div className={theme} id="body">
                  <App />
                </div>
              </ErrorBoundary>
            );
          }}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </Provider>
  );
}
