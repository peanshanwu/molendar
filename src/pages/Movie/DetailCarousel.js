import React from "react";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import * as Title from "../../components/layout/Title"
import * as BreakPoint from "../../components/layout/BreakPoints"
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { v4 as uuidv4 } from 'uuid';

function DetailCarousel({ castInfo }) {

  return (
    <Wrapper>
      <CastTitle>Cast</CastTitle>
      <ScrollMenu
        options={{
          ratio: 0.5,
          rootMargin: "5px",
          threshold: [1, 0.05, 0.5, 0.75, 0.95, 1]
        }}
      >
        {castInfo?.cast.map((member) => {
         const url = member.profile_path
            ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
            : `https://firebasestorage.googleapis.com/v0/b/molendar-shan.appspot.com/o/default_photo.png?alt=media&token=376c66cd-730d-44b7-a2f1-347999a60c02`;   
           return (
             <Movie key={uuidv4()}>
               <Poster src={url} key={member.id} alt={member.name} />
               <MovieName>{member.name}</MovieName>
               <p>{member.character}</p>
             </Movie>
           );
         })}
      </ScrollMenu>
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
  @media (max-width: ${BreakPoint.md}) {
    width: 160px;
    height: 350px;
  }
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
  @media (max-width: ${BreakPoint.md}) {
    height: 200px;
  }
`;

export default DetailCarousel;
