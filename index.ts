require('dotenv').config()
import generateIconRoutes from "./routes";
const fastify = require('fastify')()

fastify.register(require('@fastify/postgres'), {
    connectionString: `postgresql://postgres:${process.env.DB_PASSWORD}@localhost:5432/${process.env.DB_TABLE}`
})

fastify.register(generateIconRoutes,{prefix:"/v1"})

fastify.listen({port:4000, host: '0.0.0.0' },(err, address) => {
    if(err) {
        process.exit()
    }

    console.log(`listening at port ${address}`)
})