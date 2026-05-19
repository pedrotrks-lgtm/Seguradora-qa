import { useEffect, useState } from 'react'

function Clients() {

  const [search, setSearch] = useState('')
  const [clients, setClients] = useState([])

  useEffect(() => {

    async function loadClients() {

      try {

        const response = await fetch('http://localhost:3000/clients')

        const data = await response.json()

        setClients(data)

      } catch (error) {

        console.error('Erro ao buscar clientes', error)
      }
    }

    loadClients()

  }, [])

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  )

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-3xl font-bold mb-8">
        Consultar Cliente
      </h1>

      <div className="bg-slate-800 p-8 rounded-xl max-w-4xl">

        <input
          data-testid="input-busca-cliente"
          type="text"
          placeholder="Buscar cliente"
          className="w-full p-3 rounded text-black mb-6"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="space-y-4">

          {
            filteredClients.map((client) => (

              <div
                key={client._id}
                className="bg-slate-700 p-4 rounded"
              >

                <p>
                  <strong>Cliente:</strong> {client.name}
                </p>

                <p>
                  <strong>CPF:</strong> {client.cpf}
                </p>

                <p>
                  <strong>Seguro:</strong> {client.policy}
                </p>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  )
}

export default Clients