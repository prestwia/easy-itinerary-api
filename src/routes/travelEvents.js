const { PrismaClient } = require('@prisma/client')

const travelEventSchema = require('../schemas/travelEvents')

async function routes (fastify) {
    const prisma = new PrismaClient()

    fastify.get('/:id', { schema: travelEventSchema.travelEvent }, async (request, reply) => {
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
            const travelEvent = await prisma.travelevents.findUnique({
                where: {
                  travel_event_id: id,
                },
            })
            if (travelEvent === null) {
                reply.code(404)
                reply.send({ 
                    error: "Not Found", 
                    message: "No matching resource found", 
                    statusCode: "404" 
                })
            } else {
                reply.send(travelEvent)
            }
        } catch(err) { 
            throw new Error(err) 
        }
    })

    fastify.get('/trips/:id', { schema: travelEventSchema.travelEventList }, async (request, reply) => {
        const trip_id = request.params.id

        try { 
            const travelEvents = await prisma.travelevents.findMany({
                where: {
                  trip_id: trip_id,
                },
            })
            reply.send(travelEvents)
        } catch(err) { 
            throw new Error(err) 
        }
    })

    fastify.post('/', { schema: travelEventSchema.addTravelEvent },  async (request, reply) => {
        const { travel_method, start_location, end_location, start_time, end_time, notes, trip_id } = request.body

        let start_time_iso = null
        let end_time_iso = null
        if (start_time !== null) {
            start_time_iso = new Date(start_time).toISOString()
        }
        if (end_time !== null) {
            end_time_iso = new Date(end_time).toISOString()
        }

        try {
            const travelEvent = await prisma.travelevents.create({
                data: {
                    travel_method: travel_method,
                    start_location: start_location,
                    end_location: end_location,
                    notes: notes, 
                    start_time: start_time_iso,
                    end_time: end_time_iso,
                    trip_id: trip_id
                }
            })
            reply.code(201)
            reply.send(travelEvent)
        } catch (err) {
            throw new Error(err)
        }
    })

    fastify.put('/:id', { schema: travelEventSchema.updateTravelEvent }, async (request, reply) => {
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
        const { travel_method, start_location, end_location, start_time, end_time, notes } = request.body
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
            const updatedTravelEvent = await prisma.travelevents.update({
                where: {
                    travel_event_id: id
                },
                data: {
                    travel_method: travel_method,
                    start_location: start_location,
                    end_location: end_location,
                    notes: notes,
                    start_time: start_time_iso,
                    end_time: end_time_iso,
                    modified_at: modified_at
                }
            })
            reply.send(updatedTravelEvent)
        } catch(err) {
            throw new Error(err)
        }
    })

    fastify.delete('/:id', { schema: travelEventSchema.deleteTravelEvent }, async (request, reply) => {
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
            const deletedTravelEvent = await prisma.travelevents.delete({
                where: {
                    travel_event_id: id
                }
            })
            reply.send(deletedTravelEvent)
        } catch(err) {
            throw new Error(err)
        }
    })
}

module.exports = routes