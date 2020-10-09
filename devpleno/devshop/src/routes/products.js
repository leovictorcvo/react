const init = db => {
  const router = require('express').Router();

  const controller = require('../controllers/products')(db);

  router.get('/:id/:slug', controller.getProductById);

  return router;
};

module.exports = init;
