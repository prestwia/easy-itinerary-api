require('dotenv').config()

PORT = process.env.PORT || 3000

const fastify = require('fastify')({
  logger: true
})

/* register routes */
fastify.register(require('./routes/trips.js'), { prefix: '/trips' })
fastify.register(require('./routes/lodgingEvents.js'), { prefix: '/lodgingEvents'})
fastify.register(require('./routes/activityEvents.js'), { prefix: '/activityEvents'})
fastify.register(require('./routes/travelEvents.js'), { prefix: '/travelEvents'})

// Run the server
fastify.listen({ port: PORT, host: 'localhost' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})