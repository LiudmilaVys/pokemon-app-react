import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const rootEl = document.getElementById('root');

if (rootEl) {
  createRoot(rootEl).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}
