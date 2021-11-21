import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import * as Color from "../../components/layout/Color";
import { format, isSameDay } from "date-fns";
import DisplayStar from "../../components/common/DisplayStar";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import firebase from "../../utils/firebase";

function Info({
  uid,
  popupClick,
  setPopupClick,
  myCalendarMovies,
  calendarMoviesInfo,
  selectDay,
  userList,
}) {
  const db = firebase.firestore();
  const history = useHistory();
  const userRef = db.collection("users");
  const movieRef = db.collection("movie_invitations");
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [selectDayOfMyMovies, setSelectDayOfMyMovies] = useState([]); // 選取該日期的電影行程資料
  const [selectDayOfMoviesInfo, setSelectDayOfMoviesInfo] = useState([]); // 根據選取日電影行程比對出來的電影資訊
  const [watchWithUserInfo, setWatchWithUserInfo] = useState([]);

  useEffect(() => {
    if (popupClick) {
      const arr = myCalendarMovies.filter((myMovie) => {
        const y = myMovie.date[0];
        const m = myMovie.date[1] - 1;
        const d = myMovie.date[2];
        return isSameDay(selectDay, new Date(y, m, d));
      });
      setSelectDayOfMyMovies(arr);
    }
  }, [popupClick]);

  useEffect(() => {
    /*
      movieInfos = [
        {
          doc_id: "",
          event_doc_id: "",
          scheduleOwner: "uid"
          movieInfo: {movieInfos},
          watchWith: [{userInfo}, {userInfo}, ...]
        },
        {
          doc_id: "",
          event_doc_id:"",
          movieInfo: {movieInfos},
          watchWith: [{userInfo}, {userInfo}, ...]
        },
      ]
    */

    if (selectDayOfMyMovies.length > 0) {
      const movieInfos = selectDayOfMyMovies.map((schedule) => {
        const movieScheduleObj = {}; // 建立每個電影行程的obj

        movieScheduleObj.scheduleOwner = schedule.scheduleOwner;
        movieScheduleObj.event_doc_id = schedule.event_doc_id;
        movieScheduleObj.doc_id = schedule.doc_id;

        const oneMovie = calendarMoviesInfo.find(
          (movieInfo) => schedule.movie_id === movieInfo.id
        );
        movieScheduleObj.movieInfo = oneMovie; // 獲取電影資訊，存入obj裡面的movieInfo欄位

        let watchWithInfoArr = [];
        // 做成用來render的資料前，先篩掉是currentUser的id
        const watchWithNoCurrentUser = schedule.watchWith.filter(
          (watchWith) => watchWith !== uid
        );
        console.log(schedule.watchWith);
        console.log(watchWithNoCurrentUser);
        watchWithInfoArr = watchWithNoCurrentUser.map((watchWith) => {
          return userList.find((user) => watchWith === user.uid);
        });
        console.log(userList);
        console.log(watchWithInfoArr);
        movieScheduleObj.watchWith = watchWithInfoArr; // 根據watchWith id array，轉換成info，存入obj的watchWith欄位

        return movieScheduleObj;
      });
      console.log(`movieInfos`, movieInfos);
      setSelectDayOfMoviesInfo(movieInfos);
    }
  }, [selectDayOfMyMovies]);

  function deleteMovie(delete_doc_id) {
    // 所有行程刪除
    db.collectionGroup("user_calendar")
      .where("event_doc_id", "==", delete_doc_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docRef) => {
          const docData = docRef.data();
          console.log(docData);
          console.log(docData.uid);
          console.log(docData.doc_id);
          userRef
            .doc(docData.uid)
            .collection("user_calendar")
            .doc(docData.doc_id)
            .delete();
        });
        setPopupClick(false);
      });

    // 邀請刪除
    movieRef
      .where("event_doc_id", "==", delete_doc_id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docRef) => {
          const docData = docRef.data();
          movieRef.doc(docData.doc_id).delete();
        });
      });
  }

  console.log(`selectDayOfMyMovies`, selectDayOfMyMovies);
  console.log(`selectDayOfMoviesInfo`, selectDayOfMoviesInfo);
  console.log(`watchWithUserInfo`, watchWithUserInfo);
  // console.log(`myCalendarMovies`, myCalendarMovies);
  // console.log(`calendarMoviesInfo`, calendarMoviesInfo);
  // console.log(`selectDay`, selectDay);
  // console.log(`userList`, userList);

  return (
    <>
      {popupClick && (
        <>
          <Mask onClick={() => setPopupClick(false)}></Mask>
          <Wrapper>
            <Slider {...settings}>
              {selectDayOfMoviesInfo?.map((movie) => {
                return (
                  <Container backdrop={movie.movieInfo?.backdrop_path}>
                    {/* <Gradient /> */}
                    <Header>
                      <Day>
                        {format(selectDay, "MM / dd")}
                        <DayOfWeek>{format(selectDay, "iii")}</DayOfWeek>
                      </Day>
                      {movie.watchWith.map((userInfo) => {
                        return (
                          <>
                            <WatchWithPic photoURL={userInfo.photoURL} />
                            <WatchWithName>{userInfo.name}</WatchWithName>
                          </>
                        );
                      })}
                      {movie.scheduleOwner === uid && (
                        <>
                          <DeleteIcon
                            onClick={() => {
                              deleteMovie(movie.event_doc_id);
                            }}
                          />
                          <EditLink to={`/edit/${movie.doc_id}`}>
                            <EditIcon />
                          </EditLink>
                        </>
                      )}
                    </Header>

                    <Wrap>
                      <Link to={`/movie/${movie.movieInfo.id}`}>
                        <MovieName>{movie.movieInfo.original_title}</MovieName>
                      </Link>
                      <StarWrapper>
                        <DisplayStar
                          starPoints={movie.movieInfo.vote_average}
                        />
                      </StarWrapper>
                      <SubInfo>
                        Release Date | {movie.movieInfo.release_date}
                      </SubInfo>
                      <SubInfo>Reviews | {movie.movieInfo.vote_count}</SubInfo>
                      <OverView>{movie.movieInfo.overview}</OverView>
                    </Wrap>
                  </Container>
                );
              })}
            </Slider>
          </Wrapper>
        </>
      )}
    </>
  );
}

const iconStyle = {
  fontSize: "1.9rem",
  color: Color.Main,
  cursor: "pointer",
  WebkitFilter: "drop-shadow(0 2px 5px rgba(0, 0, 0, .5))",
  filter: "drop-shadow(0 2px 5px rgba(0, 0, 0, .5))",
  transition: ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
  },
};
const Mask = styled.section`
  z-index: 1;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Wrapper = styled.section`
  color: ${Color.Content};
  width: 55%;
  position: fixed;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  box-shadow: 2px 3px 50px rgba(0, 0, 0, 0.7);
  /* outline: 2px solid red; */
  /* background-color: #fff; */
`;
const Container = styled.main`
  padding: 20px 30px;
  background-image: url(https://image.tmdb.org/t/p/w1280/${(props) =>
    props.backdrop});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  height: 500px;
  color: white;
  background-color: ${Color.Background};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(90deg, ${Color.Background} 10%, transparent);
  }
`;
const Header = styled.div`
  position: relative;
  top: 0;
  display: flex;
  align-items: center;
  & * {
    margin-left: 10px;
  }
`;
const Wrap = styled.section`
  max-width: 50%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
`;
const Day = styled.h3`
  color: ${Color.Main};
  font-size: 2rem;
`;
const DayOfWeek = styled.span`
  font-size: 1rem;
  margin-left: 10px;
`;
const WatchWithPic = styled.div`
  background-image: url(${(props) => props.photoURL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-left: 20px;
`;
const WatchWithName = styled.p`
  font-size: 1rem;
  line-height: 1rem;
  margin-right: auto;
  margin-top: 14px;
`;
const WatchWithOthers = styled.span`
  margin-left: 15px;
  font-size: 1rem;
`;
const MovieName = styled.h1`
  /* word-break: break-all; */
  word-break: break-word;
  font-size: 2.5rem;
  width: 100%;
`;
const StarWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  font-size: 20px;
  color: ${Color.Main};
`;
const SubInfo = styled.span`
  display: inline-block;
  margin-top: 5px;
  margin-right: 20px;
  font-weight: 200;
`;
const OverView = styled.p`
  overflow-y: scroll;
  height: 150px;
  letter-spacing: 1px;
  margin-top: 30px;
  font-weight: 300;
  line-height: 1.6;
  /* word-break: break-all; */
  word-break: break-word;
`;
// const IconWrap = styled.div`
//   display: flex;
//   justify-content: center;
// `;
const DeleteIcon = styled(MdDelete)`
  ${iconStyle};
  margin-left: auto;
`;
const EditIcon = styled(FaPen)`
  ${iconStyle};
  font-size: 1.5rem;
  margin-left: 1rem;
`;
const EditLink = styled(Link)`
  padding-top: 4px;
  display: inline-block;
`;
// const Gradient = styled.div`
//   /* display: flex; */
//   /* align-items: center; */
//   /* padding-top: 150px; */
//   width: 100%;

//   height: 100%;
//   /* position: relative;
//   top: 40%; */
//   background: linear-gradient(90deg, ${Color.Background} 10%, transparent);
//   color: ${Color.Content};
// `;
export default Info;
