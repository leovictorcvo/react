import React from 'react';

import PageDefault from '../../components/PageDefault';
import { NotFoundWrapper } from './style';

const NotFound = () => (
  <PageDefault>
    <NotFoundWrapper>
      <p>
        A página que você procura eu não encontrei, mas que tal jogar um pouco?
      </p>
      <iframe
        title="Let's play"
        src="https://mariosouto.com/flappy-bird-devsoutinho/"
        scrolling="no"
      />
    </NotFoundWrapper>
  </PageDefault>
);

export default NotFound;
