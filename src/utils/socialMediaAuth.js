import firebase from './firebase'

const socialMediaAuth = (provider) => {
  return firebase.auth().signInWithPopup(provider)
    .then((response) => {
      return response.user;
    })
    .catch((error) => {
      return error
    })
   
}



export default socialMediaAuth