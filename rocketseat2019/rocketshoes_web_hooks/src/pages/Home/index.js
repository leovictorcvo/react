import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';

import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import { ProductList } from './styles';

export default function Home() {
  const [products, setProducts] = useState([]);
  const amount = useSelector(state =>
    state.cart.reduce((total, product) => {
      total[product.id] = product.amount;
      return total;
    }, {})
  );

  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/products');

      const data = response.data.map(pdt => ({
        ...pdt,
        priceFormatted: formatPrice(pdt.price),
      }));

      setProducts(data);
    }
    loadProducts();
  }, []);

  return (
    <ProductList>
      {products.map(pdt => (
        <li key={pdt.id}>
          <img src={pdt.image} alt={pdt.title} />
          <strong>{pdt.title}</strong>
          <span>{pdt.priceFormatted}</span>
          <button
            type="button"
            onClick={() => dispatch(CartActions.addToCartRequest(pdt.id))}
          >
            <div>
              <MdAddShoppingCart size={16} color="fff" />
              {amount[pdt.id] || 0}
            </div>
            <span>Adicionar ao carrinho</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
