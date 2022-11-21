// Styles
import './App.css'

// Context
import { APIProvider } from './context/APIContext'

// Component
import Tool from './component/Tool'

function App() {
  return (
    <APIProvider>
      <Tool />
    </APIProvider>
  )
}

export default App
