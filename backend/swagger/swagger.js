const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Seguradora B3',
      version: '1.0.0',
      description: 'Documentação da API do projeto Seguradora B3'
    },

    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Ambiente local'
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },

    security: [
      {
        bearerAuth: []
      }
    ]
  },

  apis: ['./server.js']
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec