const { PrismaClient } = require('@prisma/client')

const activityEventSchema = require('../schemas/activityEvents')

async function routes (fastify) {
    const prisma = new PrismaClient()

    fastify.get('/:id', { schema: activityEventSchema.activityEvent }, async (request, reply) => {
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
            const activityEvent = await prisma.activityevents.findUnique({
                where: {
                  activity_event_id: id,
                },
            })
            if (activityEvent === null) {
                reply.code(404)
                reply.send({ 
                    error: "Not Found", 
                    message: "No matching resource found", 
                    statusCode: "404" 
                })
            } else {
                reply.send(activityEvent)
            }
        } catch(err) { 
            throw new Error(err) 
        }
    })

    fastify.get('/trips/:id', { schema: activityEventSchema.activityEventList }, async (request, reply) => {
        const trip_id = request.params.id

        try { 
            const activityEvents = await prisma.activityevents.findMany({
                where: {
                  trip_id: trip_id,
                },
            })
            reply.send(activityEvents)
        } catch(err) { 
            throw new Error(err) 
        }
    })

    fastify.post('/', { schema: activityEventSchema.addActivityEvent },  async (request, reply) => {
        const { title, description, address, start_time, end_time, notes, trip_id } = request.body

        let start_time_iso = null
        let end_time_iso = null
        if (start_time !== null) {
            start_time_iso = new Date(start_time).toISOString()
        }
        if (end_time !== null) {
            end_time_iso = new Date(end_time).toISOString()
        }

        try {
            const activityEvent = await prisma.activityevents.create({
                data: {
                    title: title,
                    description: description,
                    address: address,
                    notes: notes, 
                    start_time: start_time_iso,
                    end_time: end_time_iso,
                    trip_id: trip_id
                }
            })
            reply.code(201)
            reply.send(activityEvent)
        } catch (err) {
            throw new Error(err)
        }
    })

    fastify.put('/:id', { schema: activityEventSchema.updateActivityEvent }, async (request, reply) => {
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
        const { title, description, address, start_time, end_time, notes } = request.body
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
            const updatedActivityEvent = await prisma.activityevents.update({
                where: {
                    activity_event_id: id
                },
                data: {
                    title: title,
                    description: description,
                    address: address,
                    notes: notes,
                    start_time: start_time_iso,
                    end_time: end_time_iso,
                    modified_at: modified_at
                }
            })
            reply.send(updatedActivityEvent)
        } catch(err) {
            throw new Error(err)
        }
    })

    fastify.delete('/:id', { schema: activityEventSchema.deleteActivityEvent }, async (request, reply) => {
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
            const deletedActivityEvent = await prisma.activityevents.delete({
                where: {
                    activity_event_id: id
                }
            })
            reply.send(deletedActivityEvent)
        } catch(err) {
            throw new Error(err)
        }
    })
}

module.exports = routes