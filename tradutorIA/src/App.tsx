import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Tradutor from './pages/tradutor'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tradutor></Tradutor>} />
      </Routes>
    </Router>
  )
}

export default App