import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import PropTypes from 'prop-types';

import api from '../../services/api';
import * as CartActions from '../../store/modules/cart/actions';

import { formatPrice } from '../../util/format';

import { ProductList } from './styles';

class Home extends Component {
  state = {
    products: [],
  };

  static propTypes = {
    amount: PropTypes.number.isRequired,
    addToCartRequest: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    const response = await api.get('/products');

    const data = response.data.map(pdt => ({
      ...pdt,
      priceFormatted: formatPrice(pdt.price),
    }));

    this.setState({ products: data });
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props;

    addToCartRequest(id);
  };

  render() {
    const { products } = this.state;
    const { amount } = this.props;
    return (
      <ProductList>
        {products.map(pdt => (
          <li key={pdt.id}>
            <img src={pdt.image} alt={pdt.title} />
            <strong>{pdt.title}</strong>
            <span>{pdt.priceFormatted}</span>
            <button type="button" onClick={() => this.handleAddProduct(pdt.id)}>
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
)(Home);
