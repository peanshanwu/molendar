import React from "react";
import styled from "styled-components";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { Link } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import DisplayStar from "../../components/common/DisplayStar";
import * as BreakPoint from "../../components/layout/BreakPoints";
import * as Title from "../../components/layout/Title";
import { v4 as uuidv4 } from 'uuid';


function IndexUpcoming({ upComingMovie }) {

  return (
      <Wrapper>
        <MainTitle>Upcoming Movies</MainTitle>
        <ScrollMenu
          options={{
            ratio: 0.5,
            rootMargin: "5px",
            threshold: [1, 0.05, 0.5, 0.75, 0.95, 1]
          }}
        >
          {upComingMovie?.results.map((result) => {
            const url = result.poster_path
              ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
              : `https://firebasestorage.googleapis.com/v0/b/molendar-shan.appspot.com/o/default_photo.png?alt=media&token=376c66cd-730d-44b7-a2f1-347999a60c02`;

            return (
              <Link to={`/movie/${result.id}`} key={uuidv4()}>
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
        </ScrollMenu>
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
  padding-right: 10px;
  width: 250px;
  height: 400px;
  @media (max-width: ${BreakPoint.md}) {
    width: 160px;
    height: 200px;
  }
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
  @media (max-width: ${BreakPoint.md}) {
    height: 200px;
  }
`;
const StarWrapper = styled.div`
  color: ${Color.Main};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
`;

export default IndexUpcoming;


