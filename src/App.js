import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './views/Login'
import SignUp from './views/SignUp'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
)

export default App