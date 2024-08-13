const { v4: uuidv4 } = require('uuid');
const { PrismaClient } = require('@prisma/client')

const tripsSchema = require('../schemas/trips')

async function routes (fastify) {
    const prisma = new PrismaClient()

    fastify.get('/:id', { schema: tripsSchema.trip }, async (request, reply) => {
        const id = request.params.id
        if (!id) {
            reply.code(400)
            reply.send({ 
                error: "Bad Request", 
                message: "Request parameter must be an integer", 
                statusCode: "400" 
            })
            return 
        }

        try { 
            const trip = await prisma.trips.findUnique({
                where: {
                    trip_id: id,
                },
                include: {
                    lodgingevents: true,
                    activityevents: true,
                    travelevents: true
                }
            })
            if (trip === null) {
                reply.code(404)
                reply.send({ 
                    error: "Not Found", 
                    message: "No matching resource found", 
                    statusCode: "404" 
                })
            } else {
                reply.send(trip)
            }
        } catch(err) { 
            throw new Error(err) 
        }
    })

    fastify.get('/user/:id', { schema: tripsSchema.tripIdList }, async (request, reply) => {
        const user_id = parseInt(request.params.id)
        if (!user_id || isNaN(user_id)) {
            reply.code(400)
            reply.send({ 
                error: "Bad Request", 
                message: "Request parameter must be an integer", 
                statusCode: "400" 
            })
            return 
        }
        
        try {
            const trips = await prisma.trips.findMany({
                where: {
                    user_id: user_id
                }
            })
            reply.send(trips) 
        } catch(err) {
            throw new Error(err)
        }
    })

    fastify.post('/', { schema: tripsSchema.addTrip }, async (request, reply) => {
        const { title, notes, start_date, end_date, user_id } = request.body
        const trip_id = uuidv4()
        const start_date_iso = new Date(start_date).toISOString();
        const end_date_iso = new Date(end_date).toISOString();

        try {
            const trip = await prisma.trips.create({
                data: {
                    title: title,
                    notes: notes, 
                    start_date: start_date_iso,
                    end_date: end_date_iso,
                    user_id: user_id,
                    trip_id: trip_id
                }
            })
            reply.code(201)
            reply.send(trip)
        } catch (err) {
            throw new Error(err)
        }
    })

    fastify.put('/:id', { schema: tripsSchema.updateTrip }, async (request, reply) => {
        const id = request.params.id
        const { title, notes, start_date, end_date } = request.body
        const modified_at = new Date()

        const start_date_iso = new Date(start_date).toISOString();
        const end_date_iso = new Date(end_date).toISOString();

        try {
            const updatedTrip = await prisma.trips.update({
                where: {
                    trip_id: id
                },
                data: {
                    title: title,
                    notes: notes,
                    start_date: start_date_iso,
                    end_date: end_date_iso,
                    modified_at: modified_at
                }
            })
            reply.send(updatedTrip)
        } catch(err) {
            throw new Error(err)
        }
    })

    fastify.delete('/:id', { schema: tripsSchema.deleteTrip }, async (request, reply) => {
        const id = request.params.id

        try {
            const deletedTrip = await prisma.trips.delete({
                where: {
                    trip_id: id
                }
            })
            reply.send(deletedTrip)
        } catch(err) {
            throw new Error(err)
        }
    })
}

module.exports = routes