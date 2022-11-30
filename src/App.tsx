// Styles
import './App.css'

// Context
import { APIProvider } from './context/APIContext'

// Component
import Tool from './component/Tool'
import { SearchProvider } from './context/SearchContext'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <APIProvider>
        <SearchProvider>
          <Routes>
            <Route path='/service' element={<Tool />} />
            <Route path='/' element={<Tool />} />
          </Routes>
        </SearchProvider>
      </APIProvider>
    </Router>
  )
}

export default App
