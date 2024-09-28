import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedLayout from './components/layout/protected-layout'
import { Account } from './pages/account'
import Admin from './pages/admin'
import { Login } from './pages/login'
import { Register } from './pages/register'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/sign-in' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<ProtectedLayout />}>
          <Route index element={<Account />} />
          <Route path='admin' element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  )
}
