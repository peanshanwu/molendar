import HorizontalScroll from "react-horizontal-scrolling";
import React, { useEffect, useState } from "react";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import * as Title from "../../components/layout/Title"
import * as BreakPoint from "../../components/layout/BreakPoints"


function DetailCarousel({ castInfo }) {

  return (
    <Wrapper>
      <CastTitle>Cast</CastTitle>
      <HorizontalScroll>
        {castInfo?.cast.map((member) => {
          const url = member.profile_path
            ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
            : `https://firebasestorage.googleapis.com/v0/b/molendar-shan.appspot.com/o/default_photo.png?alt=media&token=376c66cd-730d-44b7-a2f1-347999a60c02`;

          return (
            <Movie>
              <Poster src={url} key={member.id} alt={member.name} />
              <MovieName>{member.name}</MovieName>
              <p>{member.character}</p>
            </Movie>
          );
        })}
      </HorizontalScroll>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  position: relative;
  padding: 0 0 50px 8rem;
  color: ${Color.Content};
  background-color: ${Color.Background};
  @media (max-width: ${BreakPoint.md}) {
    padding: 0 2rem 50px;
  }
`;
const CastTitle = styled(Title.Sub)`
  margin-bottom: 0;
`
const Movie = styled.div`
  padding-top: 30px;
  width: 250px;
  height: 400px;
`;
const MovieName = styled.h3`
  margin-top: 10px;
  font-weight: 100;
`;
const Poster = styled.img`
  height: 300px;
  transform-origin: center;
  transition: ease-in 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

export default DetailCarousel;
