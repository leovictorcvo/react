import { useEffect, useState } from 'react';

import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async term => {
    try {
      const { data } = await yelp.get('/search', {
        params: {
          term,
          limit: 50,
          location: 'san jose'
        }
      });
      setResults(data.businesses);
    } catch (error) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    searchApi('pasta');
  }, []);

  return [searchApi, results, errorMessage];
};
