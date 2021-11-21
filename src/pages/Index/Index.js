import { useEffect, useState } from "react";
import styled from "styled-components";
import * as Color from "../../components/layout/Color";
import Loading from "../../components/layout/Loading";
import { Main, MaxWidthContainer } from "../../components/layout/Container";
import MovieInfo from "./MovieInfo";
import Banner from "./Banner";
import Carousel from "./Carousel";
import Calendar from "../../components/calendar/Calendar";
import calendarBackground from "../../image/index-calendar-bg.png";
import { fetchUpcomingNowPlayingMovies } from "../../utils/api";
import ScrollDown from "./ScrollDown";

function Index({ uid }) {
  const [selectDay, setSelectDay] = useState(new Date());
  const [upcomingMovie, setUpComingMovie] = useState();
  const [nowPlayingMovie, setNowPlayingMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      fetchUpcomingNowPlayingMovies().then(([upcoming, nowPlaying]) => {
        console.log("upComingMovie", upcoming);
        console.log("nowPlayingMovie", nowPlaying);
        setUpComingMovie(upcoming);
        setNowPlayingMovie(nowPlaying);
        setIsLoading(false);
      });
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, []);

  return isLoading ? (
    <LoadingWrap>
      <Loading />
    </LoadingWrap>
  ) : (
    <Main>
      <Banner nowPlayingMovie={nowPlayingMovie} />
      <Carousel upComingMovie={upcomingMovie} />
      <CalendarBackground>
        <ScrollDownWrap showScroll={showScroll}>
          <ScrollDown />
        </ScrollDownWrap>
        <MaxWidthContainer>
          <MovieInfo
            selectDay={selectDay}
            nowPlayingMovie={nowPlayingMovie}
            uid={uid}
            setShowScroll={setShowScroll}
          ></MovieInfo>
          <DatePicker>
            <Title>Now Playing Movies</Title>
            <Calendar setSelectDay={setSelectDay} selectDay={selectDay} />
          </DatePicker>
        </MaxWidthContainer>
      </CalendarBackground>
    </Main>
  );
}

const LoadingWrap = styled.main`
  width: 100%;
  height: 100%;
  background-color: ${Color.Background};
`;

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
`;
const DatePicker = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30rem;
  height: 600px;
  border-radius: 0 0 0 10%;
  /* border-radius: 0 0 10% 10%; */
  background-color: #fff;
  padding: 50px;
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
`;
const ScrollDownWrap = styled.div`
  opacity: ${(props) => (props.showScroll ? "1" : "0")};
  position: absolute;
  top: 55px;
  left: 2rem;
  transition: ease-in 0.3s;
`;
export default Index;
