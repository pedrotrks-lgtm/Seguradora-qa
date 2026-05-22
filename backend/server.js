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
app.get('/clients', async (req, res) => {
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
app.listen(process.env.PORT || 3000, () => {
  console.log(`API rodando na porta ${process.env.PORT || 3000}`)
})