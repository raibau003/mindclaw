import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Dashboard from './pages/Dashboard'
import Agents from './pages/Agents'
import Marketplace from './pages/Marketplace'
import Integrations from './pages/Integrations'
import Governance from './pages/Governance'
import Settings from './pages/Settings'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
