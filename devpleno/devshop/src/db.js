const db = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_SERVER,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }
});

if ((process.env.KNEX_DEBUG && process.env.KNEX_DEBUG.toUpperCase() === 'TRUE') || false) {
    db.on('query', query => console.log(query.sql));
}

module.exports = db;
