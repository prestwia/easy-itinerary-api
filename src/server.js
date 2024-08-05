require('dotenv').config()

PORT = process.env.PORT || 3000

const fastify = require('fastify')({
  logger: true
})

/* Connect to postgres db */
const dbconnector = require('./plugins/postgres.js')
fastify.register(dbconnector)

/* register routes */
fastify.register(require('./routes/trips.js'), { prefix: '/trips' })

// Run the server
fastify.listen({ port: PORT, host: 'localhost' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})