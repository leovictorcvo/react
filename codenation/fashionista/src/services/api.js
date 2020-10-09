import slug from 'slug';

import { store } from '../store';
import { storeProducts } from '../store/reducers/products/actions';
import { parseStringToFloat } from '../utils/format';

const url = 'https://5e9935925eabe7001681c856.mockapi.io/api/v1/catalog';

const generateProductSlug = (id, name) => {
  return slug(`${id}-${name}`);
};

const loadData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.map((product, index) => ({
      ...product,
      id: index,
      image_url: product.image || '/img/no-image.png',
      price: parseStringToFloat(product.actual_price),
      slug: generateProductSlug(index, product.name),
    }));
  } catch {
    alert(
      'Ocorreu um erro ao ler os produtos disponíveis. Verifique sua conexão ou tente mais tarde.',
    );
    return [];
  }
};

export default async () => {
  const state = store.getState();
  let products = state.products;
  if (products?.length > 0) {
    return products;
  }
  products = await loadData();
  store.dispatch(storeProducts(products));
  return products;
};
