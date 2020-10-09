import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './styles.css';

import ThemeSelector from '../ThemeSelector';
import Search from '../Search';
import Cart from '../Cart';

export default () => {
  const currentTheme = useSelector(state => state.theme);
  return (
    <header>
      <div className="container header">
        <Link to="/">
          <span className="header__logo">Fashionista</span>
        </Link>
        <div className="header__actions">
          <ThemeSelector currentTheme={currentTheme} />
          <Search />
          <Cart />
        </div>
      </div>
    </header>
  );
};
