import React, { useState } from 'react'
import styled from 'styled-components'
import Background from '../../image/member-bg.png'
import PersonalCalendar from './PersonalCalendar'
import style from 'react-horizontal-scrolling/dist/style'
import Profile from './Profile'
import * as Color from '../../components/layout/Color'
import { ImCheckmark, ImCross } from "react-icons/im"




function Personal() {

  const [selectDay, setSelectDay] = useState(new Date())
  
  return (
    <Wrapper>
      <Main>
        <Container>
          <Profile />
          <PersonalCalendar setSelectDay={setSelectDay} selectDay={selectDay} />
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
                <Photo /><Name>Kind</Name>
                <IconWrap>
                  <Accept /><Cansel />
                </IconWrap>
              </SubContainer>
              <SubContainer>
                <Photo /><Name>Of</Name>
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
                  <Photo /><Name>Is</Name>
                  <IconWrap>
                    <Accept /><Cansel />
                  </IconWrap>
                </SubContainer>
                <SubContainer>
                  <Photo /><Name>Awesome</Name>
                  <IconWrap>
                    <Accept /><Cansel />
                  </IconWrap>
                </SubContainer>
            </List>
          </Wrap>
        </Container>
      </Main>
    </Wrapper>
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
  outline: 1px solid red;
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