import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

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

class Main extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    try {
      const response = await api.get('/products');
      const data = response.data.map(pdt => ({
        ...pdt,
        priceFormatted: formatPrice(pdt.price),
      }));

      this.setState({products: data});
    } catch (error) {
      console.tron.warn(error);
    }
  }

  renderProduct = ({item}) => {
    const {amount} = this.props;

    return (
      <Product key={item.id}>
        <ProductImage source={{uri: item.image}} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.priceFormatted}</ProductPrice>
        <AddButton onPress={() => this.addProductToCart(item.id)}>
          <AmoutContainer>
            <AmountText>{amount[item.id] || 0}</AmountText>
          </AmoutContainer>
          <ButtonText>Adicionar</ButtonText>
        </AddButton>
      </Product>
    );
  };

  addProductToCart = productId => {
    const {addToCartRequest} = this.props;
    addToCartRequest(productId);
  };

  render() {
    const {products} = this.state;
    return (
      <Container>
        <ProductList
          horizontal
          data={products}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderProduct}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount;
    return amount;
  }, {}),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
