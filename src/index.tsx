import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';



import { APIProvider } from './context/APIContext';
import { SearchProvider } from './context/SearchContext';
import { HeaderProvider } from './context/HeaderContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  //<React.StrictMode>
    <UserProvider>
      <APIProvider>
        <SearchProvider>
          <HeaderProvider>
            <App />
          </HeaderProvider>
        </SearchProvider>
      </APIProvider>
    </UserProvider>
  //</React.StrictMode>
);

reportWebVitals();
