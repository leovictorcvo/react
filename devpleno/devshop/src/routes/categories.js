const init = db => {
  const router = require("express").Router();

  const controller = require("../controllers/categories")(db);

  router.get("/:id/:slug", controller.getCategories);

  return router;
};

module.exports = init;
