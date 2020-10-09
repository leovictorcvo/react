import React, { useState, useEffect } from 'react';

import { getWithVideos } from '../../repositories/categories';
import BannerMain from '../../components/BannerMain';
import Carousel from '../../components/Carousel';
import PageDefault from '../../components/PageDefault';

import { handleError } from '../../utils/error';

const Home = () => {
  const [dadosIniciais, setDadosIniciais] = useState([]);

  useEffect(() => {
    getWithVideos()
      .then((data) => { setDadosIniciais(data); })
      .catch(handleError);
  }, []);

  return (
    <PageDefault showNewVideo>
      {dadosIniciais.length === 0 ? <h1>Loading</h1> : (
        <>
          <BannerMain
            videoTitle={dadosIniciais[0].videos[0].titulo}
            url={dadosIniciais[0].videos[0].url}
            videoDescription="O que é Front-end? Trabalhando na área os termos HTML, CSS e JavaScript fazem parte da rotina das desenvolvedoras e desenvolvedores. Mas o que eles fazem, afinal? Descubra com a Vanessa!"
          />

          <Carousel ignoreFirstVideo category={dadosIniciais[0]} />

          <Carousel category={dadosIniciais[1]} />

          <Carousel category={dadosIniciais[2]} />

          <Carousel category={dadosIniciais[3]} />

          <Carousel category={dadosIniciais[4]} />

          <Carousel category={dadosIniciais[5]} />
        </>
      )}
    </PageDefault>
  );
};

export default Home;
