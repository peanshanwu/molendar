import HorizontalScroll from 'react-horizontal-scrolling'
import React, { useState, useEffect } from 'react'
import { FaStar, FaStarHalf } from "react-icons/fa"
import { Link } from 'react-router-dom'
import * as Color from "../../components/Color"
import styled from 'styled-components'


const nowPlayingData = {
  "dates": {
      "maximum": "2021-10-26",
      "minimum": "2021-09-08"
  },
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/70nxSw3mFBsGmtkvcs91PbjerwD.jpg",
      "genre_ids": [
          878,
          28
      ],
      "id": 580489,
      "original_language": "en",
      "original_title": "Venom: Let There Be Carnage",
      "overview": "After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.",
      "popularity": 7339.989,
      "poster_path": "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
      // "release_date": "2021-09-30",
      "release_date": "2021-10-28",
      "title": "Venom: Let There Be Carnage",
      "video": false,
      "vote_average": 7,
      "vote_count": 882
    },
    {
      "adult": false,
      "backdrop_path": "/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg",
      "genre_ids": [
          35,
          28,
          12,
          878
      ],
      "id": 550988,
      "original_language": "en",
      "original_title": "Free Guy",
      "overview": "A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.",
      "popularity": 3278.457,
      "poster_path": "/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg",
      "release_date": "2021-08-11",
      "title": "Free Guy",
      "video": false,
      "vote_average": 7.8,
      "vote_count": 2955
    },
    {
      "adult": false,
      "backdrop_path": "/2cdrhlf3hvvueGyQDx0u8jpWvQR.jpg",
      "genre_ids": [
          27,
          53
      ],
      "id": 610253,
      "original_language": "en",
      "original_title": "Halloween Kills",
      "overview": "Minutes after Laurie Strode, her daughter Karen and granddaughter Allyson left masked monster Michael Myers caged and burning in Laurie's basement, Laurie is rushed to the hospital with life-threatening injuries, believing she finally killed her lifelong tormentor. But when Michael manages to free himself from Laurie's trap, his ritual bloodbath resumes. As Laurie fights her pain and prepares to defend herself against him, she inspires all of Haddonfield to rise up against their unstoppable monster. The Strode women join a group of other survivors of Michael's first rampage who decide to take matters into their own hands, forming a vigilante mob that sets out to hunt Michael down, once and for all.",
      "popularity": 3691.799,
      "poster_path": "/qmJGd5IfURq8iPQ9KF3les47vFS.jpg",
      "release_date": "2021-10-14",
      "title": "Halloween Kills",
      "video": false,
      "vote_average": 7.6,
      "vote_count": 500
    },
    {
      "adult": false,
      "backdrop_path": "/kTOheVmqSBDIRGrQLv2SiSc89os.jpg",
      "genre_ids": [
          16,
          35,
          10751
      ],
      "id": 639721,
      "original_language": "en",
      "original_title": "The Addams Family 2",
      "overview": "The Addams get tangled up in more wacky adventures and find themselves involved in hilarious run-ins with all sorts of unsuspecting characters.",
      "popularity": 1922.643,
      "poster_path": "/xYLBgw7dHyEqmcrSk2Sq3asuSq5.jpg",
      "release_date": "2021-10-01",
      "title": "The Addams Family 2",
      "video": false,
      "vote_average": 7.6,
      "vote_count": 338
    },
    {
      "adult": false,
      "backdrop_path": "/aO9Nnv9GdwiPdkNO79TISlQ5bbG.jpg",
      "genre_ids": [
          28,
          12
      ],
      "id": 568620,
      "original_language": "en",
      "original_title": "Snake Eyes: G.I. Joe Origins",
      "overview": "After saving the life of their heir apparent, tenacious loner Snake Eyes is welcomed into an ancient Japanese clan called the Arashikage where he is taught the ways of the ninja warrior. But, when secrets from his past are revealed, Snake Eyes' honor and allegiance will be tested – even if that means losing the trust of those closest to him.",
      "popularity": 1807.867,
      "poster_path": "/uIXF0sQGXOxQhbaEaKOi2VYlIL0.jpg",
      "release_date": "2021-07-22",
      "title": "Snake Eyes: G.I. Joe Origins",
      "video": false,
      "vote_average": 6.9,
      "vote_count": 695
    },
    {
      "adult": false,
      "backdrop_path": "/70nxSw3mFBsGmtkvcs91PbjerwD.jpg",
      "genre_ids": [
          878,
          28
      ],
      "id": 580489,
      "original_language": "en",
      "original_title": "Venom: Let There Be Carnage",
      "overview": "After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.",
      "popularity": 7339.989,
      "poster_path": "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
      // "release_date": "2021-09-30",
      "release_date": "2021-10-28",
      "title": "Venom: Let There Be Carnage",
      "video": false,
      "vote_average": 7,
      "vote_count": 882
    },
    {
      "adult": false,
      "backdrop_path": "/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg",
      "genre_ids": [
          35,
          28,
          12,
          878
      ],
      "id": 550988,
      "original_language": "en",
      "original_title": "Free Guy",
      "overview": "A bank teller called Guy realizes he is a background character in an open world video game called Free City that will soon go offline.",
      "popularity": 3278.457,
      "poster_path": "/xmbU4JTUm8rsdtn7Y3Fcm30GpeT.jpg",
      "release_date": "2021-08-11",
      "title": "Free Guy",
      "video": false,
      "vote_average": 7.8,
      "vote_count": 2955
    },
    {
      "adult": false,
      "backdrop_path": "/2cdrhlf3hvvueGyQDx0u8jpWvQR.jpg",
      "genre_ids": [
          27,
          53
      ],
      "id": 610253,
      "original_language": "en",
      "original_title": "Halloween Kills",
      "overview": "Minutes after Laurie Strode, her daughter Karen and granddaughter Allyson left masked monster Michael Myers caged and burning in Laurie's basement, Laurie is rushed to the hospital with life-threatening injuries, believing she finally killed her lifelong tormentor. But when Michael manages to free himself from Laurie's trap, his ritual bloodbath resumes. As Laurie fights her pain and prepares to defend herself against him, she inspires all of Haddonfield to rise up against their unstoppable monster. The Strode women join a group of other survivors of Michael's first rampage who decide to take matters into their own hands, forming a vigilante mob that sets out to hunt Michael down, once and for all.",
      "popularity": 3691.799,
      "poster_path": "/qmJGd5IfURq8iPQ9KF3les47vFS.jpg",
      "release_date": "2021-10-14",
      "title": "Halloween Kills",
      "video": false,
      "vote_average": 7.6,
      "vote_count": 500
    },
    {
      "adult": false,
      "backdrop_path": "/kTOheVmqSBDIRGrQLv2SiSc89os.jpg",
      "genre_ids": [
          16,
          35,
          10751
      ],
      "id": 639721,
      "original_language": "en",
      "original_title": "The Addams Family 2",
      "overview": "The Addams get tangled up in more wacky adventures and find themselves involved in hilarious run-ins with all sorts of unsuspecting characters.",
      "popularity": 1922.643,
      "poster_path": "/xYLBgw7dHyEqmcrSk2Sq3asuSq5.jpg",
      "release_date": "2021-10-01",
      "title": "The Addams Family 2",
      "video": false,
      "vote_average": 7.6,
      "vote_count": 338
    },
    {
      "adult": false,
      "backdrop_path": "/aO9Nnv9GdwiPdkNO79TISlQ5bbG.jpg",
      "genre_ids": [
          28,
          12
      ],
      "id": 568620,
      "original_language": "en",
      "original_title": "Snake Eyes: G.I. Joe Origins",
      "overview": "After saving the life of their heir apparent, tenacious loner Snake Eyes is welcomed into an ancient Japanese clan called the Arashikage where he is taught the ways of the ninja warrior. But, when secrets from his past are revealed, Snake Eyes' honor and allegiance will be tested – even if that means losing the trust of those closest to him.",
      "popularity": 1807.867,
      "poster_path": "/uIXF0sQGXOxQhbaEaKOi2VYlIL0.jpg",
      "release_date": "2021-07-22",
      "title": "Snake Eyes: G.I. Joe Origins",
      "video": false,
      "vote_average": 6.9,
      "vote_count": 695
    },
  ]
}

function Carousel() {

  function displayStar(starPoints) {
    const starToFive = Math.round(starPoints / 2)
    const starElement = [];
    for (let i = 0; i < starToFive; i += 1) {
      starElement.push(<StarIcon />)
    }
    return <StarWrapper>{ starElement }<p>{starPoints}</p></StarWrapper>
  }
  
  return (
    <Wrapper>
      <Title>Upcoming Movies</Title>
      <Link to="/movie-list">Explore All</Link>
      <HorizontalScroll>
        {nowPlayingData.results.map((result) => (
          <Movie>
            <Poster
              src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
              key={result.id}
              alt={result.original_title}
            />
            <MovieName>{result.original_title}</MovieName>
            {displayStar(result.vote_average)}
          </Movie>
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
const StarIcon = styled(FaStar)`
  margin-right: 5px;
`

export default Carousel