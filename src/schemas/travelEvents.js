const travelEvent = {
    response: {
        200: {
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
        },
        '4xx': {
            type: 'object',
            required: ['error', 'message', 'statusCode'],
            properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                statusCode: { type: 'string' }
            }
        }
    }
}

const travelEventList = {
    response: {
        200: {
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
        },
        '4xx': {
            type: 'object',
            required: ['error', 'message', 'statusCode'],
            properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                statusCode: { type: 'string' }
            }
        }
    }
}

const addTravelEvent = {
    body: {
        type: 'object',
        required: ['trip_id'],
        properties: {   
            travel_method:  { 
                type: 'string',
                nullable: true,
                default: null
            },  
            start_location: { 
                type: 'string',
                nullable: true,
                default: null
            },                                                         
            end_location: { 
                type: 'string',
                nullable: true,
                default: null
            },                                          
            start_time: { 
                type: 'string', 
                format: "date-time",
                nullable: true,
                default: null
            },                  
            end_time: { 
                type: 'string', 
                format: "date-time",
                nullable: true,
                default: null
            }, 
            notes: {
                type: 'string',
                nullable: true,
                default: null
            },
            trip_id: { 
                type: 'string', 
                format: 'uuid',
                nullable: false 
            },
        }
    },
    response: {
        201: {
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
        },
        '4xx': {
            type: 'object',
            required: ['error', 'message', 'statusCode'],
            properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                statusCode: { type: 'string' }
            }
        }
    }
}

const updateTravelEvent = {
    body: {
        type: 'object',
        required: ['travel_method', 'start_location', 'end_location', 'start_time', 'end_time', 'notes'],
        properties: { 
            travel_method: { type: 'string' }, 
            start_location: { type: 'string' },
            start_location: { type: 'string' },                                                         
            notes: { type: 'string' },                                        
            start_time: { 
                type: 'string', 
                format: "date-time"
            },                  
            end_time: { 
                type: 'string', 
                format: "date-time"
            },
        }
    },
    response: {
        200: {
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
        },
        '4xx': {
            type: 'object',
            required: ['error', 'message', 'statusCode'],
            properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                statusCode: { type: 'string' }
            }
        }
    }
}

const deleteTravelEvent = {
    response: {
        200: {
            type: 'object',
            properties: {
                travel_event_id: { type: 'integer' },
                trip_id: { type: 'string', format: 'uuid' }
            }
        },
        '4xx': {
            type: 'object',
            required: ['error', 'message', 'statusCode'],
            properties: {
                error: { type: 'string' },
                message: { type: 'string' },
                statusCode: { type: 'string' }
            }
        }
    }
}

module.exports = { travelEvent, travelEventList, addTravelEvent, updateTravelEvent, deleteTravelEvent }