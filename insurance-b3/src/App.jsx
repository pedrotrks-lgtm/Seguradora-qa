import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Policy from './pages/Policy'
import Clients from './pages/Clients'
import Reports from './pages/Reports'

import PrivateRoute from './routes/PrivateRoute'

import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>

      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/policy"
            element={
              <PrivateRoute>
                <Policy />
              </PrivateRoute>
            }
          />

          <Route
            path="/clients"
            element={
              <PrivateRoute>
                <Clients />
              </PrivateRoute>
            }
          />

          <Route
            path="/reports"
            element={
              <PrivateRoute>
                <Reports />
              </PrivateRoute>
            }
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  )
}

export default App