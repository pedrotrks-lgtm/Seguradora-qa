import { Navigate } from 'react-router-dom'
import { getSession } from '../services/auth'

function PrivateRoute({ children }) {

  const session = getSession()

  if (!session) {

    return <Navigate to="/" />
  }

  return children
}

export default PrivateRoute