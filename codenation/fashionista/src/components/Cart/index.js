import React, { useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BsBag } from 'react-icons/bs';

import './styles.css';

import Modal from '../Modal';
import CartItem from '../CartItem';
import CartEmpty from '../CartEmpty';
import { formatPrice } from '../../utils/format';

export default () => {
  const [showCart, setShowCart] = useState(false);
  const cart = useSelector(state => state.cart);
  const cartSize = useMemo(
    () => cart.reduce((total, item) => total + item.amount, 0),
    [cart],
  );
  const cartTotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => ({
          quantity: sum.quantity + item.amount,
          total: sum.total + item.subtotal,
        }),
        { quantity: 0, total: 0 },
      ),
    [cart],
  );

  const showCartPage = useCallback(() => {
    setShowCart(true);
  }, []);

  const handleCloseCartPage = useCallback(() => {
    setShowCart(false);
  }, []);

  const cartTotalFormatted = useMemo(() => formatPrice(cartTotal.total), [
    cartTotal.total,
  ]);

  return (
    <>
      <button
        type="button"
        className="actions__button"
        aria-label="Cart"
        onClick={showCartPage}
      >
        <BsBag />
        <span className="cart__quantity">{cartSize}</span>
      </button>
      {showCart && (
        <Modal title="Carrinho" onCloseModal={handleCloseCartPage}>
          <>
            <div className="cart__container">
              {cartSize > 0 ? (
                <ul>
                  {cart.map(item => (
                    <li key={item.sku}>
                      <CartItem item={item} />
                    </li>
                  ))}
                </ul>
              ) : (
                <CartEmpty />
              )}
            </div>
            <div className="cart__total">
              <p>
                Quantidade: <span>{cartTotal.quantity}</span> - Valor:{' '}
                <span>{cartTotalFormatted}</span>
              </p>
            </div>
          </>
        </Modal>
      )}
    </>
  );
};
