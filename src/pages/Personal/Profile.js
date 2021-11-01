import React, { useState } from 'react'
import styled from 'styled-components'
import  * as Color from '../../components/layout/Color'
import firebase from '../../utils/firebase'
import 'firebase/auth';
import 'firebase/firestore';




function Profile() {

  // const db = firebase.firestore();
  // const uid = firebase.auth().currentUser.uid;
  // // const uid = "enQ7J93xbPerJztmM9TYo3ul89t2";
  // const userRef = db.collection('users');

  // function getPhotoURL(uid) {
  //   userRef.doc(uid).get()
  //   .then((doc) => {
  //     console.log(`doc, `, doc.data());
  //     console.log(`doc, `, doc.data().photoURL);
  //     return doc.data().photoURL
  //     })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }


  return (
    <Wrapper>
      <Photo className="Photo" />
      <Name className="Photo">Shan</Name>
    </Wrapper>
  )

}

const Wrapper = styled.div`
  color: ${Color.Content};
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`
const Photo = styled.div`
  /* background-color: #fff; */
  background-image: url(https://lh3.googleusercontent.com/a/AATXAJwKXgG-Z-dC9Nzz_b5nw5M_HO57C9p4j61PqKfr=s96-c);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`
const Name = styled.p`
  margin-left: 10px;
  font-size: 20px;
`

export default Profile