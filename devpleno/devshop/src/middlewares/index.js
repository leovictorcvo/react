const init = db => {
  const router = require("express").Router();

  const categoriesMiddleware = require("./categories")(db);

  router.use(categoriesMiddleware);

  return router;
};

module.exports = init;
