export default function modal(state = { isOpen: false }, action) {
  switch (action.type) {
    case "SHOW_MODAL":
      return { isOpen: true };
    case "CLOSE_MODAL":
      return { isOpen: false };
    default:
      return state;
  }
}
