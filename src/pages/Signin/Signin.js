import React, { useState } from "react";
import styled from "styled-components";
import {useHistory,} from "react-router-dom";
import * as Color from "../../components/layout/Color";
import calendarBackground from "../../image/index-calendar-bg.png";
import { Main } from "../../components/layout/Container";
import Loading from "../../components/layout/Loading";
import firebase from "../../utils/firebase";
import "firebase/auth";
import socialMediaAuth from "../../utils/socialMediaAuth";
import { googleProvider } from "../../utils/provider";
import { AiFillGoogleCircle } from "react-icons/ai"
import * as BreakPoint from "../../components/layout/BreakPoints"

function Signin({ uid }) {
  //如果登入過，導到個人頁
  const history = useHistory();
  if (uid) {
    history.push("/personal");
  }

  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [activeItem, setActiveItem] = useState(true); //true = Login、false = Sign Up
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function saveUserToFirebase(user) {
    let users = [];
    userRef.get().then((snapshot) => {
      snapshot.forEach((user) => {
        users.push(user.data().uid);
      });
      const hasUser = users.includes(user.uid);
      if (!hasUser) {
        userRef
          .doc(user.uid)
          .set({
            uid: user.uid,
            email: user.email,
            name: user.displayName || "user",
            photoURL:
              user.photoURL ||
              "https://lh3.googleusercontent.com/a/AATXAJwKXgG-Z-dC9Nzz_b5nw5M_HO57C9p4j61PqKfr=s96-c",
            friend_list: [],
            user_collection: [],
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      }
    });
  }

  async function socialMediaClick(provider) {
    setIsLoading(true);
    const response = await socialMediaAuth(provider);
    saveUserToFirebase(response);
    setIsLoading(false);
    history.push("/");
  }

  function onSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    if (activeItem) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password) //回傳一個promise物件
        .then(() => {
          history.push("/");
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error.code);
          switch (error.code) {
            case "auth/user-not-found":
              setErrorMessage("User not found");
              break;
            case "auth/invalid-email":
              setErrorMessage("Invalid email");
              break;
            case "auth/wrong-password":
              setErrorMessage("Wrong password");
              break;
            default:
          }
          setIsLoading(false);
        });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password) //回傳一個promise物件
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);

          // 創建一個新user到firebase firestore
          userRef.doc(user.uid).set({
            uid: user.uid,
            email: user.email,
            name: displayName || "user",
            photoURL:
              user.photoURL ||
              "https://firebasestorage.googleapis.com/v0/b/molendar-shan.appspot.com/o/default-profile-photo.png?alt=media&token=1ffd5707-231b-484e-9a3b-1d1105eb4141",
            friend_list: [],
            user_collection: [],
          });
          setIsLoading(false);
          history.push("/");
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              setErrorMessage("Email already exists");
              break;
            case "auth/invalid-email":
              setErrorMessage("Invalid email");
              break;
            case "auth/weak-password":
              setErrorMessage("Weak password, at least six characters");
              break;
            default:
          }
          setIsLoading(false);
        });
    }
  }

  return (
    <>
      {uid === undefined ? <Loading /> :
        <>
          {isLoading
            ? <Loading />
            :
            <Main>
              <Background>
                <Container>
                  <Title>{activeItem ? "Login" : "Sign Up"}</Title>
                  <form
                    onSubmit={(e) => {
                      onSubmit(e);
                    }}
                  >
                    {activeItem ? (
                      <></>
                    ) : (
                      <NameInput
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Name"
                      />
                    )}
                    <EmailInput
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <PasswordInput
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password (at least six characters)"
                    />
                    <SubmitBtn type="submit">
                      {activeItem ? "Login" : "Sign Up"}
                    </SubmitBtn>
                  </form>
                  <p>or</p>
                  <GoogleWrap>
                    <GoogleIcon />
                    <Google onClick={() => socialMediaClick(googleProvider)}>Google</Google>
                  </GoogleWrap>
                  <p
                    onClick={() => {
                      setErrorMessage("");
                      setActiveItem(!activeItem);
                    }}
                  >
                    or {activeItem ? "Sign Up" : "Login"}
                  </p>
                  {errorMessage && <Error>{errorMessage}</Error>}
                </Container>
              </Background>
            </Main>
          }
        </>
      }
    </>
  );
}

const inputStyle = {
  fontSize: "1.1rem",
  borderRadius: "5px",
  border: "1px solid #ccc",
  padding: "5px 15px",
  marginBottom: "15px",
  width: "80%",
  height: "35px",
  "&::placeholder": {
    color: Color.LLight,
  },
};
const Background = styled.section`
  min-height: calc(100vh - 130px);
  background-color: ${Color.Background};
  background-image: url(${calendarBackground});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  margin: 80px 0;
  border-radius: 10px;
  padding: 70px 50px;
  text-align: center;
  width: 50%;
  height: 500px;
  background-color: ${Color.Content};
  color: ${Color.Main};
  @media (max-width: ${BreakPoint.lg}) {
    width: 80%;
  }
  @media (max-width: ${BreakPoint.sm}) {
    width: 100%;
    padding: 70px 20px;
  }
`;
const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
`;
const Error = styled.p`
  margin-top: 30px;
  color: red;
  font-weight: 300;
  font-size: 14px;
`;
const NameInput = styled.input`
  margin-top: 30px;
  ${inputStyle}
`;
const EmailInput = styled.input`
  ${inputStyle}
`;
const PasswordInput = styled.input`
  ${inputStyle}
`;
const SubmitBtn = styled.button`
  ${inputStyle}
  border-color: transparent;
  margin-top: 15px;
  background-color: ${Color.Main};
  color: ${Color.Content};
`;
const GoogleWrap = styled.div`
  margin: 10px auto 20px;
  ${inputStyle};
  display: flex;
  justify-content: center;
  align-items: center;
  & button {
    font-size: 1.1rem;
    margin-left: 10px;
  }
`
const Google = styled.button`
  border: 0;
`;
const GoogleIcon = styled(AiFillGoogleCircle)`
  font-size: 1.6rem;
`

export default Signin;
