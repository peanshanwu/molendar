import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import swal from "sweetalert";
import * as BreakPoint from "../../components/layout/BreakPoints"

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
        movieScheduleObj.movieInfo = oneMovie; // 獲取電影資訊，存入obj裡面的movieInfo欄位

        let watchWithInfoArr = [];
        // 做成用來render的資料前，先篩掉是currentUser的id
        const watchWithNoCurrentUser = schedule.watchWith.filter(
          (watchWith) => watchWith !== uid
        );
        watchWithInfoArr = watchWithNoCurrentUser.map((watchWith) => {
          return userList.find((user) => watchWith === user.uid);
        });
        movieScheduleObj.watchWith = watchWithInfoArr; // 根據watchWith id array，轉換成info，存入obj的watchWith欄位

        return movieScheduleObj;
      });
      setSelectDayOfMoviesInfo(movieInfos);
    }
  }, [selectDayOfMyMovies]);

  function deleteMovie(delete_doc_id) {
    swal({
      title: "Are you sure?",
      text: "Once you delete, others calendar delete, too",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // 所有行程刪除
        db.collectionGroup("user_calendar")
          .where("event_doc_id", "==", delete_doc_id)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((docRef) => {
              const docData = docRef.data();
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
        swal("Deleted!", {
          icon: "success",
          buttons: false,
          timer: 1500,
        });
      } else {
        swal("Maybe think about it is right!", { button: false, timer: 1500 });
      }
    });
  }

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
                          <WatchWithWrap>
                            <WatchWithPic photoURL={userInfo.photoURL} />
                            <WatchWithName>{userInfo.name}</WatchWithName>
                          </WatchWithWrap>
                        );
                      })}
                      {movie.scheduleOwner === uid && (
                        <IconWrap>
                          <DeleteIcon
                            onClick={() => {
                              deleteMovie(movie.event_doc_id);
                            }}
                          />
                          <EditLink to={`/edit/${movie.doc_id}`}>
                            <EditIcon />
                          </EditLink>
                        </IconWrap>
                      )}
                    </Header>

                    <Wrap>
                      <Link to={`/movie/${movie.movieInfo?.id}`}>
                        <MovieName>{movie.movieInfo?.original_title}</MovieName>
                      </Link>
                      <StarWrapper>
                        <DisplayStar
                          starPoints={movie.movieInfo?.vote_average}
                        />
                      </StarWrapper>
                      <SubInfo>
                        Release Date | {movie.movieInfo?.release_date}
                      </SubInfo>
                      <SubInfo>Reviews | {movie.movieInfo?.vote_count}</SubInfo>
                      <OverView>{movie.movieInfo?.overview}</OverView>
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
  z-index: 2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Wrapper = styled.section`
  color: ${Color.Content};
  width: 70%;
  position: fixed;
  z-index: 2;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 2px 3px 50px rgba(0, 0, 0, 0.7);
  @media (max-width: 1000px) {
    width: 90%;
  }
`;
const Container = styled.main`
  padding: 20px 30px;
  background-image: url(https://image.tmdb.org/t/p/w1280/${(props) => props.backdrop});
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  background-position: center;
  height: 500px;
  color: white;
  background-color: ${Color.Background};
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 40%;
    background: linear-gradient(90deg, ${Color.Background} 10%, transparent);
  }
  @media (max-width: 1000px) {
    height: 400px;
  }
`;
const Header = styled.div`
  position: relative;
  top: 0;
  display: flex;
  align-items: center;
  @media (max-width: ${BreakPoint.sm}){
    flex-direction: column;
    align-items: flex-start;
  }
`;
const Wrap = styled.section`
  max-width: 50%;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  @media (max-width: ${BreakPoint.lg}) {
    max-width: 70%;
  }
  @media (max-width: ${BreakPoint.sm}){
    max-width: 100%;
  }
`;
const Day = styled.h3`
  color: ${Color.Main};
  font-size: 2rem;
`;
const DayOfWeek = styled.span`
  font-size: 1rem;
  margin-left: 10px;
`;
const WatchWithWrap = styled.div`
  padding-top: 12px;
  margin-left: 20px;
  display: flex;
  align-content: center;
  @media (max-width: ${BreakPoint.sm}){
    margin-left: 0;
  }
`;
const WatchWithPic = styled.div`
  background-image: url(${(props) => props.photoURL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;
const WatchWithName = styled.p`
  margin-left: 0.5rem;
`;
const MovieName = styled.h1`
  /* word-break: break-all; */
  word-break: break-word;
  font-size: 2.5rem;
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
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
  letter-spacing: 1px;
  margin-top: 30px;
  font-weight: 300;
  /* word-break: break-all; */
  /* word-break: break-word; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  @media (max-width: ${BreakPoint.sm}){
    display: none;
  }
`;
const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 10px;
`;
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

export default Info;
