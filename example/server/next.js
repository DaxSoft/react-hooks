const dev = true

const NextJS = require('next')({
    dev,
    quiet: !dev,
})

module.exports = (fastify) => {
    fastify.register((fastify, opts, next) => {
        NextJS.prepare()
            .then(() => {
                if (dev) {
                    fastify.get('/_next/*', (req, reply) => {
                        return NextJS.handleRequest(req.req, reply.res).then(
                            () => {
                                reply.sent = true
                            }
                        )
                    })
                }

                fastify.all('/*', (req, reply) => {
                    return NextJS.handleRequest(req.req, reply.res).then(() => {
                        reply.sent = true
                    })
                })

                fastify.setNotFoundHandler((request, reply) => {
                    return NextJS.render404(request.req, reply.res).then(() => {
                        reply.sent = true
                    })
                })

                next()
            })
            .catch((err) => next(err))
    })
}
