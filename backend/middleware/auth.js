const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      error: 'TOKEN_MISSING',
      message: 'Token não enviado'
    })
  }

  const token = authHeader.split(' ')[1]

  try {

    jwt.verify(token, process.env.JWT_SECRET)

    next()

  } catch {

    return res.status(401).json({
      error: 'INVALID_TOKEN',
      message: 'Token inválido'
    })
  }
}