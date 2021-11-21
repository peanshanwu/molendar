import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Color from "../../components/layout/Color";
import { format, isAfter } from "date-fns";
import { IoMdAddCircle } from "react-icons/io";
import { IoHeartCircleSharp } from "react-icons/io5";
import { BsFillPlayCircleFill } from "react-icons/bs";
import DisplayStar from "../../components/common/DisplayStar";
import AddToCalendarIcon from "../../components/common/AddToCalendar";
import AddToCollection from "../../components/common/AddToCollection";
import { Waypoint } from "react-waypoint";
import ReactHover, { Trigger, Hover } from "react-hover";

const posterURL = "https://image.tmdb.org/t/p/w500";

const MovieInfo = ({ uid, selectDay, nowPlayingMovie, setShowScroll }) => {
  const [clickTrailer, setClickTrailer] = useState(false);
  const [autoplay, setAutoplay] = useState("");
  const [isHoverPoster, setIsHoverPoster] = useState(false);

  function clickPlay() {
    setClickTrailer(true);
    setAutoplay("?autoplay=1");
  }

  function nowIsPlaying(resultReleaseDate) {
    const formatSelectDay = format(selectDay, "yyyy-MM-dd")
      .split("-")
      .map((e) => parseInt(e, 10)); //parseInt轉成數字
    const releaseDate = resultReleaseDate
      .split("-")
      .map((e) => parseInt(e, 10));
    const nowPlaying = isAfter(
      new Date(formatSelectDay[0], formatSelectDay[1], formatSelectDay[2]),
      new Date(releaseDate[0], releaseDate[1], releaseDate[2] - 1)
    ); //因為是after，為了上映當天也符合，所以-1
    return nowPlaying;
  }

  return (
    <Wrapper>
      {nowPlayingMovie.results.map((result, i) => {
        if (nowIsPlaying(result.release_date)) {
          return (
            <Info>
              {i === 0 ? (
                <Waypoint
                  onLeave={() => {
                    setShowScroll(false);
                  }}
                  onEnter={() => {
                    setShowScroll(true);
                  }}
                />
              ) : null}
              {/* 還要再寫判斷式去拿到該 movie_id 的 trailer_key */}
              {/* 還要再寫infinite scroll */}
              {/* <Youtube
                style={
                  clickTrailer ? { display: "block" } : { display: "none" }
                }
                src={`https://www.youtube.com/embed/jU8VNQKKF-g`}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              /> */}
              {/* {i === isHoverPoster ? (
                <Trailer
                  id={result.id}
                  onMouseLeave={() => setIsHoverPoster(false)}
                  onClick={clickPlay}
                >
                  <PlayIcon />
                </Trailer>
              ) : null} */}

              <Wrap>
                <Poster
                  src={`${posterURL}${result.poster_path}`}
                  onMouseEnter={() => setIsHoverPoster(i)}
                />
                <IconWrap>
                  <AddToCalendarIcon
                    uid={uid}
                    selectDay={selectDay}
                    movieId={result.id}
                  />
                  <AddToCollection uid={uid} movieId={result.id} />
                </IconWrap>
              </Wrap>
              <LinkTo to={`/movie/${result.id}`}>
                <MovieName>{result.original_title}</MovieName>
              </LinkTo>
              <StarWrapper>
                <DisplayStar starPoints={result.vote_average} />
              </StarWrapper>
              <SubInfo>Release Date | {result.release_date}</SubInfo>
              <SubInfo>Reviews | {result.vote_count}</SubInfo>
              <OverView>{result.overview}</OverView>
            </Info>
          );
        }
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  padding-bottom: 150px;
  height: 700px;
  overflow-y: scroll;
  color: white;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
`;
const Info = styled.div`
  margin-top: 50px;
  padding-bottom: 50px;
  width: 650px;
`;
const Wrap = styled.div`
  display: flex;
  align-items: flex-end;
`;
const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1%;
`;
const Poster = styled.img`
  width: 232px;
  height: 348px;
`;
const Trailer = styled.div`
  position: absolute;
  width: 232px;
  height: 348px;
  background-color: rgba(0, 0, 0, 0.5);
`;
const PlayIcon = styled(BsFillPlayCircleFill)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
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
const LinkTo = styled(Link)`
  width: 100%;
  display: inline-block;
`;
const MovieName = styled.h2`
  margin-top: 40px;
  font-size: 30px;
`;
const StarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  font-size: 20px;
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

export default MovieInfo;
