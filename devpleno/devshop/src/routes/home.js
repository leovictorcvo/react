const init = db => {
  const router = require("express").Router();

  const controller = require("../controllers/home");

  router.get("/", controller.getIndex);

  return router;
};

module.exports = init;
