const lodgingEvent = {
    response: {
        200: {
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

const lodgingEventList = {
    response: {
        200: {
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

const addLodgingEvent = {
    body: {
        type: 'object',
        required: ['trip_id'],
        properties: {                                                           
            address: { 
                type: 'string',
                nullable: true,
                default: null
            },    
            lodging_type: { 
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
            required: ['trip_id', 'lodging_event_id'],
            properties: {
                address: { type: 'string' },
                lodging_type: { type: 'string' },
                start_time: { type: 'string', format: 'date-time' },
                end_time: { type: 'string', format: 'date-time' },
                notes: { type: 'string' },
                trip_id: { type: 'string', format: 'uuid' },
                lodging_event_id: { type: 'integer' },
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
                statusCode: { type: 'string' }
            }
        }
    }
}

const updateLodgingEvent = {
    body: {
        type: 'object',
        required: ['address', 'lodging_type', 'start_time', 'end_time', 'notes'],
        properties: {                                                           
            address: { type: 'string' },
            lodging_type: { type: 'string' },  
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
            required: ['trip_id', 'lodging_event_id'],
            properties: {
                address: { type: 'string' },
                lodging_type: { type: 'string' },
                notes: { type: 'string' },
                start_time: { type: 'string', format: 'date-time' },
                end_time: { type: 'string', format: 'date-time' },
                trip_id: { type: 'string', format: 'uuid' },
                lodging_event_id: { type: 'integer' },
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
                statusCode: { type: 'string' }
            }
        }
    }
}

const deleteLodgingEvent = {
    response: {
        200: {
            type: 'object',
            properties: {
                lodging_event_id: { type: 'integer' },
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

module.exports = { lodgingEvent, lodgingEventList, addLodgingEvent, updateLodgingEvent, deleteLodgingEvent }