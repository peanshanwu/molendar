import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import * as Color from '../../components/layout/Color'
import Slider from "react-slick";
import { format, isSameDay} from 'date-fns'
import DisplayStar from '../../components/common/DisplayStar'
import { MdDelete } from "react-icons/md"
import { FaPen } from "react-icons/fa"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


function Info({ popupClick, setPopupClick, myCalendarMovies, calendarMoviesInfo, selectDay, userList }) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const [selectDayOfMyMovies, setSelectDayOfMyMovies] = useState([]) // 選取該日期的電影行程資料
  const [selectDayOfMoviesInfo, setSelectDayOfMoviesInfo] = useState([]) // 根據選取日電影行程比對出來的電影資訊
  const [watchWithUserInfo, setWatchWithUserInfo] = useState([])
  


  useEffect(() => {
    const arr = myCalendarMovies.filter((myMovie) => {
      const y = myMovie.date[0]
      const m = myMovie.date[1] - 1
      const d = myMovie.date[2]
      return isSameDay(selectDay, new Date(y, m, d))
    })
    console.log(arr);
    setSelectDayOfMyMovies(arr)
  }, [popupClick])

  useEffect(() => {
    if (selectDayOfMyMovies.length > 0) {

      const watchWithArr = [];
      const movieArr = [];

      selectDayOfMyMovies.forEach((schedule) => {
        calendarMoviesInfo.forEach((item) => {
          if (item.id === schedule.movie_id) {
            movieArr.push(item)
          }
        })

        // watchWith先做成小arr，之後再塞到大arr
        const arr = [];
        schedule.watchWith.forEach((watchWithUser) => {
          userList.forEach(user => {
            if (watchWithUser === user.uid) {
              arr.push(user)
            }
          })
        })
        console.log(arr);
        watchWithArr.push(arr)
      })

      console.log(watchWithArr);
      setSelectDayOfMoviesInfo(movieArr)
      setWatchWithUserInfo(watchWithArr)
    }
  }, [selectDayOfMyMovies])


  console.log(selectDayOfMoviesInfo);
  return (
    <>
      {popupClick &&
        <>
          <Mask onClick={ ()=> setPopupClick(false) }></Mask>
          <Wrapper>
            <Slider {...settings}>
              {selectDayOfMoviesInfo.map((movie, i) => {
                return (
                <Container backdrop={movie.backdrop_path} >
                  <Header>
                    <Day>{ format(selectDay, 'MM / dd') }<DayOfWeek>{ format(selectDay, 'iii') }</DayOfWeek></Day>
                      
                      {/* {
                        watchWithUserInfo[i].map((user) => {
                          return (
                            <>
                              <WatchWithPic photoURL={ user.photoURL }/>
                              <WatchWithName>{user.name}
                                <WatchWithOthers>and others...</WatchWithOthers>
                              </WatchWithName>
                            </>
                          )
                        })
                      } */}
                      {
                        watchWithUserInfo[i].length > 0 &&
                        <>
                          <WatchWithPic photoURL={watchWithUserInfo[i][0]?.photoURL}/>
                          <WatchWithName>{watchWithUserInfo[i][0]?.name}
                            <WatchWithOthers>and others...</WatchWithOthers>
                          </WatchWithName>
                        </>
                      }

                    <DeleteIcon />
                    <Link to={`/edit/${movie.id}`}>
                        <EditIcon />
                    </Link>
                  </Header>
                  <Wrap>
                    <Link to="/movie">
                      <MovieName>{ movie.original_title }</MovieName>
                    </Link>
                    <StarWrapper>
                      <DisplayStar starPoints={ movie.vote_average }/>
                    </StarWrapper>
                    <SubInfo>Release Date | {movie.release_date}</SubInfo> <SubInfo>Reviews | {movie.vote_count}</SubInfo>
                    <OverView>
                      {movie.overview}
                    </OverView>
                  </Wrap>
                  </Container>
                )
              })}
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
  background-image: url(https://image.tmdb.org/t/p/w1280/${(props)=>props.backdrop});
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
const Day = styled.h3`
  color: ${Color.Main};
  font-size: 2rem;
`
const DayOfWeek = styled.span`
  font-size: 1rem;
  margin-left: 10px;
`
const WatchWithPic = styled.div`
  background-image: url(${props => props.photoURL});
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