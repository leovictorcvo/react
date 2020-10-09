import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';

import './config/reactotronConfig';
import Routes from './routes';

import store from './store';

const App = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#191920" />
      <Provider store={store}>
        <Routes />
      </Provider>
    </>
  );
};

export default App;
