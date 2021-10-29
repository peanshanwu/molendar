import React, { useState } from 'react'
import styled from 'styled-components'
import Background from '../../image/member-bg.png'
import PersonalCalendar from '../../components/calendar/PersonalCalendar'
import style from 'react-horizontal-scrolling/dist/style'



function Personal() {

  const [selectDay, setSelectDay] = useState(new Date())

  return (
    <Wrapper>
      <Main>
        <Container>
          <PersonalCalendar setSelectDay={setSelectDay} selectDay={selectDay}/>
        </Container>
      </Main>
    </Wrapper>
  )

}

const Wrapper = styled.section`
  position: relative;
  width: 100%;
  background-image: url(${Background});
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

export default Personal