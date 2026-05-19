const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const User = require('./models/User')

dotenv.config({ path: path.resolve(__dirname, '.env') })

const runSeed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    await User.deleteMany()

    await User.create({
      email: 'qa@b3.com',
      password: '123456'
    })

    console.log('Seed executado com sucesso')
    process.exit(0)

  } catch (error) {
    console.log('Erro no seed:', error.message)
    process.exit(1)
  }
}

runSeed()