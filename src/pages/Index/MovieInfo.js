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