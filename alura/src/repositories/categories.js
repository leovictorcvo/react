import { URL } from '../config/api';

export const getAllCategories = () => fetch(`${URL}/categorias`)
  .then((response) => response.json());

export const getWithVideos = () => fetch(`${URL}/categorias?_embed=videos`)
  .then((response) => response.json());

export const saveCategory = (category) => {
  const {
    id, titulo, descricao, url, cor,
  } = category;

  let method = 'POST';
  let routeParams = '';

  const body = {
    titulo,
    cor,
    link_extra: {
      text: descricao,
      url,
    },
  };

  if (id > 0) {
    method = 'PUT';
    body.id = id;
    routeParams = `/${id}`;
  }

  return fetch(`${URL}/categorias${routeParams}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(body)
    ,
  }).then((response) => response.json());
};

export const deleteCategory = (id) => fetch(`${URL}/categorias/${id}`, {
  method: 'DELETE',
}).then((response) => response.json());
