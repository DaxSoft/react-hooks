'use strict'

// ------------------------------------------------------------------
// | [requirements]
// ------------------------------------------------------------------

const fastify = require('fastify')({
    logger: true,
    pluginTimeout: 30000,
})

const cors = require('fastify-cors')

// ------------------------------------------------------------------
// | [register]
// ------------------------------------------------------------------

fastify.register(cors)

// ------------------------------------------------------------------
// | [Next]
// ------------------------------------------------------------------

require('./next')(fastify)

// ------------------------------------------------------------------
// | [run]
// | run out the serve
// ------------------------------------------------------------------

const start = async () => {
    // handle with errors
    try {
        await fastify.listen(3000)
        fastify.log.info(`server listening on ${3000}`)
    } catch (error) {
        console.log({
            error,
        })
        fastify.log.error(error)
        process.exit(1)
    }
}

start()
