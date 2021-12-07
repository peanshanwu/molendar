import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Background from "../../image/member-bg.png";
import PersonalCalendar from "./PersonalCalendar";
import Profile from "./Profile";
import FriendList from "./FriendList";
import * as Color from "../../components/layout/Color";
import firebase from "../../utils/firebase";
import { fetchMovie } from "../../utils/api";
import NowPlaying from "./NowPlaying";
import { Main, MaxWidthContainer } from "../../components/layout/Container";
import Loading from "../../components/layout/Loading";
import FriendRequest from "./FriendRequest";
import MovieInvite from "./MovieInvite";
import * as BreakPoint from "../../components/layout/BreakPoints";

function Personal({ uid, userList, myCalendarMovies, calendarMoviesInfo }) {

  const db = firebase.firestore();
  const userRef = db.collection("users");
  const movieInviteRef = db.collection("movie_invitations");
  const friendInviteRef = db.collection("friend_invitations");
  const [selectDay, setSelectDay] = useState(new Date());
  const [friendListInfo, setFriendListInfo] = useState([]);
  const [friendInviteInfo, setFriendInviteInfo] = useState([]);
  const [movieInviteInfo, setMovieInviteInfo] = useState([]);
  const [currentUserInfo, setCurrnetUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 對currentUser的doc作監聽
  useEffect(() => {
    if (uid) {
      const unsubscribe = userRef.doc(uid).onSnapshot((doc) => {
        setCurrnetUserInfo(doc.data());
      });
      return () => {
        unsubscribe();
      };
    }
  }, [uid]);

  // friend list
  useEffect(() => {
    if (userList.length > 0 && currentUserInfo) {
      setFriendListInfo(
        userList.filter((user) =>
          currentUserInfo.friend_list.includes(user.uid)
        )
      );
    }
  }, [userList, currentUserInfo]);

  // friend invitation
  useEffect(() => {
    if (uid) {
      friendInviteRef.where("to", "==", uid).onSnapshot((querySnapshot) => {
        let friendInviteArr = [];
        querySnapshot.forEach((docRef) => {
          friendInviteArr.push(docRef.id.split("-")[0]);
        });
        setFriendInviteInfo(
          userList.filter((user) => friendInviteArr.includes(user.uid))
        );
        setIsLoading(false);
      });
    }
  }, [uid, userList]);

  // movie invitation
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      // 先把給currentUser的movieInvitation篩選出來
      if (uid && userList.length > 0) {
        movieInviteRef.where("to", "==", uid).onSnapshot((querySnapshot) => {
          // onSnapshot( callback function )：當監聽有變動，執行callback function
          // setMovieInviteInfo([]); //要做清空的動作！不然會一直累加上去（後來發現用set的方式，不會即時顯示，所以要先用另一個arr存）

          let invitationArr = [];

          // 時間排序
          let arr = [];
          querySnapshot.forEach((docRef) => {
            arr.push(docRef.data());
          });
          arr.sort((a, b) => {
            return a.sendTime < b.sendTime ? 1 : -1;
            // 1: b排序在a前（新到舊)
            // -1: a排序在b前(舊到新)
          });

          // 做成obj
          arr.forEach((invite) => {
            let inviteInfo = {};

            inviteInfo.date = invite.date; // 獲得date
            inviteInfo.invitation_id = invite.invitation_id; // 獲得invitation_id
            inviteInfo.event_doc_id = invite.event_doc_id; // 獲得event_doc_id
            inviteInfo.userInfo = userList.filter(
              // 取得userInfo
              (user) => invite.from === user.uid
            )[0];
            fetchMovie(invite.movie_id) // 取得userInfo
              .then((res) => {
                inviteInfo.movieInfo = res;
              })
              .then(() => {
                // 放入array
                invitationArr.push(inviteInfo);
                setMovieInviteInfo([...invitationArr]); // setState視array為同一個array（即使裡面的值有改變）因此要用展開的方式，存入一個新array，再放入setState

                setIsLoading(false);

                // setMovieInviteInfo((movieInviteInfo) => {
                //   console.log(movieInviteInfo);
                //   return [...movieInviteInfo, inviteInfo];
                // });
              });
          });
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [uid, userList]);


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {currentUserInfo && (
            <Main>
              <Background1 />
              <Background2>
                <UpContainer>
                  <Container>
                    <Profile currentUserInfo={currentUserInfo} />
                    <InfoWrap>
                      <Div1>
                        <FriendList
                          friendListInfo={friendListInfo}
                          userList={userList}
                          uid={uid}
                        />
                        <FriendRequest
                          friendInviteInfo={friendInviteInfo}
                          uid={uid}
                        />
                      </Div1>
                      <Div2>
                        {movieInviteInfo.length === 0 ? (
                          <NowPlaying />
                        ) : (
                          <MovieInvite
                            uid={uid}
                            movieInviteInfo={movieInviteInfo}
                            setMovieInviteInfo={setMovieInviteInfo}
                          />
                        )}
                      </Div2>
                    </InfoWrap>
                    <PersonalCalendar
                      setSelectDay={setSelectDay}
                      selectDay={selectDay}
                      uid={uid}
                      userList={userList}
                      myCalendarMovies={myCalendarMovies}
                      calendarMoviesInfo={calendarMoviesInfo}
                    />
                  </Container>
                </UpContainer>
              </Background2>
            </Main>
          )}
        </>
      )}
    </>
  );
}

const Background1 = styled.section`
  width: 100%;
  height: 280px;
  position: relative;
  background-color: ${Color.Background};
`;
const Background2 = styled.section`
  width: 100%;
  position: relative;
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${Color.Background};
`;

const UpContainer = styled.div`
  position: relative;
  top: -210px;
`;
const Container = styled(MaxWidthContainer)`
  width: 90%;
  @media (max-width: ${BreakPoint.sm}) {
    width: 85%;
  }
`;
const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${Color.Content};
  margin-bottom: 100px;
  @media (max-width: 1000px) {
    flex-direction: column-reverse;
  }
`;
const Div1 = styled.div`
  width: 25%;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const Div2 = styled.div`
  width: 70%;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export default Personal;
