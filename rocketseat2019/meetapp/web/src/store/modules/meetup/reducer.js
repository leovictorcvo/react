import produce from 'immer';

export const EMPTY_MEETUP = {
  id: 0,
  title: '',
  description: '',
  date: new Date(),
  location: '',
  banner: {
    url: '',
    id: 0,
  },
};

const INITIAL_STATE = {
  meetup: EMPTY_MEETUP,
  loading: false,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/EDIT_SUCCESS':
      case '@meetup/GET_SUCCESS': {
        draft.meetup = action.payload.data;
        draft.loading = false;
        break;
      }
      case '@meetup/EDIT_FAILURE':
      case '@meetup/GET_FAILURE': {
        draft.meetup = EMPTY_MEETUP;
        draft.loading = false;
        break;
      }
      case '@meetup/CANCEL_ENDED': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
