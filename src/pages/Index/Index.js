import { useEffect, useState } from 'react'
import styled from 'styled-components'
import * as Color from '../../components/layout/Color'
import Loading from '../../components/layout/Loading'
import MovieInfo from './MovieInfo'
import Banner from './Banner'
import Carousel from './Carousel'
import Calendar from '../../components/calendar/Calendar'
import calendarBackground from '../../image/index-calendar-bg.png'
import { fetchMovies, fetchMovie } from '../../utils/api'
import { tr } from 'date-fns/locale'


function Index() {

  const [selectDay, setSelectDay] = useState(new Date())
  const [upcomingMovie, setUpComingMovie] = useState()
  const [nowPlayingMovie, setNowPlayingMovie] = useState()
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    // fetchMovie('upcoming').then((upcomingMovies) => {
    //   setUpComingMovie(upcomingMovies)
    //   setIsLoading(false)
    // })
    fetchMovies().then(([upcoming, nowPlaying]) => {
      console.log('upComingMovie', upcoming);
      console.log('nowPlayingMovie', nowPlaying);
      setUpComingMovie(upcoming);
      setNowPlayingMovie(nowPlaying);
      setIsLoading(false)
    })

    // 要記得清除fetchAPI
  }, [])

  return (isLoading ? <Main><Loading /></Main> :
    <div>
      <Banner nowPlayingMovie={ nowPlayingMovie }/>
      <Carousel upComingMovie={ upcomingMovie }/>
      <CalendarBackground>
        <MovieInfo selectDay={selectDay} ></MovieInfo>
        <DatePicker>
          <Calendar setSelectDay={setSelectDay} selectDay={selectDay} />
        </DatePicker>
      </CalendarBackground>
    </div>
  )
}

const Main = styled.main`
  width: 100%;
  height: 100%;
  background-color: ${Color.Background};
`
const CalendarBackground = styled.div`
  position: relative;
  width: 100%;
  /* height: 0;
  padding-top: 64.5%; */
  height: 700px;
  background-color: ${Color.Background};
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