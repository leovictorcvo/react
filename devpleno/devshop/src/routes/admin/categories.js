const init = db => {
  const router = require('express').Router();

  const controller = require('../../controllers/categories')(db);

  router.get('/', controller.getAdminCategories);

  router.get('/nova', controller.getAdminCreateCategory);
  router.post('/nova', controller.postAdminCreateCategory);
  router.get('/editar/:id', controller.getAdminUpdateCategory);
  router.post('/editar/:id', controller.postAdminUpdateCategory);
  router.get('/excluir/:id', controller.getAdminRemoveCategory);

  return router;
};

module.exports = init;
