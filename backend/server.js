const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger/swagger')

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

  return res.status(200).json({
    token: 'abc123',
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

// POLICY
app.post('/policy', async (req, res) => {
  const { name, cpf } = req.body

  if (!name || !cpf) {
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

const existingPolicy = await Policy.findOne({
  cpf: cleanCpf
})

if (existingPolicy) {
  return res.status(409).json({
    error: 'DUPLICATED_CPF',
    message: 'CPF já cadastrado'
  })
}

  const policy = await Policy.create({
    name,
    cpf: cleanCpf,
    status: 'CREATED'
  })

  return res.status(201).json({
    policyId: policy._id,
    status: 'APOLICE_CRIADA',
    message: 'Apólice emitida com sucesso'
  })
})

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

app.get('/clients', async (req, res) => {
  const clients = await Client.find()

  return res.status(200).json(clients)
})




app.listen(process.env.PORT || 3000, () => {
  console.log(`API rodando na porta ${process.env.PORT || 3000}`)
})