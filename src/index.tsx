import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



import { APIProvider } from './context/APIContext';
import { SearchProvider } from './context/SearchContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <APIProvider>
      <SearchProvider>
        <App />
      </SearchProvider>
    </APIProvider>
  </React.StrictMode>
);

reportWebVitals();
