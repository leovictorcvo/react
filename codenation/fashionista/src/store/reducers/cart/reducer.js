import { produce } from 'immer';

export default function cart(state = [], action) {
  switch (action.type) {
    case 'SET_CART':
      return action.products;
    case 'ADD_TO_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.sku === action.product.sku);
        if (productIndex > -1) {
          draft[productIndex].amount += 1;
          draft[productIndex].subtotal =
            draft[productIndex].price * draft[productIndex].amount;
        } else {
          const { product } = action;
          draft.push({
            ...product,
            amount: 1,
            subtotal: product.price,
          });
        }
      });

    case 'REMOVE_FROM_CART':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.sku === action.id);
        if (productIndex > -1) {
          draft.splice(productIndex, 1);
        }
      });

    case 'UPDATE_PRODUCT_AMOUNT_IN_CART':
      return produce(state, draft => {
        if (action.amount > 0) {
          const productIndex = draft.findIndex(p => p.sku === action.id);
          if (productIndex > -1) {
            draft[productIndex].amount = action.amount;
            draft[productIndex].subtotal =
              draft[productIndex].amount * draft[productIndex].price;
          }
        }
      });
    default:
      return state;
  }
}
