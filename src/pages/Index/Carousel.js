import HorizontalScroll from 'react-horizontal-scrolling'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as Color from "../../components/layout/Color"
import styled from 'styled-components'
import DisplayStar from '../../components/common/DisplayStar'
import Loading from '../../components/layout/Loading'


function Carousel({ upComingMovie }) {

  return (
    <Wrapper>
      <Title>Upcoming Movies</Title>
      <Link to="/movie-list">Explore All</Link>
      <HorizontalScroll>
        {upComingMovie.results.map((result) => (
          <Link to={`/movie/${result.id}`} >
            <Movie>
              <Poster
                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                key={result.id}
                alt={result.original_title}
              />
              <MovieName>{result.original_title}</MovieName>
              <StarWrapper>
                <DisplayStar starPoints={ result.vote_average }/>
              </StarWrapper>
            </Movie>
          </Link>
        ))}
      </HorizontalScroll>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  padding-left: 220px;
  padding-top: 65px;
  height: 600px;
  color: ${Color.Content};
  background-color: ${Color.Background};
`
const Title = styled.h3`
  font-size: 30px;
`
const Movie = styled.div`
  padding-top: 30px;
  width: 250px;
  height: 400px;
`
const MovieName = styled.h3`
  margin-top: 10px;
  font-weight: 100;
`
const Poster = styled.img`
  height: 300px;
  transform-origin: center;
  transition: ease-in .3s;
  &:hover {
    transform: scale(1.05);
  }
`
const StarWrapper = styled.div`
  color: ${Color.Main};
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
`

export default Carousel