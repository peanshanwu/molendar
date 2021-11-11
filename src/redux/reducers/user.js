const initialState = {
  isLoaded: false,
  isLoggedIn: undefined,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'user/loggedIn':
      return {
        isLoaded: true,
        isLoggedIn: true,
      };
    case 'user/loggedOut':
      return {
        isLoaded: true,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}