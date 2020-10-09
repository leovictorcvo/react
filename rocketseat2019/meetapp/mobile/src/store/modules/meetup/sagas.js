import {Alert} from 'react-native';
import {all, takeLatest, call, put} from 'redux-saga/effects';
import {
  format,
  parseISO,
  setHours,
  getHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import {utcToZonedTime} from 'date-fns-tz';

import api from '~/services/api';

import {
  getMeetupSuccess,
  getMeetupFailure,
  editMeetupFailure,
  editMeetupSuccess,
  cancelMeetupEnded,
} from './actions';

function getNextHour() {
  return setMilliseconds(
    setSeconds(
      setMinutes(setHours(new Date(), getHours(new Date()) + 1), 0),
      0
    ),
    0
  );
}

function addFormattedDate(meetup) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let date = meetup.date instanceof Date ? meetup.date : parseISO(meetup.date);

  // if a new meetup, set the date to next complete hour
  date = meetup.id === 0 ? getNextHour() : date;

  const localDate = utcToZonedTime(date, timezone);
  const formattedDate = format(localDate, "dd 'de' MMMM', às 'HH'h'", {
    locale: pt,
  });

  return {...meetup, date, formattedDate};
}

export function* getMeetup({payload}) {
  try {
    const {id} = payload;

    const {data} = yield call(api.get, `/meetup/${id}`);

    yield put(getMeetupSuccess(addFormattedDate(data)));
  } catch (error) {
    yield put(getMeetupFailure());
    Alert.alert('Meetup', 'Erro ao consultar o meetup');
  }
}

export function* editMeetup({payload}) {
  try {
    const {data} = payload;
    yield put(getMeetupSuccess(addFormattedDate(data)));
  } catch (error) {
    yield put(editMeetupFailure());
    Alert.alert('Meetup', 'Erro ao editar o meetup');
  }
}

export function* saveMeetup({payload}) {
  try {
    const {id, ...data} = payload.data;
    const method = id === '0' ? api.post : api.put;
    const url = id === '0' ? '/meetup' : `/meetup/${id}`;

    const response = yield call(method, url, data);

    Alert.alert('Meetup', 'Meetup salvo com sucesso!');
    yield put(editMeetupSuccess(addFormattedDate(response.data)));
  } catch (error) {
    yield put(getMeetupFailure());
    Alert.alert('Meetup', 'Erro ao salvar o meetup');
  }
}

export function* cancelMeetup({payload}) {
  try {
    const {id} = payload;
    yield call(api.delete, `/meetup/${id}`);

    Alert.alert('Meetup', 'Meetup cancelado com sucesso!');
    yield put(cancelMeetupEnded());
  } catch (error) {
    yield put(cancelMeetupEnded());
    Alert.alert('Meetup', 'Erro ao cancelar o meetup');
  }
}

export default all([
  takeLatest('@meetup/GET_REQUEST', getMeetup),
  takeLatest('@meetup/EDIT_REQUEST', editMeetup),
  takeLatest('@meetup/SAVE_REQUEST', saveMeetup),
  takeLatest('@meetup/CANCEL_REQUEST', cancelMeetup),
]);
