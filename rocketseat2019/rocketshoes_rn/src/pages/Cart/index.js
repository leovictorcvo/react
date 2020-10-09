import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
} from './styles';

function Cart({cart, total, removeFromCart, updateCartProductRequest}) {
  function updateProductAmout(product, qty) {
    updateCartProductRequest(product.id, product.amount + qty);
  }

  function deleteProduct(product) {
    removeFromCart(product.id);
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
          <IncrementDecrementButton onPress={() => deleteProduct(item)}>
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

  return (
    <Container>
      <CartContainer>
        <CartList
          data={cart}
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
    </Container>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.map(pdt => ({
    ...pdt,
    itemTotal: formatPrice(pdt.amount * pdt.price),
  })),
  total: formatPrice(
    state.cart.reduce((amount, pdt) => amount + pdt.amount * pdt.price, 0)
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
