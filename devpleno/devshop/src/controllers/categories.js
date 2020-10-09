const init = db => {
  const categoryModel = require('../models/category')(db);
  const productModel = require('../models/product')(db);

  const getCategories = async (req, res) => {
    const { categories } = res.locals;
    const category = categories.filter(cat => cat.id == req.params.id);
    const products = await productModel.getProductsByCategoryId(
      req.params.id,
      req.query
    );

    res.render('category', {
      category,
      products
    });
  };

  const getAdminCategories = async (req, res) => {
    const categories = await categoryModel.getCategories();
    res.render('admin/categories/index', {
      categories
    });
  };

  const getAdminCreateCategory = (req, res) => {
    res.render('admin/categories/create', {
      form: {},
      errors: []
    });
  };

  const postAdminCreateCategory = async (req, res) => {
    try {
      await categoryModel.createCategory(req.body);
      res.redirect('/admin/categorias');
    } catch (error) {
      res.render('admin/categories/create', {
        form: req.body,
        errors: error.errors.fields
      });
    }
  };

  const getAdminUpdateCategory = async (req, res) => {
    const category = await categoryModel.getCategoryById(req.params.id);
    res.render('admin/categories/update', {
      form: category,
      errors: []
    });
  };

  const postAdminUpdateCategory = async (req, res) => {
    try {
      await categoryModel.updateCategory(req.params.id, req.body);
      res.redirect('/admin/categorias');
    } catch (error) {
      res.render('admin/categories/update', {
        form: req.body,
        errors: error.errors.fields
      });
    }
  };

  const getAdminRemoveCategory = async (req, res) => {
    await categoryModel.removeCategory(req.params.id);
    res.redirect('/admin/categorias');
  };

  return {
    getCategories,
    getAdminCategories,
    getAdminCreateCategory,
    postAdminCreateCategory,
    getAdminUpdateCategory,
    postAdminUpdateCategory,
    getAdminRemoveCategory
  };
};

module.exports = init;
