const Joi = require('@hapi/joi');

const slug = require('../utils/slug');
const validation = require('../utils/validation');

const categorySchema = Joi.object().keys({
  name: Joi.string()
    .min(5)
    .max(245)
    .required(),
  description: Joi.string()
    .min(5)
    .required()
});

const init = db => {
  const getCategoryById = async id => {
    const data = await db('categories')
      .where({ id })
      .first();
    return { ...data, slug: slug(data.name) };
  };

  const getCategories = async () => {
    const data = await db('categories').select('*');
    return data.map(category => ({ ...category, slug: slug(category.name) }));
  };

  const createCategory = async category => {
    const value = validation.validate(category, categorySchema);
    await db('categories').insert(value);
  };

  const updateCategory = async (id, category) => {
    const value = validation.validate(category, categorySchema);
    await db('categories')
      .where({ id })
      .update(value);
  };

  const removeCategory = async id => {
    await db('categories')
      .where({ id })
      .del();
  };

  return {
    getCategoryById,
    getCategories,
    createCategory,
    updateCategory,
    removeCategory
  };
};

module.exports = init;
