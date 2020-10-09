const slug = require('../utils/slug');
const pagination = require('../utils/pagination');

const init = db => {
  const getProductById = async id => {
    const product = await db('products')
      .where({ id })
      .first();
    return { ...product, slug: slug(product.name) };
  };

  const getProductsByCategoryId = async (id, query) => {
    const records = await db('products')
      .innerJoin(
        'categories_products',
        'products.id',
        'categories_products.product_id'
      )
      .where('categories_products.category_id', id)
      .count('* as total')
      .first();

    const paginationData = pagination.getPaginationParams(query, records.total);

    const data = await db('products')
      .innerJoin(
        'categories_products',
        'products.id',
        'categories_products.product_id'
      )
      .where('categories_products.category_id', id)
      .select('products.*')
      .offset((paginationData.currentPage - 1) * paginationData.pageSize)
      .limit(paginationData.pageSize);

    const products = data.map(product => ({
      ...product,
      slug: slug(product.name)
    }));

    return {
      data: products,
      pagination: paginationData
    };
  };

  return {
    getProductById,
    getProductsByCategoryId
  };
};

module.exports = init;
