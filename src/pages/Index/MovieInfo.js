import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format, isAfter } from "date-fns";
import DisplayStar from "../../components/common/DisplayStar";
import AddToCalendarIcon from "../../components/common/AddToCalendar";
import AddToCollection from "../../components/common/AddToCollection";
import { Waypoint } from "react-waypoint";
import * as Title from "../../components/layout/Title"
import * as BreakPoint from "../../components/layout/BreakPoints"
import { v4 as uuidv4 } from 'uuid';
const posterURL = "https://image.tmdb.org/t/p/w500";

const MovieInfo = ({ uid, selectDay, nowPlayingMovie, setShowScroll }) => {

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
      <Title.Sub>Now Playing Movie</Title.Sub>
      {nowPlayingMovie.results.map((result, i) => {
        if (nowIsPlaying(result.release_date)) {
          return (
            <Info key={uuidv4()}>
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
              <Wrap>
                <Poster
                  src={`${posterURL}${result.poster_path}`}
                  // onMouseEnter={() => setIsHoverPoster(i)}
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
  padding-left: 8rem;
  height: 700px;
  overflow-y: scroll;
  color: white;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${BreakPoint.sm}) {
    padding: 2rem;
  }

`;
const Info = styled.div`
  margin-top: 50px;
  padding-bottom: 50px;
  width: 860px;
  @media (max-width: 1600px) {
    width: 500px;
  }
  @media (max-width: ${BreakPoint.lg}) {
    width: 360px;
  }
  @media (max-width: 1000px) {
    width: 100%;
    padding-right: 8rem;
  }
  @media (max-width: ${BreakPoint.sm}) {
    padding-right: 0;
  }
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
const LinkTo = styled(Link)`
  width: 100%;
  display: inline-block;
`;
const MovieName = styled(Title.Third)`
  margin-top: 40px;
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
