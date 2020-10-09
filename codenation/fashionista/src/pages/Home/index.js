import React, { useState, useEffect } from 'react';

import './styles.css';

import ProductCard from '../../components/ProductCard';
import Loading from '../../components/Loading';
import Footer from '../../components/Footer';

import getData from '../../services/api';

export default () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getData();
      setProducts(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <main className="container gallery">
            {products?.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
