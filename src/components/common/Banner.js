import React, { useState } from "react";
import styled from "styled-components";
import DisplayStar from "./DisplayStar";
import { Link } from "react-router-dom";
import * as Color from "../layout/Color";
import { FaRegPlayCircle } from "react-icons/fa";
import * as Title from "../layout/Title";
import * as BreakPoint from "../layout/BreakPoints"

function Banner({ movieData, trailerKey }) {
  const [clickTrailer, setClickTrailer] = useState(false);
  const [autoplay, setAutoplay] = useState("");
  let youtubeURL = `https://www.youtube.com/embed/`;

  if ("videos" in movieData && movieData.videos.results.length > 0) {
    youtubeURL = `https://www.youtube.com/embed/${movieData.videos.results[0].key}${autoplay}`
  } else {
    youtubeURL = `https://www.youtube.com/embed/${trailerKey}${autoplay}`
  }

  function clickPlay() {
    setClickTrailer(true);
    setAutoplay("?autoplay=1");
  }

  return (
    <Container>
      {movieData ? (
        <>
          {clickTrailer ? (
            <Mask onClick={() => { setClickTrailer(false) }}>
              <Youtube
                src={youtubeURL}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </Mask>
          ) : null}

          <BackdropWrap>
            <Backdrop
              src={`https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path}`}
            />
            <PlayIcon onClick={clickPlay} />
          </BackdropWrap>
          <ContentWrap>
            <div>
              <Link to={`/movie/${movieData.id}`}>
                <Title.Main>{movieData.original_title}</Title.Main>
              </Link>
              <StarWrapper>
                <DisplayStar starPoints={movieData.vote_average} />
              </StarWrapper>
              <SubInfo>Release Date | {movieData.release_date}</SubInfo>{" "}
              <SubInfo>Reviews | {movieData.vote_count}</SubInfo>
              <OverView>{movieData.overview}</OverView>
              <Trailer onClick={clickPlay}> Watch Trailer</Trailer>
            </div>
          </ContentWrap>
          
        </>
      ) : null}
    </Container>
  );
}
const iconStyle = {
  fontSize: "1.5rem",
  color: Color.Light,
  cursor: "pointer",
  transition: ".3s ease",
  WebkitFilter: "drop-shadow(0 0 5px rgba(0, 0, 0, 1))",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, .5))",
  },
};
const Container = styled.section`
  color: ${Color.Content};
  position: relative;
  width: 100%;
`;
const ContentWrap = styled.section`
  position: absolute;
  z-index: 1;
  padding: 8rem;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  @media (max-width: ${BreakPoint.lg}) {
    padding: 30px 8rem;
    position: relative;
    width: 100%;
  }
  @media (max-width: ${BreakPoint.md}) {
    padding: 0 2rem;
    position: relative;
    width: 100%;
    margin-bottom: 80px;
  }
`;
const BackdropWrap = styled.div`
  width: 100%;
  background-color: ${Color.Background};
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 30%;
    background: linear-gradient(90deg, ${Color.Background} 50%, transparent);
    @media (max-width: 1450px) {
      background: linear-gradient(90deg, ${Color.Background} 30%, transparent);
    }
    @media (max-width: ${BreakPoint.lg}) {
      top: 50%;
      right: 0;
      background: linear-gradient(360deg, ${Color.Background} 10%, transparent);
    }
  }
`;
const PlayIcon = styled(FaRegPlayCircle)`
display: none;
  ${iconStyle};
  color: ${Color.Content};
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10%;
  height: 10%;
  @media (max-width: ${BreakPoint.lg}) {
    display: block;
  }
  @media (max-width: ${BreakPoint.sm}) {
    width: 20%;
  height: 20%;
  }

`
const Backdrop = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: right top;
  max-height: 700px;
`;
const StarWrapper = styled.div`
  display: flex;
  align-items: center;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  @media (max-width: ${BreakPoint.sm}) {
    display: none;
  }
`;
const Trailer = styled.button`
  border: none;
  font-size: 1.2rem;
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
  @media (max-width: ${BreakPoint.lg}) {
      display: none;
  }
`;
const Youtube = styled.iframe`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 70vw;
  height: 70vh;
  @media (max-width: ${BreakPoint.lg}) {
    height: 50vh;
  }
  @media (max-width: ${BreakPoint.md}) {
    width: 100vw;
    height: 50vh;
  }
`;
const Mask = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default Banner;
