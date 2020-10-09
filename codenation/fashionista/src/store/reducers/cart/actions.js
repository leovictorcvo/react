export const setCart = products => ({
  type: 'SET_CART',
  products,
});

export const addToCart = product => ({
  type: 'ADD_TO_CART',
  product,
});

export const removeFromCart = id => ({
  type: 'REMOVE_FROM_CART',
  id,
});

export const updateProductAmount = (id, amount) => ({
  type: 'UPDATE_PRODUCT_AMOUNT_IN_CART',
  id,
  amount,
});
