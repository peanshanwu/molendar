import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import * as Color from "../../components/Color"
import calendarBackground from '../../image/index-calendar-bg.png'
import firebase from '../../utils/firebase'
import 'firebase/auth'

function Signin() {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  function onSubmit(e) {
    e.preventDefault()
    if (activeItem) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password) //回傳一個promise物件
        .then(() => {
          history.push('/') //回首頁
        })
    } else {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password) //回傳一個promise物件
      .then(() => {
        history.push('/') //回首頁
      })
    }
  }

  function ValidateEmail(email) {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true;
    }
    return false;
  }

  return (
    <Background>
      <Container>
      <Title>{activeItem ? "Sign Up" : "Login"}</Title>
        
        <form onSubmit={(e) => { onSubmit(e) }}>
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
            placeholder="Password"
          />
          <SubmitBtn type="submit">{activeItem ? "Sign Up" : "Login"}</SubmitBtn>
        </form>

        <p>or</p>
        <Google>Google</Google>
        <p onClick={() => setActiveItem(!activeItem)}> or {activeItem ? "Login" : "Sign Up"} </p>
      </Container>
    </Background>
  )

}

const inputStyle = {
  padding: '5px 15px',
  marginTop: '30px',
  width: '80%',
  height: '35px',
  '&::placeholder': {
    color: Color.LLight,
  }
}

const Background = styled.section`
  padding-left: 160px;
  height: calc(100vh - 130px);
  background-image: url(${calendarBackground});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  border-radius: 10px;
  padding: 70px 50px;
  text-align: center;
  width: 500px;
  height: 400px;
  background-color: ${Color.Content};
  color: ${Color.Main}
`
const Title = styled.h3`
  font-weight: bold;
  font-size: 24px;
`
const EmailInput = styled.input`
  ${inputStyle}
`
const PasswordInput = styled.input`
  ${inputStyle}
  margin-top: 15px;
`
const SubmitBtn = styled.button`
  ${inputStyle}
  border-color: transparent;
  margin-top: 15px;
  background-color: ${Color.Main};
  color: ${Color.Content}
`
const Google = styled.button`
  ${inputStyle}
`

export default Signin