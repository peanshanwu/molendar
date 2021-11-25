import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as Color from "../../components/layout/Color";
import Loading from "../../components/layout/Loading";
import { Main } from "../../components/layout/Container";
import MovieInfo from "./MovieInfo";
import Banner from "../../components/common/Banner";
import Carousel from "./Carousel";
import Calendar from "../../components/calendar/Calendar";
import calendarBackground from "../../image/index-calendar-bg.png";
import { fetchUpcomingNowPlayingMovies } from "../../utils/api";
import ScrollDown from "./ScrollDown";
import * as BreakPoint from "../../components/layout/BreakPoints"
import getRandomMovie from "../../components/common/RandomMovie";
import { fetchMovie } from "../../utils/api";

function Index({ uid }) {
  const [selectDay, setSelectDay] = useState(new Date());
  const [upcomingMovie, setUpComingMovie] = useState();
  const [nowPlayingMovie, setNowPlayingMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(true);
  const [movieData, setMovieData] = useState();
  const [trailerKey, setTsrailerKey] = useState();

  // RandomMovie
  useEffect(() => {
    const randomIndex = getRandomMovie(nowPlayingMovie?.results.length);
    setMovieData(nowPlayingMovie?.results[randomIndex]);
  }, [nowPlayingMovie]);

  // fetchTrailer
  useEffect(() => {
    let isMount = true;
    if (movieData) {
      if (isMount) {
        fetchMovie(movieData.id).then((res) => {
          setTsrailerKey(res.videos.results[0]?.key);
        });
      }
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, [movieData]);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      fetchUpcomingNowPlayingMovies().then(([upcoming, nowPlaying]) => {
        setNowPlayingMovie(nowPlaying);
        setUpComingMovie(upcoming);
        setIsLoading(false);
      });
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, []);

  return (
    <Main>
      {isLoading
        ? <Loading />
        : <>
          <Banner movieData={movieData} trailerKey={trailerKey}/>
            <Carousel upComingMovie={upcomingMovie} />
            <CalendarBackground>
              <ScrollDownWrap showScroll={showScroll}>
                <ScrollDown />
              </ScrollDownWrap>
                <DateWrap>
                  <Title>Now Playing Movies</Title>
                  <Calendar setSelectDay={setSelectDay} selectDay={selectDay} />
                </DateWrap>
                <MovieInfo
                  selectDay={selectDay}
                  nowPlayingMovie={nowPlayingMovie}
                  uid={uid}
                  setShowScroll={setShowScroll}
                ></MovieInfo>
            </CalendarBackground>
          </>
      }
    </Main>
  )
}

const CalendarBackground = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  background-color: ${Color.Background};
  background-image: url(${calendarBackground});
  background-repeat: no-repeat;
  background-size: cover;
  @media (max-width: ${BreakPoint.lg}) {
    height: auto
  }
`;
const DateWrap = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  width: 30rem;
  height: 600px;
  border-radius: 0 0 0 10%;
  background-color: #fff;
  padding: 50px;
  @media (max-width: 1000px) {
    position: static;
    height: 450px;
    border-radius: 0 0 0 0;
    width: 100%;
    padding: 35px 8rem;
  }
  @media (max-width: ${BreakPoint.sm}) {
    position: static;
    height: auto;
    padding: 50px 2rem;
  }
`;
const Title = styled.h3`
  position: absolute;
  color: ${Color.Content};
  transform: rotate(90deg);
  transform-origin: 0 0;
  /* top: 0; */
  left: 10px;
  font-size: 2.5rem;
  font-weight: 100;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const ScrollDownWrap = styled.div`
  opacity: ${(props) => (props.showScroll ? "1" : "0")};
  position: absolute;
  top: 55px;
  left: 2rem;
  transition: ease-in 0.3s;
`;
export default Index;
