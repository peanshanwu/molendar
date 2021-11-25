export const getCurrentUserInfo = (userInfo) => {
  return {
    type: "CURRENT_USER_INFO",
    payload: userInfo,
  };
};
