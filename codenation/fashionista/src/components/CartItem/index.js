import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { FiMinusCircle, FiPlusCircle } from 'react-icons/fi';

import './styles.css';
import { formatPrice } from '../../utils/format';
import {
  updateProductAmount,
  removeFromCart,
} from '../../store/reducers/cart/actions';

export default ({ item }) => {
  const dispatch = useDispatch();

  const increment = useCallback(
    product => {
      dispatch(updateProductAmount(product.sku, product.amount + 1));
    },
    [dispatch],
  );

  const decrement = useCallback(
    product => {
      dispatch(updateProductAmount(product.sku, product.amount - 1));
    },
    [dispatch],
  );

  const remove = useCallback(
    id => {
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );

  return (
    <div className="item__container">
      <figure className="thumb__container">
        <img className="item__image" src={item.image_url} alt={item.name} />
        <button
          className="delete__button"
          type="button"
          onClick={() => remove(item.sku)}
        >
          Excluir Item
        </button>
      </figure>
      <div className="item__data">
        <span className="item__title">{item.name}</span>
        <span className="item__size">Tamanho: {item.size}</span>
        <div className="item__price">
          {item.discount_percentage && (
            <span className="item__discount">{item.regular_price}</span>
          )}
          <span>{item.actual_price}</span>
          <span>{item.installments}</span>
        </div>
        <div className="item__amount">
          <div style={{ display: 'flex' }}>
            <button
              className="amount__operation"
              type="button"
              onClick={() => decrement(item)}
            >
              <FiMinusCircle />
            </button>
            <span className="amount__quantity">{item.amount}</span>
            <button
              className="amount__operation"
              type="button"
              onClick={() => increment(item)}
            >
              <FiPlusCircle />
            </button>
          </div>
          <div>
            <span className="item__subtotal">{formatPrice(item.subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
