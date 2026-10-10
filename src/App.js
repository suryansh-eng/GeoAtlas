import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* keep your existing signup route here */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;