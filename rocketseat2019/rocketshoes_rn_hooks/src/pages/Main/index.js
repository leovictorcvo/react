import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import api from '../../services/api';
import formatPrice from '../../utils/format';

import * as CartActions from '../../store/modules/cart/action';

import {
  Container,
  ProductList,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddButton,
  AmoutContainer,
  AmountText,
  ButtonText,
} from './styles';

export default function Main() {
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

  function renderProduct({item}) {
    return (
      <Product key={item.id}>
        <ProductImage source={{uri: item.image}} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddButton
          onPress={() => dispatch(CartActions.addToCartRequest(item.id))}>
          <AmoutContainer>
            <AmountText>{amount[item.id] || 0}</AmountText>
          </AmoutContainer>
          <ButtonText>Adicionar</ButtonText>
        </AddButton>
      </Product>
    );
  }

  return (
    <Container>
      <ProductList
        horizontal
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={renderProduct}
      />
    </Container>
  );
}
