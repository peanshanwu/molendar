import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { fetchSearch } from "../../utils/api";
import * as Color from "../../components/layout/Color";
import DisplayStar from "../../components/common/DisplayStar";
import * as Title from "../../components/layout/Title";
import * as Container from "../../components/layout/Container";
import * as BreakPoint from "../../components/layout/BreakPoints";
import Loading from "../../components/layout/Loading";

export default function SearchList() {
  const { query } = useParams();
  const [searchInfo, setSearchInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);

  console.log(query);
  console.log(searchInfo);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchSearch(query).then((res) => {
        setSearchInfo(res);
        setIsLoading(false)
      });
    }
    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <>
      {isLoading ? <Loading /> : 
        <Container.Main>
          <Wrap>
            <Title.Sub>Search Result of "{query}"</Title.Sub>
            {searchInfo?.results.length > 0 ? (
              <FlexWrap>
                {searchInfo.results.map((result) => {
                  const url = result.poster_path
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : `https://firebasestorage.googleapis.com/v0/b/molendar-shan.appspot.com/o/default_photo.png?alt=media&token=376c66cd-730d-44b7-a2f1-347999a60c02`;

                  return (
                    <Movie>
                      <Link to={`/movie/${result.id}`}>
                        <Poster
                          src={url}
                          key={result.id}
                          alt={result.original_title}
                        />
                        <MovieName>{result.original_title}</MovieName>
                        <StarWrapper>
                          <DisplayStar starPoints={result.vote_average} />
                        </StarWrapper>
                      </Link>
                    </Movie>
                  );
                })}
              </FlexWrap>
              ) : (
                <NoItem>
                  Sorry, no result found <span> ...</span>
                  <Link to={`/`}> | Back to index</Link>
                </NoItem>
            )}
          </Wrap>
        </Container.Main>
      }
    </>
    
  );
}

// const Wrapper = styled.section`
//   color: ${Color.Content};
//   position: relative;
//   width: 100%;
//   min-height: calc(100vh - 130px);
//   background-color: ${Color.Background};
// `;
// const Main = styled.main`
//   width: calc(100% - 80px);
//   position: relative;
//   left: 80px;
// `;
// const Container = styled.div`
//   word-break: break-all;
//   max-width: 1000px;
//   width: 100%;
//   margin: 0 auto;
//   padding: 100px 0;
// `;
const Wrap = styled(Container.MaxWidthContainer)`
  color: ${Color.Content};
  max-width: 1000px;
  width: 100%;
  padding: 100px 2rem;
`;
const NoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 130px);
  color: ${Color.Dark};
  font-weight: 100;
  font-size: 1.25rem;
  /* background-color: ${Color.Sub}; */
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  --webkit-row-gap: 10vh;
  --webkit-column-gap: 5.7%;
  gap: 10vh 5.7%;
`;
const Movie = styled.div`
  width: 20.5%;
  @media (max-width: ${BreakPoint.md}) {
    width: 46%;
  }
`;
const MovieName = styled.h3`
  margin-top: 10px;
  font-weight: 100;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  @media (max-width: ${BreakPoint.md}) {
    font-size: 1.2rem;
  }
  
`;
const Poster = styled.img`
  object-fit: cover;
  height: auto;
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
  @media (max-width: ${BreakPoint.md}) {
    font-size: 1.1rem;
  }
`;






