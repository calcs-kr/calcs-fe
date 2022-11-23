// Styles
import './App.css'

// Context
import { APIProvider } from './context/APIContext'

// Component
import Tool from './component/Tool'
import { SearchProvider } from './context/SearchContext'

function App() {
  return (
    <APIProvider>
      <SearchProvider>
        <Tool />
      </SearchProvider>
    </APIProvider>
  )
}

export default App
