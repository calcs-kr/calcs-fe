// Styles
import './App.css'

// Context
import { APIProvider } from './context/APIContext'

// Component
import Service from './route/Service';
import { SearchProvider } from './context/SearchContext'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
