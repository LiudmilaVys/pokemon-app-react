import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const rootEl = document.getElementById('root');

if (rootEl) {
  createRoot(rootEl).render(<App />);
}
