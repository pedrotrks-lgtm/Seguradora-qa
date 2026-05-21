import { useState } from 'react'

function Policy() {

  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {

    e.preventDefault()

    if (loading) return

    setSuccess('')
    setError('')

    if (!name || !cpf) {
      setError('Preencha os campos obrigatórios')
      return
    }

    setLoading(true)

    try {

      const response = await fetch('http://localhost:3000/policy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          cpf
        })
      })

      const data = await response.json()

      if (!response.ok) {

        setSuccess('')
        setError(data.message || 'Erro ao emitir apólice')

        return
      }

      setError('')
      setSuccess(data.message)

      setName('')
      setCpf('')

    } catch (err) {

      setSuccess('')
      setError('Erro ao emitir apólice')

    } finally {

      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen bg-slate-900 text-white p-10">

      <h1 className="text-3xl font-bold mb-8">
        Emissão de Apólice
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl max-w-xl"
      >

        <input
          data-testid="input-cliente"
          type="text"
          placeholder="Nome Cliente"
          className="w-full p-3 rounded mb-4 text-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          data-testid="input-cpf"
          type="text"
          placeholder="CPF"
          className="w-full p-3 rounded mb-4 text-black"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />

        <select
          data-testid="select-seguro"
          className="w-full p-3 rounded mb-4 text-black"
        >
          <option>Seguro Auto</option>
          <option>Seguro Vida</option>
        </select>

        <button
          data-testid="btn-emitir"
          type="submit"
          disabled={loading}
          className="bg-green-600 p-3 rounded w-full"
        >
          {
            loading
              ? 'Emitindo...'
              : 'Emitir Apólice'
          }
        </button>

        {
          error && (
            <p className="text-red-400 mt-4">
              {error}
            </p>
          )
        }

        {
          success && (
            <p className="text-green-400 mt-4">
              {success}
            </p>
          )
        }

      </form>

    </div>
  )
}

export default Policy