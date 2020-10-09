export default function theme(state = 'light', action) {
  return action.type === 'SET_THEME' ? action.theme : state;
}
