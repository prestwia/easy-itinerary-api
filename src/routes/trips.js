const { v4: uuidv4 } = require('uuid');

const tripsSchema = require('../schemas/trips')

async function routes (fastify) {
    const client = fastify.db.client

    fastify.get('/:id', { schema: tripsSchema.trip }, async (request, reply) => {
        const id = request.params.id

        try { 
            const { rows } = await client.query(`SELECT * FROM trips WHERE trip_id=${id}`) 
            reply.send(rows) 
        } catch(err) { 
            throw new Error(err) 
        }
    })

    fastify.get('/user/:id', { schema: tripsSchema.tripIdList }, async (request, reply) => {
        const id = request.params.id

         try {
            const { rows } = await client.query(`SELECT trip_id FROM trips WHERE user_id=${id}`)
            reply.send(rows) 
         } catch(err) {
            throw new Error(err)
         }
    })

    fastify.post('/', { schema: tripsSchema.addTrip }, async (request, reply) => {
        const { title, notes, start_date, end_date, user_id } = request.body
        const trip_id = uuidv4()
        const date_time = new Date();

        const query = {
            text: `INSERT INTO trips (title, notes, start_date, end_date, 
                                trip_id, user_id, created_at)
                                VALUES($1, $2, $3, $4, $5, $6, $7)`,
            values: [title, notes, start_date, end_date, trip_id, user_id, is_hidden, date_time],
        }

        try {
                await client.query(query)
                reply.code(201)
                return { created: true}
        } catch (err) {
            throw new Error(err)
        }
    })

    fastify.put('/:id', { schema: tripsSchema.updateTrip }, async (request, reply) => {
        const id = request.params.id
        const { title, notes, start_date, end_date } = request.body
        const modified_at = new Date()

        const query = {
            text: `UPDATE trips SET title=$1, notes=$2, 
                        start_date=$3, end_date=$4, modified_at=$5 WHERE trip_id=$6`,
            values: [title, notes, start_date, end_date, modified_at, id]
        }

        try {
            await client.query(query)
            reply.send({ updated: true })
        } catch(err) {
            throw new Error(err)
        }
    })

    fastify.delete('/:id', { schema: tripsSchema.deleteTrip }, async (request, reply) => {
        const id = request.params.id

        const query = {
            text: `DELETE FROM trips WHERE trip_id=$1`,
            values: [id]
        }

        try {
            await client.query(query)
            reply.send({ deleted: true })
        } catch(err) {
            throw new Error(err)
        }
    })
}

module.exports = routes