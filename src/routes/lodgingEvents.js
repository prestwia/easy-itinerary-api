const { PrismaClient } = require('@prisma/client')

const lodgingEventSchema = require('../schemas/lodgingEvents')

async function routes (fastify) {
    const prisma = new PrismaClient()

    fastify.get('/:id', { schema: lodgingEventSchema.lodgingEvent }, async (request, reply) => {
        const id = parseInt(request.params.id)
        if (isNaN(id)) {
            reply.code(400)
            reply.send({ 
                error: "Bad Request", 
                message: "Request parameter must be an integer", 
                statusCode: "400" 
            })
            return 
        }

        try { 
            const lodgingEvent = await prisma.lodgingevents.findUnique({
                where: {
                  lodging_event_id: id,
                },
            })
            if (lodgingEvent === null) {
                reply.code(404)
                reply.send({ 
                    error: "Not Found", 
                    message: "No matching resource found", 
                    statusCode: "404" 
                })
            } else {
                reply.send(lodgingEvent)
            }
        } catch(err) { 
            throw new Error(err) 
        }
    })

    fastify.get('/trips/:id', { schema: lodgingEventSchema.lodgingEventList }, async (request, reply) => {
        const trip_id = request.params.id

        try { 
            const lodgingEvents = await prisma.lodgingevents.findMany({
                where: {
                  trip_id: trip_id,
                },
            })
            reply.send(lodgingEvents)
        } catch(err) { 
            throw new Error(err) 
        }
    })

    fastify.post('/', { schema: lodgingEventSchema.addLodgingEvent }, async (request, reply) => {
        const { address, lodging_type, start_time, end_time, notes, trip_id } = request.body

        let start_time_iso = null
        let end_time_iso = null
        if (start_time) {
            start_time_iso = new Date(start_time).toISOString()
        }
        if (end_time !== null) {
            end_time_iso = new Date(end_time).toISOString()
        }

        try {
            const lodgingEvent = await prisma.lodgingevents.create({
                data: {
                    address: address,
                    notes: notes, 
                    lodging_type: lodging_type,
                    start_time: start_time_iso,
                    end_time: end_time_iso,
                    trip_id: trip_id
                }
            })
            reply.code(201)
            reply.send(lodgingEvent)
        } catch (err) {
            throw new Error(err)
        }
    })

    fastify.put('/:id', { schema: lodgingEventSchema.updateLodgingEvent }, async (request, reply) => {
        const id = parseInt(request.params.id)
        if (isNaN(id)) {
            reply.code(400)
            reply.send({ 
                error: "Bad Request", 
                message: "Request parameter must be an integer", 
                statusCode: "400" 
            })
            return 
        }

        const { address, lodging_type, start_time, end_time, notes } = request.body
        const modified_at = new Date()

        let start_time_iso = null
        let end_time_iso = null
        if (start_time !== null) {
            start_time_iso = new Date(start_time).toISOString();
        }
        if (end_time !== null) {
            end_time_iso = new Date(end_time).toISOString();
        }

        try {
            const updatedLodgingEvent = await prisma.lodgingevents.update({
                where: {
                    lodging_event_id: id
                },
                data: {
                    address: address,
                    notes: notes,
                    lodging_type: lodging_type,
                    start_time: start_time_iso,
                    end_time: end_time_iso,
                    modified_at: modified_at
                }
            })
            reply.send(updatedLodgingEvent)
        } catch(err) {
            throw new Error(err)
        }
    })

    fastify.delete('/:id', { schema: lodgingEventSchema.deleteLodgingEvent }, async (request, reply) => {
        const id = parseInt(request.params.id)
        if (isNaN(id)) {
            reply.code(400)
            reply.send({ 
                error: "Bad Request", 
                message: "Request parameter must be an integer", 
                statusCode: "400" 
            })
            return 
        }

        try {
            const deletedLodgingEvent = await prisma.lodgingevents.delete({
                where: {
                    lodging_event_id: id
                }
            })
            reply.send(deletedLodgingEvent)
        } catch(err) {
            throw new Error(err)
        }
    })
}

module.exports = routes