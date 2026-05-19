import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { loginRequest } from '../services/fakeApi'
import { saveSession } from '../services/auth'

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin(e) {

    e.preventDefault()

    setError('')
    setLoading(true)

    try {

      const response = await loginRequest(
        email,
        password
      )

      saveSession(response)

      navigate('/dashboard')

    } catch(err) {

      setError(err.message)

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-900">

      <form
        onSubmit={handleLogin}
        className="bg-slate-800 p-8 rounded-xl w-96"
      >

        <h1 className="text-white text-2xl mb-6 font-bold">
          Seguradora B3
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          {
            loading
              ? 'Entrando...'
              : 'Entrar'
          }
        </button>

        {
          error && (
            <p className="text-red-400 mt-4">
              {error}
            </p>
          )
        }

      </form>

    </div>
  )
}

export default Login