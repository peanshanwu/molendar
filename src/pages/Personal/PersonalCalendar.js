import React, { useEffect } from "react";
import { useState } from "react";
import { format, getDate, isSameDay } from "date-fns";
import useCalendar, { WEEKS } from "../../components/calendar/useCalendar.js";
import * as Styled from "../../components/calendar/Calendar-styled";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import Info from "./Info";
import firebase from "../../utils/firebase";
import * as BreakPoint from "../../components/layout/BreakPoints"
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

  console.log(calendarMoviesInfo);

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
          <Styled.MonthControl>
            <td colSpan="100%">
              {/* <PreMonthBtn onClick={calendar.setPreMonth}>◀</PreMonthBtn> */}
              <PreMonthBtn onClick={calendar.setPreMonth}>《</PreMonthBtn>
              {format(startDay, "MMMM ")}
              {format(startDay, "yyyy")}
              <NextMonthBtn onClick={calendar.setNextMonth}>》</NextMonthBtn>
            </td>
          </Styled.MonthControl>
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
                    <Styled.Td
                      bgImg={`https://image.tmdb.org/t/p/w500/${
                        getMovieInfo(getMovieId(date.date))?.poster_path
                      }`}
                      key={i}
                      className={className}
                      onClick={() => {
                        selectedToday();
                        if (getMovieId(date.date).length) {
                          setPopupClick(true);
                        }
                      }}
                    >
                      <DayNum>{getDate(date.date)}</DayNum>

                      {getMovieId(date.date).length > 0 && (
                        <>
                          <Mask />
                          <MovieContainer>
                            <MovieName>
                              {calendarMoviesInfo.length > 0 &&
                                getMovieInfo(getMovieId(date.date))
                                  ?.original_title}
                            </MovieName>
                          </MovieContainer>
                          {getMovieId(date.date).length > 1 ? (
                            <>
                              <More>More</More>
                              <MoreForPhone />
                            </>
                          ) : null}
                        </>
                      )}
                    </Styled.Td>
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
  color: ${Color.Content};
  font-size: 1.5rem;
  margin-right: 30px;
`;
const NextMonthBtn = styled.button`
  border-color: transparent;
  color: ${Color.Content};
  font-size: 1.5rem;
  margin-left: 30px;
`;
const DayNum = styled.p`
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`;
const MovieContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Mask = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  transition: ease-in 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0);
  }
`;
const MovieName = styled.h3`
  /* word-break: break-all; */
  /* word-break: break-word; */
  /* position: absolute; */
  font-size: 1.4rem;
  font-size: 300;
  margin-top: 20px;
  cursor: pointer;
  @media (max-width: 1000px) {
    display: none;
  }
`;
const More = styled.p`
  width: 60%;
  font-size: 1rem;
  font-weight: 400;
  margin-top: 0;
  color: ${Color.Main};
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid ${Color.Main};
  border-radius: 50px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  @media (max-width: ${BreakPoint.sm}) {
    display: none;
  }
`;
const MoreForPhone = styled.div`
  display: none;
  background-color: ${Color.Main};
  width: 10px;
  height: 10px;
  border-radius: 50px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  @media (max-width: ${BreakPoint.sm}) {
    display: block
  }
`

export default PersonalCalendar;
