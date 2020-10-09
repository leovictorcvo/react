import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { LogoImage, MenuWrapper, ButtonLink } from './style';

import logo from '../../assets/img/logo.png';

const Menu = ({ showNewVideo }) => (
  <MenuWrapper className="Menu">
    <Link to="/">
      <LogoImage
        src={logo}
        alt="Logo com a palavra Aluraflix escrita"
      />
    </Link>
    {showNewVideo && (
    <ButtonLink as={Link} className="ButtonLink" to="/cadastro/video">
      Novo vídeo
    </ButtonLink>
    )}
  </MenuWrapper>
);

Menu.defaultProps = {
  showNewVideo: false,
};

Menu.propTypes = {
  showNewVideo: PropTypes.bool,
};

export default Menu;
