import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

import PageDefault from '../../../components/PageDefault';
import FormField from '../../../components/FormField';
import Button from '../../../components/Button';
import { getAllCategories } from '../../../repositories/categories';
import { saveVideo } from '../../../repositories/videos';
import { handleError } from '../../../utils/error';

const initialValue = {
  titulo: '',
  categoria: '',
  url: '',
};

const Video = () => {
  const history = useHistory();
  const [video, setVideo] = useState(initialValue);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories([...data]))
      .catch((error) => handleError(error));
  }, []);

  const handleChange = (evt) => {
    const { value } = evt.target;
    const key = evt.target.getAttribute('name');

    setVideo({
      ...video,
      [key]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { titulo, url, categoria } = video;
    const categoriaEscolhida = categories.find((cat) => cat.titulo === categoria);

    saveVideo({
      titulo, url, categoriaId: categoriaEscolhida.id,
    }).then(() => {
      history.push('/');
    }).catch(handleError);
  };

  return (
    <PageDefault>
      <h1>Cadastro de Video</h1>

      <form onSubmit={handleSubmit}>
        <FormField
          label="Titulo"
          type="text"
          name="titulo"
          value={video.titulo}
          onChange={handleChange}
        />
        <FormField
          label="Categoria"
          type="text"
          name="categoria"
          value={video.categoria}
          onChange={handleChange}
          suggestions={categories.map((cat) => cat.titulo)}
        />
        <FormField
          label="Url do vídeo"
          type="text"
          name="url"
          value={video.url}
          onChange={handleChange}
        />

        <Button color="var(--white)" backgroundColor="var(--primary)">
          Salvar
        </Button>
        <Button color="var(--black)" backgroundColor="var(--blackLighter)">
          Limpar
        </Button>
      </form>
      <br />
      <br />
      <Link to="/cadastro/categoria">Cadastrar categoria</Link>
    </PageDefault>
  );
};

export default Video;
