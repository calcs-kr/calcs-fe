// Styles
import './App.css'

// Context
import { APIProvider } from './context/APIContext'

// Component
import Service from './route/Service';
import { SearchProvider } from './context/SearchContext'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// redux
// 설정 파일
import axios from 'axios';
import config from './config'

import { useAPIState, useAPIDispatch } from './context/APIContext';
import { useEffect } from 'react';



function App() {
  return (
    <Router>
      <APIProvider>
        <SearchProvider>
          <Routes>
            <Route path='/service' element={<Service />} />
          </Routes>
        </SearchProvider>
      </APIProvider>
    </Router>
  )
}

export default App
