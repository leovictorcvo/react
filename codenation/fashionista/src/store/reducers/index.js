import { combineReducers } from 'redux';

import cart from './cart/reducer';
import modal from './modal/reducer';
import products from './products/reducer';
import theme from './theme/reducer';

export default combineReducers({
  cart,
  modal,
  products,
  theme,
});
