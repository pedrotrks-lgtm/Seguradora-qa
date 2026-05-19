import { Link, useNavigate } from 'react-router-dom'

import { logout } from '../services/auth'

function Dashboard() {

  const navigate = useNavigate()

  function handleLogout() {

    logout()

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">

      <div className="flex justify-between mb-10">

        <h1 className="text-3xl font-bold">
          Dashboard Seguradora
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded"
        >
          Sair
        </button>

      </div>

      <div className="grid grid-cols-3 gap-6">

        <Link
          to="/policy"
          data-testid="emitir-apolice"
          className="bg-slate-800 p-6 rounded-xl"
        >
          Emitir Apólice
        </Link>

        <Link
          to="/clients"
          data-testid="consultar-cliente"
          className="bg-slate-800 p-6 rounded-xl"
        >
          Consultar Cliente
        </Link>

        <Link
          to="/reports"
          data-testid="relatorios"
          className="bg-slate-800 p-6 rounded-xl"
        >
          Relatórios
        </Link>

      </div>

    </div>
  )
}

export default Dashboard