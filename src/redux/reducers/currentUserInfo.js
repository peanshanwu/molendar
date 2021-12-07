const currentUserInfo = (state = null, action) => {
  switch (action.type) {
    case "CURRENT_USER_INFO":
      return action.payload;
    default:
      return state;
  }
};

export default currentUserInfo;
