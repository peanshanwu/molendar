import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { useSpring } from "react-spring";
import DisplayStar from "../../components/common/DisplayStar";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import Loading from "../../components/layout/Loading";
import getRandomMovie from "../../components/common/RandomMovie";
import { fetchMovie } from "../../utils/api";

function Banner({ nowPlayingMovie }) {
  const [clickTrailer, setClickTrailer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoplay, setAutoplay] = useState("");
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

  function clickPlay() {
    setClickTrailer(true);
    setAutoplay("?autoplay=1");
    setIsLoading(true);
  }

  return (
    <Container>
      {movieData ? (
        <>
          {clickTrailer ? (
            <Mask
              onClick={() => {
                setClickTrailer(false);
              }}
            >
              <Youtube
                src={`https://www.youtube.com/embed/${trailerKey}${autoplay}`}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </Mask>
          ) : null}

          <ContentWrap>
            <div>
              <Link to={`/movie/${movieData.id}`}>
                <MovieName>{movieData.original_title}</MovieName>
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
          <BackdropWrap>
            <Backdrop
              src={`https://image.tmdb.org/t/p/w1280/${movieData.backdrop_path}`}
            />
          </BackdropWrap>
        </>
      ) : null}
    </Container>
  );
  // return (
  //   <>
  //     <Mask
  //       style={clickTrailer ? { display: "block" } : { display: "none" }}
  //       onClick={() => {
  //         setClickTrailer(false);
  //       }}
  //     />
  //     {movieData ? (
  //       <Wrapper backdrop={movieData.backdrop_path}>
  //         <Gradient>
  //           {clickTrailer ? (
  //             <Youtube
  //               // style={clickTrailer ? { display: "block" } : { display: "none" }}
  //               src={`https://www.youtube.com/embed/jU8VNQKKF-g`}
  //               title="YouTube video player"
  //               frameBorder="0"
  //               allow="autoplay; encrypted-media"
  //               allowFullScreen
  //             />
  //           ) : null}

  //           <Container>
  //             <Link to={`/movie/${movieData.id}`}>
  //               <MovieName>{movieData.original_title}</MovieName>
  //             </Link>
  //             <StarWrapper>
  //               <DisplayStar starPoints={movieData.vote_average} />
  //             </StarWrapper>
  //             <SubInfo>Release Date | {movieData.release_date}</SubInfo>{" "}
  //             <SubInfo>Reviews | {movieData.vote_count}</SubInfo>
  //             <OverView>{movieData.overview}</OverView>
  //             <Trailer onClick={clickPlay}> Watch Trailer</Trailer>
  //           </Container>
  //         </Gradient>
  //       </Wrapper>
  //     ) : null}
  //   </>
  // );
}
const Container = styled.section`
  color: ${Color.Content};
  position: relative;
  width: 100%;
`;
const ContentWrap = styled.section`
  position: absolute;
  z-index: 1;
  padding: 8rem;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const BackdropWrap = styled.div`
  width: 100%;
  background-color: ${Color.Background};
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
  }
`;
const Backdrop = styled.img`
  width: 100%;
  height: 700px;
  object-fit: contain;
  object-position: right top;
`;

// const Wrapper = styled.section`
//   background-image: url(https://image.tmdb.org/t/p/w1280/${(props) =>
//     props.backdrop});
//   /* background-position: top center; */
//   background-size: cover;
//   /* background-size: cover; */
//   background-position-x: 20vw;
//   background-repeat: no-repeat;
//   position: relative;
//   height: 700px;
//   color: white;
//   background-color: ${Color.Background};
// `;
// const Gradient = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   padding-left: 220px;
//   background: linear-gradient(90deg, ${Color.Background} 20%, transparent);
//   color: ${Color.Content};
// `;
// const Container = styled.div`
//   max-width: 500px;
// `;
const MovieName = styled.h1`
  font-size: 2.5rem;
  width: 100%;
`;
const StarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 30px;
  font-size: 20px;
  color: ${Color.Main};
`;
// const StarIcon = styled(FaStar)`
//   margin-right: 5px;
// `;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
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
`;
const Youtube = styled.iframe`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 70vw;
  height: 70vh;
`;
const Mask = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.8);
`;

export default Banner;
