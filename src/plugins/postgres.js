const fp = require('fastify-plugin');
const { Client } = require('pg')
require('dotenv').config() 

const client = new Client({ 
    user: process.env.DB_USERNAME, 
    password:process.env.DB_PASSWORD, 
    host: 'localhost', 
    port: 5432, 
    database: process.env.DB_NAME 
}) 

async function dbconnector(fastify, options) { 
    try { 
        await client.connect() 
        console.log("db connected succesfully") 
        fastify.decorate('db', { client }) 
    } catch(err) { 
        console.error(err) 
    } 
} 
module.exports= fp(dbconnector)