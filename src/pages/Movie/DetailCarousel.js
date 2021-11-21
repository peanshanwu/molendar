import HorizontalScroll from "react-horizontal-scrolling";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import DisplayStar from "../../components/common/DisplayStar";
import { fetchCast } from "../../utils/api";
// import Loading from '../../components/layout/Loading'

function DetailCarousel({ castInfo }) {
  // const movieId = useParams().id;
  // const [castInfo, setCastInfo] = useState();

  // useEffect(() => {
  //   let isMount = true;
  //   if (isMount) {
  //     fetchCast(movieId).then((res) => {
  //       console.log(res);
  //       setCastInfo(res);
  //     });
  //   }
  //   return () => {
  //     isMount = false; // 清除fetchAPI
  //   };
  // }, []);

  return (
    <Wrapper>
      <Title>Cast</Title>
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
  padding-left: 12%;
  padding-top: 65px;
  height: 600px;
  color: ${Color.Content};
  background-color: ${Color.Background};
`;
const Title = styled.h3`
  font-size: 1.5rem;
`;
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
const StarWrapper = styled.div`
  color: ${Color.Main};
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`;

export default DetailCarousel;
