import { reports } from '../data/mockData'

function Reports() {

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-3xl font-bold mb-8">
        Relatórios
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-xl mb-2">
            Apólices Emitidas
          </h2>

          <p className="text-4xl font-bold">
            {reports.policies}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-xl mb-2">
            Clientes Ativos
          </h2>

          <p className="text-4xl font-bold">
            {reports.activeClients}
          </p>

        </div>

        <div className="bg-slate-800 p-6 rounded-xl">

          <h2 className="text-xl mb-2">
            Sinistros
          </h2>

          <p className="text-4xl font-bold">
            {reports.claims}
          </p>

        </div>

      </div>

    </div>
  )
}

export default Reports