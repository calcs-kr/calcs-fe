import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './routes/Dashboard'
import Login from './routes/Login'

import { APIProvider } from './content/APIProvider';
import { ScheduleProvider } from './content/ScheduleProvider';
import { TrafficProvider } from './content/TrafficProvider';
import { ResourceProvider } from './content/ResourceProvider';
import Service from './routes/Service';

function App() {
    return (
        <Router>
            <APIProvider>
                <ScheduleProvider>
                <TrafficProvider>
                <ResourceProvider>
                    <Routes>
                        <Route path='/schedule' element={<Dashboard />} />
                        <Route path='/status' element={<Dashboard />} />
                        <Route path='/service' element={<Service />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/' element={<Dashboard />} />
                    </Routes>
                </ResourceProvider>
                </TrafficProvider>
                </ScheduleProvider>
            </APIProvider>
        </Router>
    )
}

export default App;