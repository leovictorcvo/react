export const URL = window.location.hostname.includes('learntube')
  ? 'https://learntube-alura.herokuapp.com'
  : `http://${window.location.hostname}:8080`;
