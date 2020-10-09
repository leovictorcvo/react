const init = db => {
  const getProductById = async (req, res) => {
    const productModel = require('../models/product')(db);

    const { categories } = res.locals;
    const category = categories.filter(cat => cat.id == req.params.id);
    const product = await productModel.getProductById(req.params.id);

    res.render('product_detail', {
      category,
      product
    });
  };

  return {
    getProductById
  };
};

module.exports = init;
