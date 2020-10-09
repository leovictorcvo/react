const init = db => {
  const router = require("express").Router();

  const homeRouter = require("./home");
  const adminRouter = require('./admin');
  const categoriesRouter = require("./categories");
  const productsRouter = require("./products");
  const auth = require('../controllers/auth');

  router.use("/", homeRouter(db));
  router.post("/login", auth.login(db));
  router.get("/logout", auth.logout);
  router.use('/admin', adminRouter(db));
  router.use("/categoria", categoriesRouter(db));
  router.use("/produto", productsRouter(db));

  return router;
};

module.exports = init;
