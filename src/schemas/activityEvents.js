const activityEvent = {
    response: {
        200: {
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

const activityEventList = {
    response: {
        200: {
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

const addActivityEvent = {
    body: {
        type: 'object',
        required: ['trip_id'],
        properties: {   
            title:  { 
                type: 'string',
                nullable: true,
                default: null
            },  
            description: { 
                type: 'string',
                nullable: true,
                default: null
            },                                                         
            address: { 
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

const updateActivityEvent = {
    body: {
        type: 'object',
        required: ['title', 'description', 'address', 'start_time', 'end_time', 'notes'],
        properties: { 
            title: { type: 'string' }, 
            description: { type: 'string' },                                                         
            address: { type: 'string' }, 
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

const deleteActivityEvent = {
    response: {
        200: {
            type: 'object',
            properties: {
                activity_event_id: { type: 'integer' },
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

module.exports = { activityEvent, activityEventList, addActivityEvent, updateActivityEvent, deleteActivityEvent }