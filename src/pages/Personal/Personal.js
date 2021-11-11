import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Background from "../../image/member-bg.png";
import PersonalCalendar from "./PersonalCalendar";
import Profile from "./Profile";
import * as Color from "../../components/layout/Color";
import { ImCheckmark, ImCross } from "react-icons/im";
import { FaSearch } from "react-icons/fa";
import firebase from "../../utils/firebase";
import { fetchMovie } from "../../utils/api";
import { format } from "date-fns";

function Personal({ uid, userList, myCalendarMovies, calendarMoviesInfo }) {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const movieInviteRef = db.collection("movie_invitations");
  const friendInviteRef = db.collection("friend_invitations");
  const [selectDay, setSelectDay] = useState(new Date());
  const [friendListInfo, setFriendListInfo] = useState([]);
  const [friendInviteInfo, setFriendInviteInfo] = useState([]);
  const [searchFriend, setSearchFriend] = useState("");
  const [movieInviteInfo, setMovieInviteInfo] = useState([]);
  const [currentUserInfo, setCurrnetUserInfo] = useState(null);

  // ---------------- POC ----------------
  // function test() {
  //   db.collectionGroup("user_calendar")
  //     .where("doc_id", "==", "2iK7iWM2aIUqGZPWfYRJ")
  //     .get()
  //     .then((querySnapshot) => {
  //       let arr = [];
  //       querySnapshot.forEach((doc) => {
  //         arr.push(doc.data());
  //       });
  //       console.log(arr);
  //     });
  // }
  // ---------------- POC ----------------

  // ---------------- POC ----------------
  // function test() {
  //   const data = {
  //     date: [11, 22, 33],
  //     // movie_id: scheduleInfo.movie_id,
  //     watchWith: ["shan", "wu"],
  //     // doc_id: paramId,
  //     // scheduleOwner: uid,
  //   };
  //   userRef
  //     .doc(uid)
  //     .collection("user_calendar")
  //     .doc("XrQNdtsay4JIumUwYPGt")
  //     .set(data, { merge: true })
  //     .then(() => {
  //       console.log("set!");
  //     })
  //     .catch((err) => console.log(err));
  // }
  // ---------------- POC ----------------

  function acceptFriend(friendUid) {
    // 加入雙方friend_list
    userRef.doc(uid).update({
      friend_list: firebase.firestore.FieldValue.arrayUnion(friendUid),
    });
    userRef.doc(friendUid).update({
      friend_list: firebase.firestore.FieldValue.arrayUnion(uid),
    });
    // 移除朋友邀請
    friendInviteRef
      .doc(`${friendUid}-${uid}`)
      .delete()
      .then(() => {
        console.log("deleted!");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function canselFriend(friendUid) {
    // 移除朋友邀請
    friendInviteRef
      .doc(`${friendUid}-${uid}`)
      .delete()
      .then(() => {
        console.log("deleted!");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function cancelMovieInvitation(invitation_id) {
    // 刪除電影邀請
    movieInviteRef
      .doc(invitation_id)
      .delete()
      .then(() => {
        console.log("movie invite delete");
      });
    window.alert("cancel the movie invitation");
  }
  function acceptMovieInvitation(
    scheduleOwner,
    invitation_id,
    event_doc_id,
    date,
    movie_id
  ) {
    // 刪除電影邀請
    movieInviteRef
      .doc(invitation_id)
      .delete()
      .then(() => {
        console.log("movie invite delete");
      });

    db.collectionGroup("user_calendar")
      .where("event_doc_id", "==", event_doc_id)
      .get()
      .then((querySnapshot) => {
        let originWatchWithArr = [];

        // 將currnetUser加入所有人的watchWith
        querySnapshot.forEach((docRef) => {
          const docData = docRef.data();
          originWatchWithArr = [...docData.watchWith];
          console.log(docData);
          userRef
            .doc(docData.uid)
            .collection("user_calendar")
            .doc(docData.doc_id)
            .set({ watchWith: [...docData.watchWith, uid] }, { merge: true });
          console.log(originWatchWithArr);
        });
        // 加入currentUser的calendar
        const scheduleData = {
          scheduleOwner,
          date,
          event_doc_id,
          movie_id,
          watchWith: [...originWatchWithArr, uid],
          uid: uid,
        };
        console.log(`originWatchWithArr`, originWatchWithArr);
        userRef
          .doc(uid)
          .collection("user_calendar")
          .add(scheduleData)
          .then((docRef) => {
            window.alert("Add to Calendar");
            console.log("Document written with ID: ", docRef.id);
            userRef
              .doc(uid)
              .collection("user_calendar")
              .doc(docRef.id)
              .set({ doc_id: docRef.id }, { merge: true });
          });
      });
  }
  function sendFriendInvitation(friendInfo) {
    friendInviteRef.doc(`${uid}-${friendInfo.uid}`).set({
      from: uid,
      to: friendInfo.uid,
    });
    window.alert(`you send a friend invitaion to "${friendInfo.name}"`);
  }
  function handleSearchFriend(value) {
    const userInfo = userList.find((user) => user.email === value);
    // userInfo ? window.alert(userInfo.name) : window.alert("no user");

    if (userInfo) {
      window.confirm(`do you want to add "${userInfo.name}" as your friend`)
        ? sendFriendInvitation(userInfo)
        : console.log("hi");
    } else {
      window.alert("no user");
    }
  }

  // 對currentUser的doc作監聽
  useEffect(() => {
    if (uid) {
      const unsubscribe = userRef.doc(uid).onSnapshot((doc) => {
        console.log(doc.data());
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
          setMovieInviteInfo([]); //要做清空的動作！不然會一直累加上去

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
            // 獲得date
            // 獲得invitation_id
            // 獲得event_doc_id
            // 取得userInfo
            // 取得movieInfo
            inviteInfo.date = invite.date;
            inviteInfo.invitation_id = invite.invitation_id;
            inviteInfo.event_doc_id = invite.event_doc_id;
            inviteInfo.userInfo = userList.filter(
              (user) => invite.from === user.uid
            )[0];
            fetchMovie(invite.movie_id)
              .then((res) => {
                inviteInfo.movieInfo = res;
              })
              .then(() => {
                // 放入array
                setMovieInviteInfo((movieInviteInfo) => [
                  ...movieInviteInfo,
                  inviteInfo,
                ]);
              });
          });
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [uid, userList]);

  console.log(userList);
  console.log(currentUserInfo);
  console.log(friendListInfo);
  console.log(`movieInviteInfo`, movieInviteInfo);

  return (
    <>
      {currentUserInfo && (
        <Wrapper>
          <Main>
            <Container>
              {/* ---------------- POC ---------------- */}
              {/* <button onClick={test}>click</button> */}
              {/* ---------------- POC ---------------- */}
              <Profile currentUserInfo={currentUserInfo} />
              <PersonalCalendar
                setSelectDay={setSelectDay}
                selectDay={selectDay}
                uid={uid}
                userList={userList}
                myCalendarMovies={myCalendarMovies}
                calendarMoviesInfo={calendarMoviesInfo}
              />
              <Wrap>
                <List>
                  <Title>Friend List</Title>
                  <SearchFriend
                    type="text"
                    value={searchFriend}
                    onChange={(e) => setSearchFriend(e.target.value)}
                    placeholder="enter email to search user"
                  />
                  <SearchIcon
                    onClick={() => {
                      handleSearchFriend(searchFriend);
                    }}
                  />
                  {friendListInfo.map((friend) => {
                    return (
                      <SubContainer>
                        <Photo photoURL={friend.photoURL} />
                        <Name>{friend.name}</Name>
                      </SubContainer>
                    );
                  })}
                </List>
                <List>
                  <Title>Friend Invitation</Title>

                  {friendInviteInfo.map((friendInfo) => {
                    return (
                      <SubContainer>
                        <Photo photoURL={friendInfo.photoURL} />
                        <Name>{friendInfo.name}</Name>
                        <IconWrap>
                          <Accept
                            onClick={() => acceptFriend(friendInfo.uid)}
                          />
                          <Cansel
                            onClick={() => canselFriend(friendInfo.uid)}
                          />
                        </IconWrap>
                      </SubContainer>
                    );
                  })}
                </List>
                <List>
                  <Title>Movie Invitation</Title>
                  {movieInviteInfo?.map((invitation) => {
                    return (
                      <SubContainer>
                        <div>
                          <Photo photoURL={invitation.userInfo.photoURL} />
                          <Name>{invitation.userInfo.name}</Name>
                          <MoviePoster
                            src={`https://image.tmdb.org/t/p/w500${invitation.movieInfo?.poster_path}`}
                          />
                          <MovieDate>
                            {format(
                              new Date(
                                invitation.date[0],
                                invitation.date[1],
                                invitation.date[2]
                              ),
                              "yyyy-MM-dd"
                            )}
                          </MovieDate>
                          <MovieName>
                            {invitation.movieInfo?.original_title}
                          </MovieName>
                        </div>
                        <IconWrap>
                          <Accept
                            onClick={() => {
                              acceptMovieInvitation(
                                invitation.userInfo.uid,
                                invitation.invitation_id,
                                invitation.event_doc_id,
                                invitation.date,
                                invitation.movieInfo.id
                              );
                            }}
                          />
                          <Cansel
                            onClick={() => {
                              cancelMovieInvitation(invitation.invitation_id);
                            }}
                          />
                        </IconWrap>
                      </SubContainer>
                    );
                  })}
                </List>
              </Wrap>
            </Container>
          </Main>
        </Wrapper>
      )}
    </>
  );
}

const iconStyle = {
  fontSize: "1.5rem",
  color: Color.Main,
  cursor: "pointer",
  transition: ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
  },
};
const Wrapper = styled.section`
  padding: 40px 0;
  position: relative;
  width: 100%;
  background-image: url(${Background});
  background-color: ${Color.Background};
`;
const Main = styled.main`
  width: calc(100% - 80px);
  padding-left: 80px;
  /* position: absolute;
  left: 80px; */
`;
const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${Color.Content};
`;
const Title = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;
const List = styled.div`
  width: 32%;
  outline: 1px solid gray;
  margin-top: 30px;
  padding: 20px 40px;
  overflow-y: scroll;
  height: 300px;
`;
const SearchFriend = styled.input`
  height: 50px;
  width: 100%;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: ${Color.Content};
  border: 1px solid ${Color.Content};
`;
const SearchIcon = styled(FaSearch)`
  ${iconStyle}
`;
const SubContainer = styled.div`
  color: ${Color.Content};
  display: flex;
  /* align-items: center; */
  margin-bottom: 30px;
  position: relative;
`;
const Photo = styled.div`
  /* background-color: #fff; */
  background-image: url(${(props) => props.photoURL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`;
const Name = styled.p`
  margin-left: 10px;
  font-size: 20px;
`;
const IconWrap = styled.div`
  position: absolute;
  right: 2px;
`;
const Accept = styled(ImCheckmark)`
  ${iconStyle}
  margin-right: 20px;
`;
const Cansel = styled(ImCross)`
  ${iconStyle}
  font-size: 1.25rem;
`;
const MovieDate = styled.p``;
const MoviePoster = styled.img``;
const MovieName = styled.h3``;
export default Personal;
