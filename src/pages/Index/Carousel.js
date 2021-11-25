import HorizontalScroll from "react-horizontal-scrolling";
import React from "react";
import { Link } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import * as BreakPoint from "../../components/layout/BreakPoints";
import styled from "styled-components";
import DisplayStar from "../../components/common/DisplayStar";
import * as Title from "../../components/layout/Title";

function Carousel({ upComingMovie }) {
  return (
    <Wrapper>
      <MainTitle>Upcoming Movies</MainTitle>
      <HorizontalScroll>
        {upComingMovie?.results.map((result) => {
          const url = result.poster_path
            ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
            : `https://firebasestorage.googleapis.com/v0/b/molendar-shan.appspot.com/o/default_photo.png?alt=media&token=376c66cd-730d-44b7-a2f1-347999a60c02`;

          return (
            <Link to={`/movie/${result.id}`}>  {/* 手機版容易誤觸，看要不要把Link範圍縮小 */}
              <Movie>
                <Poster src={url} key={result.id} alt={result.original_title} />
                  <MovieName>{result.original_title}</MovieName>
                  <StarWrapper>
                    <DisplayStar starPoints={result.vote_average} />
                  </StarWrapper>
              </Movie>
            </Link>
          );
        })}
      </HorizontalScroll>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  position: relative;
  padding-left: 8rem;
  padding-top: 50px;
  height: 600px;
  color: ${Color.Content};
  background-color: ${Color.Background};
  @media (max-width: ${BreakPoint.lg}) {
    height: auto;
    margin-bottom: 80px;
  }
  @media (max-width: ${BreakPoint.md}) {
    padding: 0 2rem;
  }
`;
const MainTitle = styled(Title.Sub)`
  margin-bottom: 0;
`;
const Movie = styled.div`
  padding-top: 30px; /* 圖片放大時，上方才有空間 */
  width: 250px;
  height: 400px;
`;
const MovieName = styled.h3`
  font-size: 1.2rem;
  margin-top: 10px;
  font-weight: 100;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;
const Poster = styled.img`
  height: 300px;
  transform-origin: center;
  transition: ease-in 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;
const StarWrapper = styled.div`
  color: ${Color.Main};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
`;

export default Carousel;
