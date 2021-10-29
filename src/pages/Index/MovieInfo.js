import React, { useState } from 'react'
import styled from "styled-components"
import * as Color from '../../components/layout/Color'
import { format, isAfter } from 'date-fns'
import { IoMdAddCircle } from "react-icons/io"
import { IoHeartCircleSharp } from "react-icons/io5"
import { BsFillPlayCircleFill } from "react-icons/bs"
import DisplayStar from '../../components/common/DisplayStar'

const posterURL = 'https://image.tmdb.org/t/p/w500'

// fake data
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
  ]
}
const trailerData = {
  "adult": false,
  "backdrop_path": "/lNyLSOKMMeUPr1RsL4KcRuIXwHt.jpg",
  "belongs_to_collection": {
      "id": 558216,
      "name": "Venom Collection",
      "poster_path": "/670x9sf0Ru8y6ezBggmYudx61yB.jpg",
      "backdrop_path": "/rhLspFB1B8ZCkWEHFYmc3NKagzq.jpg"
  },
  "budget": 110000000,
  "genres": [
      {
          "id": 878,
          "name": "Science Fiction"
      },
      {
          "id": 28,
          "name": "Action"
      }
  ],
  "homepage": "https://www.venom.movie",
  "id": 580489,
  "imdb_id": "tt7097896",
  "original_language": "en",
  "original_title": "Venom: Let There Be Carnage",
  "overview": "After finding a host body in investigative reporter Eddie Brock, the alien symbiote must face a new enemy, Carnage, the alter ego of serial killer Cletus Kasady.",
  "popularity": 7339.989,
  "poster_path": "/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg",
  "production_companies": [
      {
          "id": 7505,
          "logo_path": "/837VMM4wOkODc1idNxGT0KQJlej.png",
          "name": "Marvel Entertainment",
          "origin_country": "US"
      },
      {
          "id": 84041,
          "logo_path": "/XmHMPGzdI5c4WGX1YlxU4s2v7T.png",
          "name": "Pascal Pictures",
          "origin_country": "US"
      },
      {
          "id": 5,
          "logo_path": "/71BqEFAF4V3qjjMPCpLuyJFB9A.png",
          "name": "Columbia Pictures",
          "origin_country": "US"
      },
      {
          "id": 34,
          "logo_path": "/GagSvqWlyPdkFHMfQ3pNq6ix9P.png",
          "name": "Sony Pictures",
          "origin_country": "US"
      },
      {
          "id": 81620,
          "logo_path": "/gNp4dfuBOXmVWdGKb63NfbFNbFi.png",
          "name": "Tencent Pictures",
          "origin_country": "CN"
      }
  ],
  "production_countries": [
      {
          "iso_3166_1": "CN",
          "name": "China"
      },
      {
          "iso_3166_1": "US",
          "name": "United States of America"
      }
  ],
  "release_date": "2021-09-30",
  "revenue": 283000000,
  "runtime": 97,
  "spoken_languages": [
      {
          "english_name": "Mandarin",
          "iso_639_1": "zh",
          "name": "普通话"
      },
      {
          "english_name": "English",
          "iso_639_1": "en",
          "name": "English"
      },
      {
          "english_name": "Spanish",
          "iso_639_1": "es",
          "name": "Español"
      }
  ],
  "status": "Released",
  "tagline": "",
  "title": "Venom: Let There Be Carnage",
  "video": false,
  "vote_average": 7.1,
  "vote_count": 918,
  "videos": {
      "results": [
          {
              "iso_639_1": "en",
              "iso_3166_1": "US",
              "name": "Wild Entertainment",
              "key": "jU8VNQKKF-g",
              "site": "YouTube",
              "size": 1080,
              "type": "Teaser",
              "official": true,
              "published_at": "2021-10-04 23:49:42 UTC",
              "id": "615f03ca8e2ba600434da5f7"
          },
          {
              "iso_639_1": "en",
              "iso_3166_1": "US",
              "name": "Last One Standing",
              "key": "gU4vcJIbeOU",
              "site": "YouTube",
              "size": 1080,
              "type": "Teaser",
              "official": true,
              "published_at": "2021-09-29 20:32:18 UTC",
              "id": "6155f382d2147c0044df142d"
          },
          {
              "iso_639_1": "en",
              "iso_3166_1": "US",
              "name": "The Birth of Carnage",
              "key": "q8O-0zZn6_w",
              "site": "YouTube",
              "size": 1080,
              "type": "Clip",
              "official": false,
              "published_at": "2021-09-29 13:00:22 UTC",
              "id": "6155f43baf58cb002afcfb47"
          },
          {
              "iso_639_1": "en",
              "iso_3166_1": "US",
              "name": "Shriek",
              "key": "zulYWSjrqb0",
              "site": "YouTube",
              "size": 1080,
              "type": "Featurette",
              "official": true,
              "published_at": "2021-09-27 23:00:33 UTC",
              "id": "6155f729dcb6a3002a92bb30"
          },
          {
              "iso_639_1": "en",
              "iso_3166_1": "US",
              "name": "Eddie and Venom",
              "key": "U9Lx4raR_Ls",
              "site": "YouTube",
              "size": 1080,
              "type": "Featurette",
              "official": true,
              "published_at": "2021-09-27 17:00:17 UTC",
              "id": "6152885ed1ca2a009069f7c7"
          },
          {
              "iso_639_1": "en",
              "iso_3166_1": "US",
              "name": "Prison Break",
              "key": "WOhht3fvPYI",
              "site": "YouTube",
              "size": 1080,
              "type": "Clip",
              "official": true,
              "published_at": "2021-09-27 13:30:10 UTC",
              "id": "6151f85667203d0043f58c50"
          },
          {
              "iso_639_1": "en",
              "iso_3166_1": "US",
              "name": "Official Trailer 2",
              "key": "-FmWuCgJmxo",
              "site": "YouTube",
              "size": 1080,
              "type": "Trailer",
              "official": true,
              "published_at": "2021-08-02 13:00:00 UTC",
              "id": "6107ec7d7719d7002c9e4076"
          },
          {
              "iso_639_1": "en",
              "iso_3166_1": "US",
              "name": "Official Trailer",
              "key": "-ezfi6FQ8Ds",
              "site": "YouTube",
              "size": 1080,
              "type": "Trailer",
              "official": true,
              "published_at": "2021-05-10 13:00:00 UTC",
              "id": "60992f8b97eab4003bd15b68"
          },
          {
              "iso_639_1": "en",
              "iso_3166_1": "US",
              "name": "Official Teaser Trailer",
              "key": "_s4qXyZOJSQ",
              "site": "YouTube",
              "size": 1080,
              "type": "Teaser",
              "official": true,
              "published_at": "2020-04-21 23:45:04 UTC",
              "id": "5ee11ba6dbf144001d906e58"
          }
      ]
  }
}



const MovieInfo = ({ selectDay }) => {

  const [clickTrailer, setClickTrailer] = useState(false)
  const [autoplay, setAutoplay] = useState('')
  const [isHoverPoster, setIsHoverPoster] = useState(false)

  function clickPlay() {
    setClickTrailer(true)
    setAutoplay('?autoplay=1')
  }

  function nowIsPlaying(resultReleaseDate) {
    const formatSelectDay = format(selectDay, 'yyyy-MM-dd').split('-').map(e => parseInt(e, 10))
    const releaseDate = resultReleaseDate.split('-').map(e => parseInt(e, 10))
    const nowPlaying = isAfter(new Date(formatSelectDay[0], formatSelectDay[1], formatSelectDay[2]), new Date(releaseDate[0], releaseDate[1], (releaseDate[2]-1))) //因為是after，為了上映當天也符合，所以-1
    return nowPlaying 
  }


  return (
    <Wrapper>
      {nowPlayingData.results.map((result, i) => {
        
        if (nowIsPlaying(result.release_date)) {
          return (
            <Info>
              
            {/* 還要再寫判斷式去拿到該 movie_id 的 trailer_key */}
            {/* 還要再寫自動播放的部分 */}
            {/* 還要再寫將Youtube關掉的按鈕 */}
            {/* 還要再寫infinite scroll */}

              <Youtube style={ clickTrailer ? {display:'block'} : {display:'none'} } src={`https://www.youtube.com/embed/jU8VNQKKF-g`} title="YouTube video player" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen/>
              {
                i === isHoverPoster ?
                <Trailer
                  id={result.id}
                  onMouseLeave={() => setIsHoverPoster(false)}
                  onClick={clickPlay}>
                    <PlayIcon />
                </Trailer>
                : null
              }
              <Poster
                src={`${posterURL}${result.poster_path}`}
                onMouseEnter={() => setIsHoverPoster(i)}
              />
              <AddToCalendarIcon />
              <AddToCollectionIcon />
              <MovieName>{result.original_title}</MovieName>
              <StarWrapper>
                <DisplayStar starPoints={ result.vote_average }/>
              </StarWrapper>
              <SubInfo>Release Date | {result.release_date}</SubInfo> <SubInfo>Reviews | {result.vote_count}</SubInfo>
              <OverView>
                {result.overview}
              </OverView>
            </Info>
          )
        }
      })
    }
    </Wrapper>
			
	)
}

const Wrapper = styled.div`
  /* background-color: ${Color.Background}; */
  position: relative;
  padding-left: 220px;
  padding-bottom: 150px;
  height: 700px;
  overflow-y: scroll;
  color: white
`
const Info = styled.div`
  /* border-bottom: 1px solid #ccc; */
  margin-top: 50px;
  padding-bottom: 50px;
  width: 650px;
  /* outline: 1px solid #ccc; */
  /* &:last-child {
    border-bottom: 0 solid white;
  } */
`
const Poster = styled.img`
  width: 232px;
  height: 348px;
`
const Trailer = styled.div`
  position: absolute;
  width: 232px;
  height: 348px;
  background-color: rgba(0,0,0,.5);
`
const PlayIcon = styled(BsFillPlayCircleFill)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
`
const Youtube = styled.iframe`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  width: 80vw;
  height: 80vh;
`
const AddToCalendarIcon = styled(IoMdAddCircle)`
  color: white;
  font-size: 40px;
  cursor: pointer;
  margin-left: 10px;
`
const AddToCollectionIcon = styled(IoHeartCircleSharp)`
  color: white;
  font-size: 40px;
  cursor: pointer;
  margin-left: 10px;
`
const MovieName = styled.h2`
  margin-top: 40px;
  font-size: 30px;
`
const StarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  font-size: 20px;
`
const SubInfo = styled.span`
  display: inline-block;
  margin-top: 5px;
  margin-right: 20px;
  font-weight: 200;
`
const OverView = styled.p`
  letter-spacing: 1px;
  margin-top: 30px;
  font-weight: 300;
  line-height: 24px;
`


export default MovieInfo