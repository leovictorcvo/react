import React from 'react';
import {useSelector} from 'react-redux';
import {YellowBox} from 'react-native';

import createRouter from './routes';

YellowBox.ignoreWarnings(['Warning: componentWillMount is deprecated']);

export default function App() {
  const signed = useSelector(state => state.auth.signed);

  const Routes = createRouter(signed);

  return <Routes />;
}
