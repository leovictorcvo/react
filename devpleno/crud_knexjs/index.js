require('dotenv').config();

const express = require('express');
const path = require('path');
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
    }
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const dependencies = {
    knex
};

const pessoas = require('./routes/pessoas');

app.get('/', (req, res) => res.render('home'));
app.use('/pessoas', pessoas(dependencies));

app.listen(port, () => console.log('CRUD listening on port: ' + port));
