import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import * as Color from "../../components/layout/Color";
import calendarBackground from "../../image/index-calendar-bg.png";
import Loading from "../../components/layout/Loading";
import firebase from "../../utils/firebase";
import "firebase/auth";
import socialMediaAuth from "../../utils/socialMediaAuth";
import { googleProvider } from "../../utils/provider";

function Signin() {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState(true); //true = Login、false = Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function socialMediaClick(provider) {
    setIsLoading(true);
    const response = await socialMediaAuth(provider);
    console.log(response);
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
        .then(() => {
          history.push("/");
          setIsLoading(false);
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
    // 要做判斷，如果login狀態，就導到首頁

    <Background>
      <Container>
        <Title>{activeItem ? "Login" : "Sign Up"}</Title>

        <form
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
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
          {isLoading ? (
            <Loading />
          ) : (
            <SubmitBtn type="submit">
              {activeItem ? "Login" : "Sign Up"}
            </SubmitBtn>
          )}
        </form>
        <p>or</p>
        <Google onClick={() => socialMediaClick(googleProvider)}>Google</Google>
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
  );
}

const inputStyle = {
  borderRadius: "5px",
  border: "1px solid #ccc",
  padding: "5px 15px",
  marginTop: "30px",
  width: "80%",
  height: "35px",
  "&::placeholder": {
    color: Color.LLight,
  },
};

const Background = styled.section`
  padding-left: 160px;
  height: calc(100vh - 130px);
  background-color: ${Color.Background};
  background-image: url(${calendarBackground});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  border-radius: 10px;
  padding: 70px 50px;
  text-align: center;
  width: 45%;
  height: 500px;
  background-color: ${Color.Content};
  color: ${Color.Main};
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
const EmailInput = styled.input`
  ${inputStyle}
`;
const PasswordInput = styled.input`
  ${inputStyle}
  margin-top: 15px;
`;
const SubmitBtn = styled.button`
  ${inputStyle}
  border-color: transparent;
  margin-top: 15px;
  background-color: ${Color.Main};
  color: ${Color.Content};
`;
const Google = styled.button`
  ${inputStyle}
`;

export default Signin;
