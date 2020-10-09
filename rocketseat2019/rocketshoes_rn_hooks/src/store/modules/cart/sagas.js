import {Alert} from 'react-native';
import {call, select, put, all, takeLatest} from 'redux-saga/effects';

import api from '../../../services/api';
import formatPrice from '../../../utils/format';

import {addToCartSuccess, updateCartProductSuccess} from './action';

function* addToCart({id}) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Alert.alert('Estoque insuficiente');
    return;
  }

  if (productExists) {
    yield put(updateCartProductSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount,
      priceFormatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({id, amount}) {
  if (amount < 1) return;

  const stock = yield call(api.get, `/stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Alert.alert('Estoque insuficiente');
    return;
  }

  yield put(updateCartProductSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
