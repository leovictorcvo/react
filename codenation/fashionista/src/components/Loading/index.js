import React from 'react';

import './styles.css';

const Loading = () => (
  <div className="loading" data-testid="loading">
    <div className="preloader">
      <span className="preloader__bar" />
      <span className="preloader__bar" />
      <span className="preloader__bar" />
      <span className="preloader__bar" />
      <span className="preloader__bar" />
      <span className="preloader__bar" />
    </div>
    Carregando
  </div>
);

export default Loading;
