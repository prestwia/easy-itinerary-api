const trip = {
    response: {
        200: {
            type: 'object',
            required: ['trip_id', 'user_id'],
            properties: {
                trip_id: { type: 'string',  format: 'uuid' },                                                              
                title: { type: 'string' },    
                notes: { type: 'string' },                                        
                start_date:{ type: 'string', format: "date" },                  
                end_date:{ type: 'string', format: "date" },    
                user_id: { type: 'string' }
            }
        }
    }
}

const tripIdList = {
    response: {
        200: {
            type: 'array',
            required: ['trip_id'],
            properties: {
                trip_id: { type: 'string', format: 'uuid' }
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
                format: "date",
                nullable: true,
                default: null
            },                  
            end_date: { 
                type: 'string', 
                format: "date",
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
            properties: {
                created: { type: 'boolean' }
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
                format: "date"
            },                  
            end_date: { 
                type: 'string', 
                format: "date"
            },
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                updated: { type: 'boolean' }
            }
        }
    }
}

const deleteTrip = {
    response: {
        200: {
            type: 'object',
            properties: {
                deleted: { type: 'boolean' }
            }
        }
    }
}

module.exports = { trip, tripIdList, addTrip, updateTrip, deleteTrip }