import { Navigate, Route, BrowserRouter as Router, Routes, } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import View from './pages/More.jsx';
import Update from './pages/Update.jsx';

import Signup from './pages/authentication/Signup.jsx';
import Signin from './pages/authentication/Signin.jsx';
import MainPages from './pages/MainPages.jsx';
import Account from './pages/Account.jsx';

const App = () => {

  const userToken = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Authentication pages */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={!userToken ? <Signin /> : <Navigate replace to={'/'} />} />

        {/* Other pages  */}
        <Route path='/' element={userToken ? <MainPages /> : <Navigate replace to={'/signin'} />}>
          <Route path='' element={<Home />} />
          <Route path='/add' element={<Create />} />
          <Route path='/update/:contactId' element={<Update />} />
          <Route path='/more/:contactId' element={<View />} />
          <Route path='/account' element={<Account />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App