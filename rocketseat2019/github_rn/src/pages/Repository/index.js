import React from 'react';
import {WebView} from 'react-native-webview';
import PropTypes from 'prop-types';

export default function Repository({navigation}) {
  const repositoryUrl = navigation.getParam('repository').html_url;
  return <WebView source={{uri: repositoryUrl}} style={{flex: 1}} />;
}

Repository.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
  }).isRequired,
};

Repository.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('repository').name,
});
