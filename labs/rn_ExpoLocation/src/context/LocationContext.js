import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case '@location/add_current':
      return { ...state, currentLocation: action.payload };
    case '@location/add_location':
      return { ...state, locations: [...state.locations, action.payload] };
    case '@location/start_recording':
      return { ...state, recording: true, locations: [] };
    case '@location/stop_recording':
      return { ...state, recording: false };
    case '@location/change_name':
      return { ...state, name: action.payload };
    case '@location/reset':
      return { ...state, name: '', locations: [] };
    default:
      return state;
  }
};

const startRecording = dispatch => () => {
  dispatch({ type: '@location/start_recording' });
};

const stopRecording = dispatch => () => {
  dispatch({ type: '@location/stop_recording' });
};

const addLocation = dispatch => (location, recording) => {
  dispatch({
    type: '@location/add_current',
    payload: location
  });
  if (recording) {
    dispatch({
      type: '@location/add_location',
      payload: location
    });
  }
};

const changeName = dispatch => name => {
  dispatch({ type: '@location/change_name', payload: name });
};

const reset = dispatch => () => {
  dispatch({ type: '@location/reset' });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  { name: '', recording: false, locations: [], currentLocation: null }
);
