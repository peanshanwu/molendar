import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as Color from '../../components/layout/Color'
import Slider from "react-slick";
import DisplayStar from '../../components/common/DisplayStar'
import { MdDelete } from "react-icons/md"
import { FaPen } from "react-icons/fa"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


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

function Info({popupClick, setPopupClick}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  return (
    <>
      {popupClick &&
        <>
        <Mask onClick={ ()=> setPopupClick(false) }></Mask>
        <Wrapper>
          <Slider {...settings}>
            <Container>
              <Header>
                <Date>1/10<DayOfWeek>Mon</DayOfWeek></Date>
                <WatchWithPic />
                <WatchWithName>Shan<WatchWithOthers>and others...</WatchWithOthers></WatchWithName>
                <DeleteIcon />
                <Link to={`/edit/${nowPlayingData.results[1].id}`}>
                  <EditIcon/>
                </Link>
              </Header>
              <Wrap>
                <Link to="/movie">
                  <MovieName>{ nowPlayingData.results[1].original_title }</MovieName>
                </Link>
                <StarWrapper>
                  <DisplayStar starPoints={ nowPlayingData.results[1].vote_average }/>
                </StarWrapper>
                <SubInfo>Release Date | {nowPlayingData.results[1].release_date}</SubInfo> <SubInfo>Reviews | {nowPlayingData.results[1].vote_count}</SubInfo>
                <OverView>
                  {nowPlayingData.results[1].overview}
                </OverView>
                {/* <Trailer onClick={clickPlay}> Watch Trailer</Trailer> */}
              </Wrap>
            </Container>
            <Container>
              <Header>
                <Date>1/10<DayOfWeek>Mon</DayOfWeek></Date>
                <WatchWithPic />
                <WatchWithName>Shan<WatchWithOthers>and others...</WatchWithOthers></WatchWithName>
                <DeleteIcon />
                <Link to={`/edit/${nowPlayingData.results[1].id}`}>
                  <EditIcon/>
                </Link>
              </Header>
              <Wrap>
                <Link to="/movie">
                  <MovieName>{ nowPlayingData.results[1].original_title }</MovieName>
                </Link>
                <StarWrapper>
                  <DisplayStar starPoints={ nowPlayingData.results[1].vote_average }/>
                </StarWrapper>
                <SubInfo>Release Date | {nowPlayingData.results[1].release_date}</SubInfo> <SubInfo>Reviews | {nowPlayingData.results[1].vote_count}</SubInfo>
                <OverView>
                  {nowPlayingData.results[1].overview}
                </OverView>
                {/* <Trailer onClick={clickPlay}> Watch Trailer</Trailer> */}
              </Wrap>
            </Container>
          </Slider>
        </Wrapper>
      </>}
    </>
  )

}

const iconStyle = {
  fontSize: "1.9rem",
  color: Color.Main,
  cursor: "pointer",
  WebkitFilter: "drop-shadow(0 1px 5px rgba(0, 0, 0, 1))",
  filter: "drop-shadow(0 1px 5px rgba(0, 0, 0, 1))",
  "transition": ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))"
  }
}
const Mask = styled.section`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
const Wrapper = styled.section`
  color: ${Color.Content};
  width: 60%;
  position: fixed;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  box-shadow: 2px 3px 50px rgba(0, 0, 0, .7);
  /* outline: 2px solid red; */
  /* background-color: #fff; */
  `
const Container = styled.main`
  padding: 20px 30px;
  background-image: url('https://image.tmdb.org/t/p/w1280/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  height: 500px;
  color: white;
  background-color: ${Color.Background};
`
const Header = styled.div`
  /* position: fixed;
  top: 0; */
  display: flex;
  align-items: center;
`
const Wrap = styled.section`
  max-width: 40%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`
const Date = styled.h3`
  color: ${Color.Main};
  font-size: 2rem;
`
const DayOfWeek = styled.span`
  font-size: 1rem;
  margin-left: 10px;
`
const WatchWithPic = styled.div`
  background-image: url(https://lh3.googleusercontent.com/a/AATXAJwKXgG-Z-dC9Nzz_b5nw5M_HO57C9p4j61PqKfr=s96-c);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`
const WatchWithName = styled.p`
  font-size: 1rem;
  margin-right: auto;
`
const WatchWithOthers = styled.span`
  margin-left: 15px;
  font-size: 1rem;
`
const MovieName = styled.h1`
  font-size: 3rem;
  width: 100%;
`
const StarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  font-size: 20px;
  color: ${Color.Main};
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
const DeleteIcon = styled(MdDelete)`
  ${iconStyle};
  margin-left: auto;
`
const EditIcon = styled(FaPen)`
  ${iconStyle};
  font-size: 1.5rem;
  margin-left: 1rem;
`

export default Info