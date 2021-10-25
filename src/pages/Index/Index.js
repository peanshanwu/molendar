import { useState } from 'react'
import styled from 'styled-components'
import MovieInfo from './MovieInfo'
import Banner from './Banner'
import Carousel from './Carousel'
import Calendar from '../../calendar-components/Calendar'
import calendarBackground from '../../image/index-calendar-bg.png'


function Index() {

  const [selectDay, setSelectDay] = useState(new Date())

  return (
    <div>
      <Banner />
      <Carousel />
      <CalendarBackground>
        <MovieInfo selectDay={selectDay} ></MovieInfo>
        <DatePicker>
          <Calendar setSelectDay={setSelectDay} selectDay={selectDay} />
        </DatePicker>
      </CalendarBackground>
    </div>
  )
}


const CalendarBackground = styled.div`
  position: relative;
  width: 100%;
  /* height: 0;
  padding-top: 64.5%; */
  height: 700px;
  background-color: #1c2126;
  background-image: url(${calendarBackground});
  background-repeat: no-repeat;
  background-size: cover;
`
const DatePicker = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 25rem;
  height: 450px;
  border-radius: 0 0 0 20%;
  background-color: #fff;
  padding: 50px;
`

export default Index