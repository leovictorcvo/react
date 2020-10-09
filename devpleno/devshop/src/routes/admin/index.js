const init = db => {
    const router = require("express").Router();
  
    const categoriesRouter = require("./categories")(db)
    // const productsRouter = require("./products");
  
    router.use((req, res, next) => {
        if (req.session.user && 
            req.session.user.roles.indexOf('admin') >= 0) {
                next();
            } else {
                res.redirect('/');
            }
    });

    router.get("/", (req, res) => res.render('admin/index'));
    router.use("/categorias", categoriesRouter);
    // router.use("/produto", productsRouter(db));
  
    return router;
  };
  
  module.exports = init;
  