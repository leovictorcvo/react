const express = require('express');
const pessoasController = require('../controllers/pessoas');

const pessoasRouter = ({knex}) => {
    const router = express.Router();
    router.get('/', pessoasController.index.bind(null, knex));
    router.get('/create', pessoasController.createForm);
    router.get('/update/:id', pessoasController.updateForm.bind(null, knex));
    router.get('/delete/:id', pessoasController.deleteOne.bind(null, knex));

    router.post('/create', pessoasController.createPost.bind(null, knex));
    router.post('/update/:id', pessoasController.updatePost.bind(null, knex));
    return router;
}

module.exports = pessoasRouter;