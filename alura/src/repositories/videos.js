import { URL } from '../config/api';

export const saveVideo = (video) => {
  const method = 'POST';

  return fetch(`${URL}/videos`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method,
    body: JSON.stringify(video)
    ,
  }).then((response) => response.json());
};
