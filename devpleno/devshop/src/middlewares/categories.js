const init = db => async (req, res, next) => {
  const categoryModel = require("../models/category")(db);
  const categories = await categoryModel.getCategories();
  const { user } = req.session;
  res.locals = {
    categories,
    user
  };
  next();
};

module.exports = init;
