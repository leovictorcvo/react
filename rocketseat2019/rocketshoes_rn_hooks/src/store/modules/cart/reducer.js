import produce from 'immer';

export default function cart(oldState = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS':
      return produce(oldState, draft => {
        const {product} = action;
        draft.push(product);
      });
    case '@cart/UPDATE_AMOUNT_SUCCESS':
      return produce(oldState, draft => {
        const index = draft.findIndex(p => p.id === action.id);
        if (index >= 0) {
          const newAmount = action.amount > 0 ? action.amount : 1;
          draft[index].amount = Number(newAmount);
        }
      });
    case '@cart/DELETE_PRODUCT':
      return produce(oldState, draft => {
        const index = draft.findIndex(p => p.id === action.id);
        if (index >= 0) {
          draft.splice(index, 1);
        }
      });
    default:
      return oldState;
  }
}
