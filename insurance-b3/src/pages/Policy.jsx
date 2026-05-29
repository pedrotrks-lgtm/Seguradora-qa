import { useState } from 'react'

function Policy() {
  const [insurerCode, setInsurerCode] = useState('')
  const [policyNumber, setPolicyNumber] = useState('')
  const [productCode, setProductCode] = useState('')
  const [insuredDocument, setInsuredDocument] = useState('')
  const [premiumAmount, setPremiumAmount] = useState('')
  const [coverageAmount, setCoverageAmount] = useState('')
  const [effectiveStartDate, setEffectiveStartDate] = useState('')
  const [effectiveEndDate, setEffectiveEndDate] = useState('')

  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (loading) return

    setSuccess('')
    setError('')

    if (
      !insurerCode ||
      !policyNumber ||
      !productCode ||
      !insuredDocument ||
      !premiumAmount ||
      !coverageAmount ||
      !effectiveStartDate ||
      !effectiveEndDate
    ) {
      setError('Preencha todos os campos obrigatórios do registro SRO')
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
          insurerCode,
          policyNumber,
          productCode,
          insuredDocument,
          premiumAmount: Number(premiumAmount),
          coverageAmount: Number(coverageAmount),
          effectiveStartDate,
          effectiveEndDate
        })
      })

      const data = await response.json()

      if (!response.ok) {
        setSuccess('')
        setError(data.message || 'Erro ao registrar apólice')
        return
      }

      setError('')
      setSuccess(data.message)

      setInsurerCode('')
      setPolicyNumber('')
      setProductCode('')
      setInsuredDocument('')
      setPremiumAmount('')
      setCoverageAmount('')
      setEffectiveStartDate('')
      setEffectiveEndDate('')
    } catch (err) {
      setSuccess('')
      setError('Erro ao registrar apólice')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        Registro de Apólice SRO/B3
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-8 rounded-xl max-w-xl"
      >
        <input
          data-testid="input-insurer-code"
          type="text"
          placeholder="Código da Seguradora"
          className="w-full p-3 rounded mb-4 text-black"
          value={insurerCode}
          onChange={(e) => setInsurerCode(e.target.value)}
        />

        <input
          data-testid="input-policy-number"
          type="text"
          placeholder="Número da Apólice"
          className="w-full p-3 rounded mb-4 text-black"
          value={policyNumber}
          onChange={(e) => setPolicyNumber(e.target.value)}
        />

        <input
          data-testid="input-product-code"
          type="text"
          placeholder="Código do Produto"
          className="w-full p-3 rounded mb-4 text-black"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
        />

        <input
          data-testid="input-insured-document"
          type="text"
          placeholder="CPF/CNPJ do Segurado"
          className="w-full p-3 rounded mb-4 text-black"
          value={insuredDocument}
          onChange={(e) => setInsuredDocument(e.target.value)}
        />

        <input
          data-testid="input-premium-amount"
          type="number"
          step="0.01"
          placeholder="Valor do Prêmio"
          className="w-full p-3 rounded mb-4 text-black"
          value={premiumAmount}
          onChange={(e) => setPremiumAmount(e.target.value)}
        />

        <input
          data-testid="input-coverage-amount"
          type="number"
          step="0.01"
          placeholder="Valor da Cobertura"
          className="w-full p-3 rounded mb-4 text-black"
          value={coverageAmount}
          onChange={(e) => setCoverageAmount(e.target.value)}
        />

        <input
          data-testid="input-effective-start-date"
          type="date"
          className="w-full p-3 rounded mb-4 text-black"
          value={effectiveStartDate}
          onChange={(e) => setEffectiveStartDate(e.target.value)}
        />

        <input
          data-testid="input-effective-end-date"
          type="date"
          className="w-full p-3 rounded mb-4 text-black"
          value={effectiveEndDate}
          onChange={(e) => setEffectiveEndDate(e.target.value)}
        />

        <button
          data-testid="btn-registrar"
          type="submit"
          disabled={loading}
          className="bg-green-600 p-3 rounded w-full"
        >
          {loading ? 'Registrando...' : 'Registrar Apólice'}
        </button>

        {error && (
          <p className="text-red-400 mt-4">
            {error}
          </p>
        )}

        {success && (
          <p className="text-green-400 mt-4">
            {success}
          </p>
        )}
      </form>
    </div>
  )
}

export default Policy