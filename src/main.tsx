import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerServiceWorker } from './utils/serviceWorker';

// Web Vitals reporting
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA support in production
if (import.meta.env.PROD) {
  registerServiceWorker();
}

// Report Web Vitals in development
if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  onCLS((metric) => console.info('[Web Vitals]', metric));
  // eslint-disable-next-line no-console
  onINP((metric) => console.info('[Web Vitals]', metric));
  // eslint-disable-next-line no-console
  onFCP((metric) => console.info('[Web Vitals]', metric));
  // eslint-disable-next-line no-console
  onLCP((metric) => console.info('[Web Vitals]', metric));
  // eslint-disable-next-line no-console
  onTTFB((metric) => console.info('[Web Vitals]', metric));
}
