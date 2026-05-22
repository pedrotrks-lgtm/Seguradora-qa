const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')

dotenv.config({ path: path.resolve(__dirname, '.env') })

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

await User.deleteMany({})

await User.insertMany([
  {
    email: 'qa@b3.com',
    password: '123456'
  },
  {
    email: 'olivia@b3.com',
    password: 'abc1234'
  },
  {
    email: 'karol@b3.com',
    password: 'abc12345'
  }
])

console.log('Usuários criados com sucesso')
    process.exit(0)

  } catch (error) {
    console.log('Erro no seed:', error.message)
    process.exit(1)
  }
}

runSeed()