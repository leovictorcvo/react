import React from 'react';

import './styles.css';

export default () => (
  <div className="no-items">
    <span className="no-items__content">Não há items no carrinho</span>
    <span className="no-items__emoji" role="img" aria-label="Sacolas vazias">
      🛍
    </span>
  </div>
);
