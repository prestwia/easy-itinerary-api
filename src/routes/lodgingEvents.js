const { v4: uuidv4 } = require('uuid');

async function routes (fastify) {
    const client = fastify.db.client

    fastify.get('/:id', async (request, reply) => {
        const id = request.params.id

        try { 
            const { rows } = await client.query(`SELECT * FROM lodgingEvents WHERE lodging_event_id=${id}`) 
            reply.send(rows) 
        } catch(err) { 
            throw new Error(err) 
        }
    })

    fastify.post('/',  async (request, reply) => {
        const { address, lodging_type, start_time, end_time, notes, trip_id } = request.body

        const query = {
            text: `INSERT INTO lodgingEvents (address, lodging_type, start_time, end_time, 
                                notes, trip_id)
                                VALUES($1, $2, $3, $4, $5, $6)
                                RETURNING *`,
            values: [address, lodging_type, start_time, end_time, notes, trip_id],
        }

        try {
                const { rows } = await client.query(query)
                if (rows.length > 0) {
                    reply.code(201)
                    reply.send({ created: true, record: rows[0] })
                }
        } catch (err) {
            reply.code(409)
            reply.send({ 
                error: "Conflict", 
                message: "Request not completed due to conflict with current state. (e.g. no matching trip_id)", 
                statusCode: "409" 
            })
        }
    })

    fastify.put('/:id', async (request, reply) => {
        const id = request.params.id
        const { address, lodging_type, start_time, end_time, notes } = request.body
        const modified_at = new Date()

        const query = {
            text: `UPDATE lodgingEvents SET address=$1, lodging_type=$2, 
                        start_time=$3, end_time=$4, notes=$5, modified_at=$6 WHERE lodging_event_id=$7
                        RETURNING *`,
            values: [address, lodging_type, start_time, end_time, notes, modified_at, id]
        }

        try {
            const { rows } = await client.query(query)
            if (rows.length > 0) {
                reply.send({ updated: true, record: rows[0] })
            } else {
                reply.code(404)
                reply.send({ error: "Not Found", message: "No matching resource found", statusCode: "404" })
            }
        } catch(err) {
            throw new Error(err)
        }
    })

    fastify.delete('/:id', async (request, reply) => {
        const id = request.params.id

        const query = {
            text: `DELETE FROM lodgingEvents WHERE lodging_event_id=$1`,
            values: [id]
        }

        try {
            const { rowCount }= await client.query(query)
            if (rowCount > 0) {
                reply.send({ deleted: true })
            } else {
                reply.code(404)
                reply.send({ error: "Not Found", message: "No matching resource found", statusCode: "404" })
            }
        } catch(err) {
            throw new Error(err)
        }
    })
}

module.exports = routes