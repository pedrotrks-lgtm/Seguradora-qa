const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger/swagger')
const jwt = require('jsonwebtoken')
const authMiddleware = require('./middleware/auth')

dotenv.config()

const connectDB = require('./config/db')
const User = require('./models/User')
const Policy = require('./models/Policy')
const Client = require('./models/Client')

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: qa@b3.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Usuário ou senha inválidos
 */
// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const users = [
    { email: 'qa@b3.com', password: '123456', name: 'QA B3' },
    { email: 'olivia@b3.com', password: 'abc1234', name: 'Olivia QA' },
    { email: 'karol@b3.com', password: 'abc12345', name: 'Karol QA' }
  ]

  let user = users.find(
    item => item.email === email && item.password === password
  )

  if (!user) {
    const mongoUser = await User.findOne({ email, password })

    if (mongoUser) {
      user = {
        email: mongoUser.email,
        name: mongoUser.name || mongoUser.email
        
      }
    }
  }

  if (!user) {
    return res.status(401).json({
      error: 'INVALID_CREDENTIALS',
      message: 'Usuário ou senha inválidos'
    })
  }

  const token = jwt.sign(
  {
    email: user.email
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '1h'
  }
)
  return res.status(200).json({
    token,
    user: {
      name: user.name,
      email: user.email
    }
  })
})

/**
 * @swagger
 * /policy:
 *   post:
 *     summary: Emitir apólice
 *     tags:
 *       - Policy
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cpf
 *             properties:
 *               name:
 *                 type: string
 *                 example: Pedro QA
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *     responses:
 *       201:
 *         description: Apólice emitida com sucesso
 *       400:
 *         description: CPF inválido ou campos obrigatórios
 *       409:
 *         description: CPF já cadastrado
 */


/**
 * @swagger
 * /policy:
 *   post:
 *     summary: Registrar apólice modelo SRO/B3
 *     tags:
 *       - Policy
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - insurerCode
 *               - policyNumber
 *               - productCode
 *               - insuredDocument
 *               - premiumAmount
 *               - coverageAmount
 *               - effectiveStartDate
 *               - effectiveEndDate
 *             properties:
 *               insurerCode:
 *                 type: string
 *                 example: SEG002
 *               policyNumber:
 *                 type: string
 *                 example: APO-1001
 *               productCode:
 *                 type: string
 *                 example: AUTO
 *               insuredDocument:
 *                 type: string
 *                 example: "12345678901"
 *               premiumAmount:
 *                 type: number
 *                 example: 850.9
 *               coverageAmount:
 *                 type: number
 *                 example: 50000
 *               effectiveStartDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-01"
 *               effectiveEndDate:
 *                 type: string
 *                 format: date
 *                 example: "2027-06-01"
 *     responses:
 *       201:
 *         description: Apólice registrada com sucesso
 *       400:
 *         description: Erro de validação dos dados
 *       409:
 *         description: Número da apólice já registrado
 */


// POLICY - REGISTRO DE APÓLICE MODELO SRO/B3
app.post('/policy', async (req, res) => {
  const {
    insurerCode,
    policyNumber,
    productCode,
    insuredDocument,
    premiumAmount,
    coverageAmount,
    effectiveStartDate,
    effectiveEndDate
  } = req.body

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
    return res.status(400).json({
      error: 'REQUIRED_FIELDS',
      message: 'Preencha todos os campos obrigatórios do registro SRO'
    })
  }

  const cleanDocument = insuredDocument.replace(/\D/g, '')

  if (cleanDocument.length !== 11 && cleanDocument.length !== 14) {
    return res.status(400).json({
      error: 'INVALID_DOCUMENT',
      message: 'CPF ou CNPJ inválido'
    })
  }

  if (premiumAmount <= 0) {
    return res.status(400).json({
      error: 'INVALID_PREMIUM_AMOUNT',
      message: 'Valor do prêmio deve ser maior que zero'
    })
  }

  if (coverageAmount <= 0) {
    return res.status(400).json({
      error: 'INVALID_COVERAGE_AMOUNT',
      message: 'Valor da cobertura deve ser maior que zero'
    })
  }

  if (new Date(effectiveStartDate) >= new Date(effectiveEndDate)) {
    return res.status(400).json({
      error: 'INVALID_EFFECTIVE_DATE',
      message: 'Data inicial deve ser menor que data final'
    })
  }

  const existingPolicy = await Policy.findOne({
    policyNumber
  })

  if (existingPolicy) {
    return res.status(409).json({
      error: 'DUPLICATED_POLICY',
      message: 'Número da apólice já registrado'
    })
  }

  const registrationId = `SRO-B3-${new Date().getFullYear()}-${Date.now()}`

  const policy = await Policy.create({
    registrationId,
    insurerCode,
    policyNumber,
    productCode,
    insuredDocument: cleanDocument,
    premiumAmount,
    coverageAmount,
    effectiveStartDate,
    effectiveEndDate,
    status: 'REGISTERED',
    source: 'B3_SRO_FAKE'
  })

  return res.status(201).json({
    policyId: policy._id,
    registrationId: policy.registrationId,
    status: policy.status,
    message: 'Apólice registrada com sucesso no ambiente SRO/B3'
  })
})

/**
 * @swagger
 * /client:
 *   post:
 *     summary: Cadastrar cliente
 *     tags:
 *       - Client
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cpf
 *               - policy
 *             properties:
 *               name:
 *                 type: string
 *                 example: Cliente Teste
 *               cpf:
 *                 type: string
 *                 example: "12345678900"
 *               policy:
 *                 type: string
 *                 example: Seguro Auto
 *     responses:
 *       201:
 *         description: Cliente cadastrado com sucesso
 *       400:
 *         description: CPF inválido ou campos obrigatórios
 */
// CLIENT
app.post('/client', async (req, res) => {
  const { name, cpf, policy } = req.body

  if (!name || !cpf || !policy) {
    return res.status(400).json({
      error: 'REQUIRED_FIELDS',
      message: 'Preencha os campos obrigatórios'
    })
  }

  const cleanCpf = cpf.replace(/\D/g, '')

  if (cleanCpf.length !== 11) {
    return res.status(400).json({
      error: 'INVALID_CPF',
      message: 'CPF inválido'
    })
  }

  const client = await Client.create({
    name,
    cpf: cleanCpf,
    policy
  })

  return res.status(201).json({
    clientId: client._id,
    status: 'CLIENTE_CRIADO',
    message: 'Cliente cadastrado com sucesso'
  })
})

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Listar clientes
 *     tags:
 *       - Client
 *     responses:
 *       200:
 *         description: Lista de clientes cadastrados
 */
app.get('/clients', authMiddleware, async (req, res) => {
  const clients = await Client.find()

  return res.status(200).json(clients)
})

/**
 * @swagger
 * /policy/{id}:
 *   put:
 *     summary: Atualizar apólice
 *     tags:
 *       - Policy
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Apólice atualizada
 *       404:
 *         description: Apólice não encontrada
 */
// ATUALIZAR POLICY
app.put('/policy/:id', async (req, res) => {
  const { id } = req.params
  const { name, status } = req.body

  const policy = await Policy.findById(id)

  if (!policy) {
    return res.status(404).json({
      error: 'POLICY_NOT_FOUND',
      message: 'Apólice não encontrada'
    })
  }

  if (name) {
    policy.name = name
  }

  if (status) {
    policy.status = status
  }

  await policy.save()

  return res.status(200).json({
    policyId: policy._id,
    status: policy.status,
    message: 'Apólice atualizada com sucesso'
  })
})

/**
 * @swagger
 * /policy/{id}:
 *   get:
 *     summary: Buscar apólice por ID
 *     tags:
 *       - Policy
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Apólice encontrada
 *       404:
 *         description: Apólice não encontrada
 */
// BUSCAR POLICY POR ID
app.get('/policy/:id', async (req, res) => {
  const { id } = req.params

  const policy = await Policy.findById(id)

  if (!policy) {
    return res.status(404).json({
      error: 'POLICY_NOT_FOUND',
      message: 'Apólice não encontrada'
    })
  }

  return res.status(200).json(policy)
})

/**
 * @swagger
 * /policies:
 *   get:
 *     summary: Listar apólices
 *     tags:
 *       - Policy
 *     responses:
 *       200:
 *         description: Lista de apólices
 */
// LISTAR POLICIES
app.get('/policies', async (req, res) => {
  const policies = await Policy.find()

  return res.status(200).json(policies)
})

/**
 * @swagger
 * /policy/{id}:
 *   delete:
 *     summary: Remover apólice
 *     tags:
 *       - Policy
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Apólice removida com sucesso
 *       404:
 *         description: Apólice não encontrada
 */
// REMOVER POLICY
app.delete('/policy/:id', async (req, res) => {
  const { id } = req.params

  const policy = await Policy.findById(id)

  if (!policy) {
    return res.status(404).json({
      error: 'POLICY_NOT_FOUND',
      message: 'Apólice não encontrada'
    })
  }

  await Policy.findByIdAndDelete(id)

  return res.status(200).json({
    message: 'Apólice removida com sucesso'
  })
})


const validProducts = ['AUTO', 'VIDA', 'RESIDENCIAL', 'EMPRESARIAL']

function generateRegistrationId() {
  return `SRO-B3-${new Date().getFullYear()}-${Date.now()}`
}

function validateSroPolicy(data) {
  const errors = []

  if (!data.insurerCode) errors.push('Código da seguradora é obrigatório')
  if (!data.policyNumber) errors.push('Número da apólice é obrigatório')
  if (!data.productCode) errors.push('Código do produto é obrigatório')
  if (!data.insuredDocument) errors.push('Documento do segurado é obrigatório')
  if (!data.premiumAmount || data.premiumAmount <= 0) errors.push('Valor do prêmio deve ser maior que zero')
  if (!data.coverageAmount || data.coverageAmount <= 0) errors.push('Valor de cobertura deve ser maior que zero')
  if (!data.effectiveStartDate) errors.push('Data inicial de vigência é obrigatória')
  if (!data.effectiveEndDate) errors.push('Data final de vigência é obrigatória')

  if (data.productCode && !validProducts.includes(data.productCode)) {
    errors.push('Produto inválido para registro')
  }

  if (data.effectiveStartDate && data.effectiveEndDate) {
    if (new Date(data.effectiveStartDate) >= new Date(data.effectiveEndDate)) {
      errors.push('Data inicial deve ser menor que data final')
    }
  }

  return errors
}

app.post('/sro/register-policy', authMiddleware, async (req, res) => {
  const errors = validateSroPolicy(req.body)

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'REGULATORY_VALIDATION_ERROR',
      message: 'Apólice rejeitada nas validações regulatórias',
      details: errors
    })
  }

  const existingPolicy = await Policy.findOne({
    policyNumber: req.body.policyNumber
  })

  if (existingPolicy) {
    return res.status(409).json({
      error: 'DUPLICATED_POLICY',
      message: 'Número da apólice já registrado'
    })
  }

  const registrationId = generateRegistrationId()

  const policy = await Policy.create({
    registrationId,
    insurerCode: req.body.insurerCode,
    policyNumber: req.body.policyNumber,
    productCode: req.body.productCode,
    insuredDocument: req.body.insuredDocument.replace(/\D/g, ''),
    premiumAmount: req.body.premiumAmount,
    coverageAmount: req.body.coverageAmount,
    effectiveStartDate: req.body.effectiveStartDate,
    effectiveEndDate: req.body.effectiveEndDate,
    status: 'REGISTERED',
    source: 'B3_SRO_FAKE'
  })

  return res.status(201).json({
    message: 'Apólice registrada com sucesso',
    registrationId,
    status: policy.status,
    policy
  })
})

app.get('/sro/policies/:registrationId', authMiddleware, async (req, res) => {
  const { registrationId } = req.params

  const policy = await Policy.findOne({ registrationId })

  if (!policy) {
    return res.status(404).json({
      error: 'POLICY_NOT_FOUND',
      message: 'Registro de apólice não encontrado'
    })
  }

  return res.status(200).json(policy)
})

app.patch('/sro/policies/:registrationId/status', authMiddleware, async (req, res) => {
  const { registrationId } = req.params
  const { status } = req.body

  const allowedStatus = [
    'REGISTERED',
    'UPDATED',
    'CANCELLED',
    'SENT_TO_SUSEP',
    'REJECTED'
  ]

  if (!allowedStatus.includes(status)) {
    return res.status(400).json({
      error: 'INVALID_STATUS',
      message: 'Status inválido para registro SRO'
    })
  }

  const policy = await Policy.findOne({ registrationId })

  if (!policy) {
    return res.status(404).json({
      error: 'POLICY_NOT_FOUND',
      message: 'Registro de apólice não encontrado'
    })
  }

  policy.status = status
  policy.updatedAt = new Date()

  await policy.save()

  return res.status(200).json({
    message: 'Status atualizado com sucesso',
    policy
  })
})

app.get('/regulatory/reports/susep', authMiddleware, async (req, res) => {
  const totalReceived = await Policy.countDocuments()
  const totalRegistered = await Policy.countDocuments({ status: 'REGISTERED' })
  const totalCancelled = await Policy.countDocuments({ status: 'CANCELLED' })
  const totalRejected = await Policy.countDocuments({ status: 'REJECTED' })
  const totalSentToSusep = await Policy.countDocuments({ status: 'SENT_TO_SUSEP' })

  return res.status(200).json({
    reportName: 'Relatório Regulatório SUSEP Fake',
    totalReceived,
    totalRegistered,
    totalCancelled,
    totalRejected,
    totalSentToSusep,
    generatedAt: new Date().toISOString()
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`API rodando na porta ${process.env.PORT || 3000}`)
})