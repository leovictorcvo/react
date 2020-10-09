import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import * as CartActions from '../../store/modules/cart/action';
import formatPrice from '../../utils/format';

import {
  Container,
  CartContainer,
  CartList,
  Product,
  ProductDetail,
  ProductImage,
  ProductDescription,
  ProductText,
  ProductPrice,
  AmountPriceContainer,
  AmountContainer,
  IncrementDecrementButton,
  AmountText,
  PriceText,
  SummaryContainer,
  PriceContainer,
  TotalText,
  TotalPriceText,
  FinishButton,
  ButtonText,
  EmptyContainer,
  EmptyText,
} from './styles';

export default function Cart() {
  const cart = useSelector(state =>
    state.cart.map(pdt => ({
      ...pdt,
      itemTotal: formatPrice(pdt.amount * pdt.price),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((amount, pdt) => amount + pdt.amount * pdt.price, 0)
    )
  );

  const dispatch = useDispatch();

  function updateProductAmout(product, qty) {
    dispatch(
      CartActions.updateCartProductRequest(product.id, product.amount + qty)
    );
  }

  function renderProduct({item}) {
    return (
      <Product>
        <ProductDetail>
          <ProductImage source={{uri: item.image}} />
          <ProductDescription>
            <ProductText>{item.title}</ProductText>
            <ProductPrice>{item.priceFormatted}</ProductPrice>
          </ProductDescription>
          <IncrementDecrementButton
            onPress={() => dispatch(CartActions.removeFromCart(item.id))}>
            <Icon name="delete" color="#7159c1" size={24} />
          </IncrementDecrementButton>
        </ProductDetail>
        <AmountPriceContainer>
          <AmountContainer>
            <IncrementDecrementButton
              onPress={() => updateProductAmout(item, -1)}>
              <Icon name="remove-circle-outline" color="#7159c1" size={24} />
            </IncrementDecrementButton>
            <AmountText>{item.amount}</AmountText>
            <IncrementDecrementButton
              onPress={() => updateProductAmout(item, 1)}>
              <Icon name="add-circle-outline" color="#7159c1" size={24} />
            </IncrementDecrementButton>
          </AmountContainer>
          <PriceText>{item.itemTotal}</PriceText>
        </AmountPriceContainer>
      </Product>
    );
  }

  function renderCart() {
    return (
      <CartContainer>
        <CartList
          data={cart}
          extraData={cart.length}
          keyExtractor={pdt => String(pdt.id)}
          renderItem={renderProduct}
        />
        <SummaryContainer>
          <PriceContainer>
            <TotalText>TOTAL</TotalText>
            <TotalPriceText>{total}</TotalPriceText>
          </PriceContainer>
          <FinishButton>
            <ButtonText>FINALIZAR PEDIDO</ButtonText>
          </FinishButton>
        </SummaryContainer>
      </CartContainer>
    );
  }

  function renderEmpty() {
    return (
      <EmptyContainer>
        <EmptyText>Carrinho vazio</EmptyText>
      </EmptyContainer>
    );
  }

  return <Container>{cart.length ? renderCart() : renderEmpty()}</Container>;
}

Cart.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    priceFormatted: PropTypes.string.isRequired,
    itemTotal: PropTypes.number.isRequired,
  }),
};

Cart.defaultProps = {
  item: {
    id: 0,
    image: '',
    title: '',
    amount: 1,
    priceFormatted: 'R$ 0,00',
    itemTotal: 0,
  },
};
