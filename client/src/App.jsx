import { Route, BrowserRouter as Router, Routes,  } from 'react-router-dom'
import Home from './pages/Home'
import Create from './pages/Create'
import View from './pages/More.jsx'
import Navigation from './components/Navigation'
import Update from './pages/Update.jsx'

const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<Create />} />
        <Route path='/update/:contactId' element={<Update />} />
        <Route path='/more/:contactId' element={<View />} />
      </Routes>
    </Router>
  )
}

export default App