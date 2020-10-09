import React, { useState } from 'react';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';

import api from '~/services/api';

import { Container, BannerContainer, Message } from './styles';

export default function BannerInput({ name, bannerChanged }) {
  const { defaultValue } = useField(name);

  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('/files', data);

    const { url, name, path } = response.data;

    bannerChanged({
      id: (defaultValue && defaultValue.id) || 0,
      name,
      path,
      url,
    });
    setPreview(url);
  }

  return (
    <Container>
      <BannerContainer htmlFor="banner" src={preview}>
        <img src={preview} alt="Banner" />
        <div>
          <MdCameraAlt size={54} color="#fff" />
          <Message> Selecionar a imagem</Message>
        </div>
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={handleChange}
        />
      </BannerContainer>
    </Container>
  );
}
