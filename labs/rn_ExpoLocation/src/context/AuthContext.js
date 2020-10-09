import { AsyncStorage } from 'react-native';

import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case '@auth/clear_error_message':
      return { ...state, errorMessage: '' };
    case '@auth/add_error':
      return { ...state, errorMessage: action.payload };
    case '@auth/signin':
      return { token: action.payload, errorMessage: '' };
    case '@auth/signout':
      return { token: null, errorMessage: '' };
    default:
      return state;
  }
};

const clearErrorMessage = dispatch => () =>
  dispatch({ type: '@auth/clear_error_message' });

const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({
      type: '@auth/signin',
      payload: token
    });
    navigate('TrackList');
  } else {
    navigate('loginFlow');
  }
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const { data } = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', data.token);
    dispatch({
      type: '@auth/signin',
      payload: data.token
    });
    navigate('TrackList');
  } catch (error) {
    dispatch({
      type: '@auth/add_error',
      payload: 'Something went wrong with sign up'
    });
  }
};

const signin = dispatch => async ({ email, password }) => {
  try {
    const { data } = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', data.token);
    dispatch({
      type: '@auth/signin',
      payload: data.token
    });
    navigate('TrackList');
  } catch (error) {
    dispatch({
      type: '@auth/add_error',
      payload: 'Something went wrong with sign in'
    });
  }
};

const signout = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: '@auth/signout' });
  navigate('loginFlow');
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { clearErrorMessage, tryLocalSignin, signup, signin, signout },
  { token: null, errorMessage: '' }
);
