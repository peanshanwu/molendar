import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import * as Color from "../../components/layout/Color"
import background from '../../image/index-calendar-bg.png'
import Loading from '../../components/layout/Loading'
import { BsFillPeopleFill } from "react-icons/bs"
import { IoMdRemoveCircle } from "react-icons/io"
import { MdPersonAddAlt1, MdAddCircle } from "react-icons/md"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"


function Edit() {
  const history = useHistory();
  const [startDate, setStartDate] = useState(new Date());

  return (


    <Background>
      <Container>
        <Wrap1>
          <div>
            <MovieName>Movie</MovieName>
            <DatePickerStyled
            closeOnScroll={true}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            />
          </div>
          <Wrap2>
            <Cansel>cansel</Cansel>
            <Save>save</Save>
          </Wrap2>
        </Wrap1>
        <Wrap3>
          <Wrap4>
            <div><WatchWithIcon /></div>
            <ListContainer>
              <Friend>Friend Name<Remove /></Friend>
              <Friend>Friend Name<Remove /></Friend>
              <Friend>Friend Name<Remove /></Friend>
              <Friend>Friend Name<Remove /></Friend>
              <Friend>Friend Name<Remove /></Friend>
              <Friend>Friend Name<Remove /></Friend>
              <Friend>Friend Name<Remove /></Friend>
            </ListContainer>
            <div><InviteIcon /></div>
            <ListContainer>
              <Friend>Friend Name<Add /></Friend>
              <Friend>Friend Name<Add /></Friend>
              <Friend>Friend Name<Add /></Friend>
              <Friend>Friend Name<Add /></Friend>
              <Friend>Friend Name<Add /></Friend>
              <Friend>Friend Name<Add /></Friend>
              <Friend>Friend Name<Add /></Friend>
            </ListContainer>
          </Wrap4>
          <InvitingContainer>
            <NowInvitedTitle>Now Invited</NowInvitedTitle>
            <Invited>Friend Name<Remove /></Invited>
          </InvitingContainer>
        </Wrap3>
      </Container>
    </Background>
  )

}

const inputStyle = {
  width: "120px",
  height: "35px",
  borderRadius: "5px",
  fontSize: "1.05rem",
  backgroundColor: Color.Light,
  color: Color.Content,
  cursor: 'pointer',
  transition: ".3s ease",
  "&:hover": {
    color: Color.Main,
    backgroundColor: Color.Content,
    WebkitFilter: "drop-shadow(0 0 10px rgba(0, 204, 204, .5))",
    filter: "drop-shadow(0 0 10px rgba(0, 204, 204, .5))"
  }
}
const iconStyle = {
  fontSize: "1.5rem",
  color: Color.Light,
  cursor: "pointer",
  transition: ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))"
  }
}
const Background = styled.section`
  padding-left: 160px;
  height: calc(100vh - 130px);
  background-color: ${Color.Background};
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Container = styled.div`
  border-radius: 10px;
  padding: 70px 50px;
  width: 60%;
  background-color: ${Color.Content};
  color: ${Color.Main}
`
const Wrap1 = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`
const Wrap2 = styled.div`
  display: flex;
  align-items: center;
`
const Wrap3 = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
`
const Wrap4 = styled.div`
  width: 55%;
`
const MovieName = styled.h3`
  font-size: 2rem;
`
const Cansel = styled.button`
  ${inputStyle}
`
const Save = styled.button`
  ${inputStyle}
  margin-left: 20px;
  background-color: ${Color.Main};
`
const WatchWithIcon = styled(BsFillPeopleFill)`
  font-size: 1.5rem;
  color: ${Color.Light};
`
const InviteIcon = styled(MdPersonAddAlt1)`
  font-size: 1.5rem;
  color: ${Color.Light};
`
const ListContainer = styled.div`
  width: 100%;
  height: 120px;
  overflow-y: scroll;
  color: ${Color.Dark};
  margin-bottom: 1.2rem;
  &:last-child {
    margin-bottom: 0;
  }
`
const Friend = styled.div`
  position: relative;
  border-bottom: 1px solid ${Color.LLight};
  padding: 10px 20px;
`
const Remove = styled(IoMdRemoveCircle)`
  ${iconStyle};
  position: absolute;
  right: 1rem;
  color: ${Color.Main};
  cursor: pointer;
`
const Add = styled(MdAddCircle)`
  position: absolute;
  right: 1rem;
  ${iconStyle};
  color: ${Color.Main};
  cursor: pointer;
`
const InvitingContainer = styled.section`
  padding: 10px;
  margin-top: 28px;
  width: 40%;
  color: ${Color.Dark};
  background-color: #eee;
`
const NowInvitedTitle = styled.h3`
  font-size: 1.2rem;
  color: ${Color.Content}
`
const Invited = styled.div`
  position: relative;
  border-bottom: 1px solid ${Color.LLight};
  padding: 10px 0;
`
const DatePickerStyled = styled(DatePicker)`
  background-color: ${Color.LLight};
  border-radius: 5px;
  color: ${Color.Dark};
  padding: 5px 10px;
`

export default Edit