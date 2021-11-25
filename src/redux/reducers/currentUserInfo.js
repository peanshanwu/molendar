const currentUserInfo = (state = null, action) => {
  switch (action.type) {
    case "CURRENT_USER_INFO":
      return (state = action.payload);
    default:
      return state;
  }
};

export default currentUserInfo;
