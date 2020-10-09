import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';
import Image from '../Image';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.slug}`}>
      <div className="gallery__product">
        <div className="image__container">
          <Image
            imageUrl={product.image_url}
            alternateText={product.name}
            styleClass="product__image"
          />
          {!!product.on_sale && (
            <div className="product__badge">
              <span>{product.discount_percentage}</span>
            </div>
          )}
        </div>
        <div className="product__description">
          <p className="product__name">{product.name}</p>
          <div className="product__price">
            {!!product.on_sale && (
              <span className="price__regular">{product.regular_price}</span>
            )}
            <span className="price__actual">{product.actual_price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
