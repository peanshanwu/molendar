import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Color from "../../components/layout/Color";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchUpcomingNowPlayingMovies } from "../../utils/api";
import getRandomMovie from "../../components/common/RandomMovie";

function NowPlaying() {
  const [nowPlayingMovie, setNowPlayingMovie] = useState();
  const [upComingMovie, setUpComingMovie] = useState();
  const [movieData, setMovieData] = useState();

  console.log(nowPlayingMovie);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      fetchUpcomingNowPlayingMovies().then(([upcoming, nowPlaying]) => {
        setUpComingMovie(upcoming);
        setNowPlayingMovie(nowPlaying);
      });
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, []);

  useEffect(() => {
    // RandomMovie
    const randomIndex = getRandomMovie(nowPlayingMovie?.results.length);
    setMovieData(nowPlayingMovie?.results[randomIndex]);
  }, [nowPlayingMovie]);

  console.log(movieData);

  return (
    <>
      {movieData && (
        <Container backdrop={movieData.backdrop_path}>
          <Gradient>
            <Title>Upcoming Movie</Title>
            <Link to={`/movie/${movieData.id}`}>
              <MovieName>{movieData.original_title}</MovieName>
            </Link>
          </Gradient>
        </Container>
      )}
      {/* {movieData ? (
        <Container backdrop={movieData.backdrop_path}>
          <Gradient>
            <Title>Upcoming Movie</Title>
            <Link to={`/movie/${movieData.id}`}>
              <MovieName>{movieData.original_title}</MovieName>
            </Link>
          </Gradient>
        </Container>
      ) : null} */}
    </>
  );
}

const iconStyle = {
  fontSize: "1.5rem",
  color: Color.Main,
  cursor: "pointer",
  transition: ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
  },
};
const Title = styled.h3`
  text-align: center;
  font-weight: 500;
  color: ${Color.Content};
  font-size: 1.2rem;
`;
const Container = styled.div`
  background-image: url(https://image.tmdb.org/t/p/w1280/${(props) =>
    props.backdrop});
  background-color: ${Color.Background};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 515px;
  color: ${Color.Content};
  display: flex;
  margin-bottom: 30px;
  position: relative;
`;
const Gradient = styled.div`
  padding-bottom: 37px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  padding-top: 150px;
  padding-left: 5%;
  width: 100%;
  height: 60%;
  position: relative;
  top: 40%;
  background: linear-gradient(360deg, ${Color.Background} 20%, transparent);
  color: ${Color.Content};
`;
const MovieName = styled.h3`
  font-size: 2rem;
  font-weight: 200;
  word-break: break-word;
`;

export default NowPlaying;
