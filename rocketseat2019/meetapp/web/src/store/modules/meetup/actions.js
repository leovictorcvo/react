const { EMPTY_MEETUP } = require('./reducer');

export function getMeetupRequest(id) {
  return {
    type: '@meetup/GET_REQUEST',
    payload: { id },
  };
}

export function getMeetupSuccess(data) {
  return {
    type: '@meetup/GET_SUCCESS',
    payload: { data },
  };
}

export function getMeetupFailure() {
  return {
    type: '@meetup/GET_FAILURE',
  };
}

export function createMeetupRequest() {
  return {
    type: '@meetup/EDIT_REQUEST',
    payload: { data: EMPTY_MEETUP },
  };
}

export function editMeetupRequest(data) {
  return {
    type: '@meetup/EDIT_REQUEST',
    payload: { data },
  };
}

export function saveMeetupRequest(data) {
  return {
    type: '@meetup/SAVE_REQUEST',
    payload: { data },
  };
}

export function editMeetupSuccess(data) {
  return {
    type: '@meetup/EDIT_SUCCESS',
    payload: { data },
  };
}

export function editMeetupFailure(meetup) {
  return {
    type: '@meetup/EDIT_FAILURE',
    payload: { meetup },
  };
}

export function cancelMeetupRequest(id) {
  return {
    type: '@meetup/CANCEL_REQUEST',
    payload: { id },
  };
}

export function cancelMeetupEnded() {
  return {
    type: '@meetup/CANCEL_ENDED',
  };
}
