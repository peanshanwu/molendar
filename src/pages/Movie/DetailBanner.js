import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useSpring } from "react-spring";
import DisplayStar from "../../components/common/DisplayStar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as Color from "../../components/layout/Color";


function DetailBanner({ movieDetail }) {
  const [clickTrailer, setClickTrailer] = useState(false);
  const [autoplay, setAutoplay] = useState("");

  function clickPlay() {
    setClickTrailer(true);
    setAutoplay("?autoplay=1");
  }

  return (
    <>
      <Mask
        style={clickTrailer ? { display: "block" } : { display: "none" }}
        onClick={() => {
          setClickTrailer(false);
        }}
      />
      <Wrapper backdrop={movieDetail.backdrop_path}>
        <Gradient>
          {clickTrailer ? (
            <Youtube
              // style={clickTrailer ? { display: "block" } : { display: "none" }}
              src={`https://www.youtube.com/embed/${movieDetail.videos.results[0].key}${autoplay}`}
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : null}
          <Container>
            <Link to={`/movie/${movieDetail.id}`}>
              <MovieName>{movieDetail.original_title}</MovieName>
            </Link>
            <StarWrapper>
              <DisplayStar starPoints={movieDetail.vote_average} />
            </StarWrapper>
            <SubInfo>Release Date | {movieDetail.release_date}</SubInfo>{" "}
            <SubInfo>Reviews | {movieDetail.vote_count}</SubInfo>
            <OverView>{movieDetail.overview}</OverView>
            <Trailer onClick={clickPlay}> Watch Trailer</Trailer>
          </Container>
        </Gradient>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  background-image: url(https://image.tmdb.org/t/p/w1280/${(props) => props.backdrop});
  /* background-size: contain; */
  background-size: cover;
  /* background-position: 100% 0; */
  background-position-x: 20vw;
  background-repeat: no-repeat;
  position: relative;
  height: 700px;
  color: white;
  background-color: ${Color.Background};
`;
const Gradient = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 160px;
  background: linear-gradient(90deg, ${Color.Background} 20%, transparent);
  color: ${Color.Content};
`;
const Container = styled.div`
  max-width: 500px;
`;
const MovieName = styled.h1`
  font-size: 52px;
  width: 100%;
`;
const StarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  font-size: 20px;
  color: ${Color.Main};
`;
const SubInfo = styled.span`
  display: inline-block;
  margin-top: 5px;
  margin-right: 20px;
  font-weight: 200;
`;
const OverView = styled.p`
  letter-spacing: 1px;
  margin-top: 30px;
  font-weight: 300;
  line-height: 24px;
`;
const Trailer = styled.button`
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: ${Color.Content};
  margin-top: 30px;
  width: 180px;
  height: 50px;
  background-color: ${Color.Sub};
  transition: ease-in 0.3s;
  cursor: pointer;
  &:hover {
    color: ${Color.Main};
    background-color: ${Color.Content};
    box-shadow: 0 0 30px rgba(0, 204, 204, 0.5);
  }
`;
const Youtube = styled.iframe`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 80vw;
  height: 80vh;
`;
const Mask = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default DetailBanner;