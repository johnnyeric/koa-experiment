module.exports = {
    rethinkdb: {
        host: 'localhost',
        port: 28015,
        db: 'test'
    },
    koa: {
        port: process.env.PORT,
        ip:process.env.IP
    }
}