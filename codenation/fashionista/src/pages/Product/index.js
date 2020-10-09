import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import './styles.css';
import Loading from '../../components/Loading';

import { addToCart } from '../../store/reducers/cart/actions';
import getData from '../../services/api';
import Image from '../../components/Image';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { slug } = useParams();

  const [product, setProduct] = useState({});
  const [actualSize, setActualSize] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      const products = await getData();
      if (products?.length === 0) {
        history.push('/');
      }
      const product = products.find(p => p.slug === slug);
      if (!product) {
        history.push('/');
      }
      if (product?.sizes?.length > 0) {
        setActualSize(product.sizes.find(size => !!size.available));
      }
      setProduct(product);
      setIsLoading(false);
    };
    loadData();
  }, [history, slug]);

  const handleAddToCart = useCallback(() => {
    const {
      id,
      name,
      image_url,
      discount_percentage,
      actual_price,
      installments,
      regular_price,
      price,
    } = product;
    const { size, sku } = actualSize;
    dispatch(
      addToCart({
        sku,
        size,
        image_url,
        product_id: id,
        name,
        discount_percentage,
        actual_price,
        regular_price,
        price,
        installments,
      }),
    );
  }, [actualSize, dispatch, product]);

  const handleChangeSize = useCallback(size => setActualSize(size), []);
  const sizesAvailable = useMemo(
    () => product?.sizes?.filter(size => !!size.available),
    [product],
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="container">
          <div className="product__container">
            <div className="detail__container">
              <Image
                imageUrl={product.image_url}
                alternateText={product.name}
                styleClass="detail__image"
              />

              <div className="detail__product">
                <p className="detail__title">{product.name}</p>
                <p className="size__title">Escolha o tamanho</p>
                <div className="size__container">
                  {sizesAvailable.map(size => {
                    const class_name = `detail__size ${
                      size.sku === actualSize.sku
                        ? 'detail__size--selected'
                        : ''
                    }`;
                    return (
                      <button
                        type="button"
                        className={class_name}
                        key={size.sku}
                        onClick={() => handleChangeSize(size)}
                      >
                        {size.size}
                      </button>
                    );
                  })}
                </div>
                <div className="value__container">
                  {!!product.on_sale && (
                    <label className="value__regular">
                      {product.regular_price}
                    </label>
                  )}
                  <label className="value__actual">
                    {product.actual_price}
                    {product.discount_percentage && (
                      <span className="discount__percentage">
                        {' '}
                        (-{product.discount_percentage})
                      </span>
                    )}
                  </label>
                  <label className="value__installments">
                    Em até {product.installments} sem juros
                  </label>
                </div>
                <div className="shop__action">
                  <button
                    type="button"
                    className="detail__buy"
                    onClick={handleAddToCart}
                    disabled={!actualSize}
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
