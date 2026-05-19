import { createContext, useState } from 'react'
import { getSession } from '../services/auth'

export const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(
    getSession()?.user || null
  )

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}