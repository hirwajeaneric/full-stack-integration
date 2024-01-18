import { Route, BrowserRouter as Router, Routes,  } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import Update from './pages/Update.Jsx'
import Navigation from './components/Navigation'

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Create />} />
        <Route path='/update/:id' element={<Update />} />
      </Routes>
    </Router>
  )
}

export default App