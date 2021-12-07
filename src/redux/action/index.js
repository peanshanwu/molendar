export const getCurrentUserInfo = (userInfo) => {
  return {
    type: "CURRENT_USER_INFO",
    payload: userInfo,
  };
};

export const getIsLogin = (isLogin) => {
  return {
    type: "IS_LOGIN",
    payload: isLogin,
  };
}
