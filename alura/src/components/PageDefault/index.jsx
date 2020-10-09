import React from 'react';
import PropTypes from 'prop-types';

import Menu from '../Menu';
import Footer from '../Footer';
import { Main } from './style';

const PageDefault = ({ children, showNewVideo }) => (
  <>
    <Menu showNewVideo={showNewVideo} />
    <Main>{children}</Main>
    <Footer />
  </>
);

PageDefault.defaultProps = {
  showNewVideo: false,
};

PageDefault.propTypes = {
  children: PropTypes.node.isRequired,
  showNewVideo: PropTypes.bool,
};

export default PageDefault;
