import React, { useEffect } from "react";
import { useState } from "react";
import { format, getDate, isSameDay } from "date-fns";
import useCalendar, { WEEKS } from "../../components/calendar/useCalendar.js";
import * as Styled from "../../components/calendar/Calendar-styled";
import styled from "styled-components";
import Info from "./Info";
import firebase from "../../utils/firebase";
import { fetchMultiMovies } from "../../utils/api.js";

// setSelectDay={setSelectDay}
// selectDay={selectDay}
// uid={uid}
// userList={userList}
// myCalendarMovies={myCalendarMovies}
// calendarMoviesInfo={calendarMoviesInfo}

const PersonalCalendar = ({
  selectDay,
  setSelectDay,
  uid,
  userList,
  myCalendarMovies,
  calendarMoviesInfo,
}) => {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [startDay, setStartDay] = useState(new Date());
  const [popupClick, setPopupClick] = useState(false);
  // const [myCalendarMovies, setMyMovies] = useState([])
  // const [movieInfo, setMovieInfo] = useState([])
  const calendar = useCalendar(startDay, setStartDay);

  const selectDate = (date) => {
    setSelectDay(date);
  };

  // useEffect(() => {

  //   uid && (
  // 		userRef.doc(uid).collection('user_calendar').get()
  // 		.then((snapshot) => {
  // 			let myMoviesArr = [];
  // 			snapshot.docs.forEach(doc => {
  // 				myMoviesArr.push(doc.data())
  // 			})
  // 			setMyMovies(myMoviesArr)
  // 			return myMoviesArr
  // 		})
  // 		.then((myMoviesArr) => {
  // 			fetchMultiMovies(myMoviesArr)
  // 			.then((movieInfo) => {
  // 				setMovieInfo(movieInfo)
  // 			})
  // 		})
  //     .catch(err => {
  //       console.log(`err`,err);
  //       console.log(`err status`,err.code);
  //     })
  // 	)

  // }, [])

  function getMovieId(date) {
    if (myCalendarMovies.length) {
      return myCalendarMovies.filter((myMovie) => {
        const y = myMovie.date[0];
        const m = myMovie.date[1] - 1;
        const d = myMovie.date[2];
        return isSameDay(date, new Date(y, m, d));
      });
    } else {
      return [];
    }
  }

  function getMovieInfo(arr) {
    if (arr.length) {
      const movieId = arr[0].movie_id;
      if (calendarMoviesInfo.length) {
        return calendarMoviesInfo.find((movie) => {
          return movie.id === movieId;
        });
      }
    }
  }

  return (
    <>
      <Info
        uid={uid}
        popupClick={popupClick}
        setPopupClick={setPopupClick}
        myCalendarMovies={myCalendarMovies}
        calendarMoviesInfo={calendarMoviesInfo}
        selectDay={selectDay}
        userList={userList}
      />

      <Styled.PersonalCalendar>
        <thead>
          <tr>
            <td colSpan="100%">
              <PreMonthBtn onClick={calendar.setPreMonth}>◀</PreMonthBtn>
              {format(startDay, "MMMM ")}
              {format(startDay, "yyyy")}
              <NextMonthBtn onClick={calendar.setNextMonth}>▶</NextMonthBtn>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {WEEKS.map((title, i) => {
              return <td key={i}>{title}</td>;
            })}
          </tr>
          {calendar.days.map((week, i) => {
            return (
              <tr key={i}>
                {week.map((date, i) => {
                  const otherMonth = date.otherMonth;
                  const isSelected = isSameDay(selectDay, date.date);
                  const className = `${otherMonth && "other"} ${
                    isSelected && "selected"
                  }`;
                  const selectedToday = () => {
                    selectDate(date.date);
                  };
                  return (
                    <td
                      key={i}
                      className={className}
                      onClick={() => {
                        selectedToday();
                        if (getMovieId(date.date).length) {
                          setPopupClick(true);
                        }
                      }}
                    >
                      {getDate(date.date)}

                      {getMovieId(date.date).length !== 0 && (
                        <MovieContainer>
                          <Mask />
                          <MovieName>
                            {calendarMoviesInfo.length !== 0 &&
                              getMovieInfo(getMovieId(date.date))
                                .original_title}
                          </MovieName>
                          <Poster
                            src={
                              calendarMoviesInfo.length !== 0 &&
                              `https://image.tmdb.org/t/p/w500/${
                                getMovieInfo(getMovieId(date.date)).poster_path
                              }`
                            }
                            alt=""
                          />
                        </MovieContainer>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Styled.PersonalCalendar>
    </>
  );
};

const PreMonthBtn = styled.button`
  border-color: transparent;
  background-color: #fff;
  margin-right: 30px;
`;
const NextMonthBtn = styled.button`
  border-color: transparent;
  background-color: #fff;
  margin-left: 30px;
`;
const Poster = styled.img`
  width: 100%;
`;
// const Poster = styled.div`
//  width: 100%;
// 	height: 300px;
// 	background-image: url(https://image.tmdb.org/t/p/w500//cm2ffqb3XovzA5ZSzyN3jnn8qv0.jpg);
// 	background-size: contain;
// `
const Td = styled.td`
  background-image: url(https://image.tmdb.org/t/p/w500//cm2ffqb3XovzA5ZSzyN3jnn8qv0.jpg);
  background-size: contain;
`;
const MovieContainer = styled.div`
  width: 100%;
  position: relative;
`;
const Mask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: ease-in 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }
`;
const MovieName = styled.h3`
  position: absolute;
  font-size: 1.2rem;
`;

export default PersonalCalendar;
