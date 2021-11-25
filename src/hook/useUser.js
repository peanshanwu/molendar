import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as firebase from '../utils/firebase';

function useUser() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    firebase.subscribeToUser((user) => {
      if (user) {
        dispatch({
          type: 'user/loggedIn',
        });
      } else {
        dispatch({
          type: 'user/loggedOut',
        });
      }
    });
  }, [dispatch]);

  return user;
}

export default useUser;
