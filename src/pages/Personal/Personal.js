import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Background from '../../image/member-bg.png'
import PersonalCalendar from './PersonalCalendar'
import style from 'react-horizontal-scrolling/dist/style'
import Profile from './Profile'
import * as Color from '../../components/layout/Color'
import { ImCheckmark, ImCross } from "react-icons/im"
import firebase from '../../utils/firebase'
import { set } from 'date-fns'


function Personal({ uid, currentUserInfo, userList, myCalendarMovies, calendarMoviesInfo }) {


  const db = firebase.firestore();
  const userRef = db.collection('users');
  const [selectDay, setSelectDay] = useState(new Date()) 
  // const [userInfo, setUserInfo] = useState(null)
  
  // useEffect(() => {

  //   uid && (
  //     userRef.doc(uid).get()
  //     .then((doc) => {
  //       console.log(`doc, `, doc.data());
  //       return doc.data()
  //     })
  //     .then((data) => { setUserInfo(data) })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //   )

  // }, [uid])  // 原本寫空陣列～問谷哥




  // useEffect(() => {
  //   setUid(firebase.auth().currentUser.uid)    
  // }, [])
  
  // console.log(firebase.auth().currentUser.uid);
  // function a(uid) {
  //   userRef.doc(uid).get()
  //   .then((doc) => {
  //     console.log(`doc, `, doc.data());
  //     return doc.data()
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  // }
  // set(a(uid))


  // userRef.doc(uid).get()
  //   .then((doc) => {
  //     console.log(`doc, `, doc.data());
  //     return doc.data()
  //   })
  //   .then((data) => { set(data) })

  // function b() {
  //   return (userRef.doc(uid).get()
  //   .then((doc) => {
  //     console.log(`doc, `, doc.data());
  //     return doc.data()
  //   }))
  // }

  // b().then
  
  return (
    <>
      { currentUserInfo && (
        <Wrapper>
          <Main>
            <Container>
              <Profile currentUserInfo={currentUserInfo} />
              <PersonalCalendar
                setSelectDay={setSelectDay}
                selectDay={selectDay}
                uid={uid}
                userList={userList}
                myCalendarMovies={myCalendarMovies}
                calendarMoviesInfo={calendarMoviesInfo}
              />
              <Wrap>
                <List>
                  <Title>Friend List</Title>
                  <SubContainer><Photo /><Name>Shan</Name></SubContainer>
                  <SubContainer><Photo /><Name>Shan</Name></SubContainer>
                  <SubContainer><Photo /><Name>Shan</Name></SubContainer>
                  <SubContainer><Photo /><Name>Shan</Name></SubContainer>
                  <SubContainer><Photo /><Name>Shan</Name></SubContainer>
                </List>
                <List>
                  <Title>Friend Invitation</Title>
                  <SubContainer>
                    <Photo /><Name>Shan</Name>
                    <IconWrap>
                      <Accept /><Cansel />
                    </IconWrap>
                  </SubContainer>
                  <SubContainer>
                    <Photo /><Name>Lit</Name>
                    <IconWrap>
                      <Accept /><Cansel />
                    </IconWrap>
                  </SubContainer>
                  <SubContainer>
                    <Photo /><Name>Lit</Name>
                    <IconWrap>
                      <Accept /><Cansel />
                    </IconWrap>
                  </SubContainer>
                  <SubContainer>
                    <Photo /><Name>Lit</Name>
                    <IconWrap>
                      <Accept /><Cansel />
                    </IconWrap>
                  </SubContainer>
                </List>
                <List>
                  <Title>Movie Invitation</Title>
                    <SubContainer>
                      <Photo /><Name>Shan</Name>
                      <IconWrap>
                        <Accept /><Cansel />
                      </IconWrap>
                    </SubContainer>
                    <SubContainer>
                      <Photo /><Name>Hola</Name>
                      <IconWrap>
                        <Accept /><Cansel />
                      </IconWrap>
                    </SubContainer>
                    <SubContainer>
                      <Photo /><Name>Yo</Name>
                      <IconWrap>
                        <Accept /><Cansel />
                      </IconWrap>
                    </SubContainer>
                </List>
              </Wrap>
            </Container>
          </Main>
        </Wrapper>
      )}
    </>
  )

}
const iconStyle = {
  fontSize: "1.5rem",
  color: Color.Main,
  cursor: "pointer",
  "transition": ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))"
  }
}
const Wrapper = styled.section`
  padding: 40px 0;
  position: relative;
  width: 100%;
  background-image: url(${Background});
  background-color: ${Color.Background};
`
const Main = styled.main`
  width: calc(100% - 80px);
  padding-left: 80px;
  /* position: absolute;
  left: 80px; */
`
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${Color.Content};
`
const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
`
const List = styled.div`
  width: 32%;
  outline: 1px solid gray;
  margin-top: 30px;
  padding: 20px 40px;
  overflow-y: scroll;
  height: 300px;
`
const SubContainer = styled.div`
  color: ${Color.Content};
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
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
const IconWrap = styled.div`
  position: absolute;
  right: 2px;
`
const Accept = styled(ImCheckmark)`
  ${iconStyle}
  margin-right: 20px;
`
const Cansel = styled(ImCross)`
  ${iconStyle}
  font-size: 1.25rem;
`

export default Personal