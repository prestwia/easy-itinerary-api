const trip = {
    response: {
        200: {
            type: 'object',
            required: ['trip_id', 'user_id'],
            properties: {
                title: { type: 'string' },
                notes: { type: 'string' },
                start_date: { type: 'string', format: 'date' },
                end_date: { type: 'string', format: 'date' },
                trip_id: { type: 'string', format: 'uuid' },
                user_id: { type: 'integer' },
                lodgingevents: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required: ['trip_id', 'lodging_event_id'],
                        properties: {
                            address: { type: 'string' },
                            lodging_type: { type: 'string' },
                            start_time: { type: 'string', format: 'date-time' },
                            end_time: { type: 'string', format: 'date-time' },
                            notes: { type: 'string' },
                            trip_id: { type: 'string', format: 'uuid' },
                            lodging_event_id: { type: 'integer' }
                        }
                    }
                },
                activityevents: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required: ['trip_id', 'activity_event_id'],
                        properties: {
                            title: { type: 'string' },
                            description: { type: 'string' },
                            address: { type: 'string' },
                            start_time: { type: 'string', format: 'date-time' },
                            end_time: { type: 'string', format: 'date-time' },
                            notes: { type: 'string' },
                            trip_id: { type: 'string', format: 'uuid' },
                            created_at: { type: 'string', format: 'date-time'},
                            modified_at: { type: 'string', format: 'date-time'},
                            activity_event_id: { type: 'integer' }
                        }
                    }
                },
                travelevents: {
                    type: 'array',
                    items: {
                        type: 'object',
                        required: ['trip_id', 'travel_event_id'],
                        properties: {
                            travel_method: { type: 'string' },
                            start_location: { type: 'string' },
                            end_location: { type: 'string' },
                            start_time: { type: 'string', format: 'date-time' },
                            end_time: { type: 'string', format: 'date-time' },
                            notes: { type: 'string' },
                            trip_id: { type: 'string', format: 'uuid' },
                            created_at: { type: 'string', format: 'date-time'},
                            modified_at: { type: 'string', format: 'date-time'},
                            travel_event_id: { type: 'integer' }
                        }
                    }
                }
            }
        },
        '4xx': {
            type: 'object',
            required: ['error', 'message', 'statusCode'],
            properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                statsuCode: { type: 'string' }
            }
        }
    }
}

const tripIdList = {
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                required: ['trip_id'],
                properties: {
                    trip_id: { type: 'string', format: 'uuid' },
                    title: { type: 'string' },
                    modified_at: { type: 'string', format: 'date-time' }
                }
            }
        },
        '4xx': {
            type: 'object',
            required: ['error', 'message', 'statusCode'],
            properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                statsuCode: { type: 'string' }
            }
        }
    }
}

const addTrip = {
    body: {
        type: 'object',
        required: ['user_id'],
        properties: {                                                           
            title: { 
                type: 'string',
                nullable: true,
                default: null
            },    
            notes: { 
                type: 'string',
                nullable: true,
                default: null
            },                                        
            start_date: { 
                type: 'string', 
                format: "date-time",
                nullable: true,
                default: null
            },                  
            end_date: { 
                type: 'string', 
                format: "date-time",
                nullable: true,
                default: null
            }, 
            /* TODO: replace with uuid */
            user_id: { type: 'integer' }
        }
    },
    response: {
        201: {
            type: 'object',
            required: ['trip_id', 'user_id'],
            properties: {
                title: { type: 'string' },
                notes: { type: 'string' },
                start_date: { type: 'string', format: 'date-time' },
                end_date: { type: 'string', format: 'date-time' },
                user_id: { type: 'integer' },
                trip_id: { type: 'string', format: 'uuid' },
                created_at: { type: 'string', format: 'date-time' },
                modified_at: { type: 'string', format: 'date-time' }
            }
        },
        '4xx': {
            type: 'object',
            required: ['error', 'message', 'statusCode'],
            properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                statsuCode: { type: 'string' }
            }
        }
    }
}

const updateTrip = {
    body: {
        type: 'object',
        required: ['title', 'notes', 'start_date', 'end_date'],
        properties: {                                                           
            title: { type: 'string' },    
            notes: { type: 'string' },                                        
            start_date: { 
                type: 'string', 
                format: "date-time"
            },                  
            end_date: { 
                type: 'string', 
                format: "date-time"
            },
        }
    },
    response: {
        200: {
            type: 'object',
            required: ['trip_id', 'user_id'],
            properties: {
                title: { type: 'string' },
                notes: { type: 'string' },
                start_date: { type: 'string', format: 'date-time' },
                end_date: { type: 'string', format: 'date-time' },
                user_id: { type: 'integer' },
                trip_id: { type: 'string', format: 'uuid' },
                created_at: { type: 'string', format: 'date-time' },
                modified_at: { type: 'string', format: 'date-time' }
            }
        },
        '4xx': {
            type: 'object',
            required: ['error', 'message', 'statusCode'],
            properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                statsuCode: { type: 'string' }
            }
        }
    }
}

const deleteTrip = {
    response: {
        200: {
            type: 'object',
            properties: {
                trip_id: { type: 'string', format: 'uuid' }
            }
        },
        '4xx': {
            type: 'object',
            required: ['error', 'message', 'statusCode'],
            properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                statsuCode: { type: 'string' }
            }
        }
    }
}

module.exports = { trip, tripIdList, addTrip, updateTrip, deleteTrip }