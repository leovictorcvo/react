import {Alert} from 'react-native';
import {all, call, put, takeLatest} from 'redux-saga/effects';

import {signInSuccess, signFailure} from './actions';
import api from '~/services/api';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const {token, user} = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert('Falha na autenticação', 'Verifique seus dados!');
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
    });

    Alert.alert('Você foi cadastrado com sucesso.', 'Faça o login no sistema.');
  } catch (error) {
    Alert.alert('Falha na criação.', 'Verifique seus dados!');
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) {
    return;
  }

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
