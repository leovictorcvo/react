import React from 'react';

import './styles.css';

export default ({ product }) => (
  <div className="result__container">
    <img className="result__image" src={product.image_url} alt={product.name} />
    <div className="result__data">
      <span className="result__title">{product.name}</span>
      <div className="result__price">
        {product.discount_percentage && (
          <span className="result__discount">{product.regular_price}</span>
        )}
        <span>{product.actual_price}</span>
        <span>{product.installments}</span>
      </div>
    </div>
  </div>
);
