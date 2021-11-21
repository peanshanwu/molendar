import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Background from "../../image/member-bg.png";
import PersonalCalendar from "./PersonalCalendar";
import Profile from "./Profile";
import * as Color from "../../components/layout/Color";
import { ImCheckmark, ImCross } from "react-icons/im";
import { IoPersonAdd } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import firebase from "../../utils/firebase";
import { fetchMovie } from "../../utils/api";
import { format } from "date-fns";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NowPlaying from "./NowPlaying";

function Personal({ uid, userList, myCalendarMovies, calendarMoviesInfo }) {
  // 如果沒有登入導到首頁
  // const history = useHistory();
  // if (!uid) {
  //   history.push("/");
  // }

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

  // slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
          // onSnapshot( callback function )：當監聽有變動，執行callback function
          // setMovieInviteInfo([]); //要做清空的動作！不然會一直累加上去（後來發現用set的方式，不會即時顯示，所以要先用另一個arr存）

          let invitationArr = [];

          // 時間排序
          let arr = [];
          querySnapshot.forEach((docRef) => {
            console.log(docRef);
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

  console.log(userList);
  console.log(currentUserInfo);
  console.log(friendListInfo);
  console.log(`movieInviteInfo`, movieInviteInfo);

  return (
    <>
      {currentUserInfo && (
        <>
          <Wrapper2 />
          <Wrapper>
            <Main>
              <Container>
                <Profile currentUserInfo={currentUserInfo} />
                <Wrap>
                  <Wrap2>
                    <List>
                      <Title>My Friend List</Title>
                      <Wrap4>
                        <SearchFriend
                          type="text"
                          value={searchFriend}
                          onChange={(e) => setSearchFriend(e.target.value)}
                          placeholder="enter email to search friend"
                        />
                        <SearchIcon
                          onClick={() => {
                            handleSearchFriend(searchFriend);
                          }}
                        />
                      </Wrap4>
                      {friendListInfo.map((friend) => {
                        return (
                          <Wrap4>
                            <Photo photoURL={friend.photoURL} />
                            <Name>{friend.name}</Name>
                          </Wrap4>
                        );
                      })}
                    </List>
                    <List>
                      <Title>Friend Request</Title>
                      {friendInviteInfo.map((friendInfo) => {
                        return (
                          <Wrap4>
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
                          </Wrap4>
                        );
                      })}
                    </List>
                  </Wrap2>
                  <Wrap3>
                    {movieInviteInfo.length === 0 ? (
                      <NowPlaying />
                    ) : (
                      <Slider {...settings}>
                        {movieInviteInfo?.map((invitation) => {
                          return (
                            <SubContainer
                              backdrop={invitation.movieInfo.backdrop_path}
                            >
                              <Gradient>
                                <MovieDate>
                                  {format(
                                    new Date(
                                      invitation.date[0],
                                      invitation.date[1] - 1,
                                      invitation.date[2]
                                    ),
                                    "MM/dd"
                                  )}
                                  <span>
                                    {format(
                                      new Date(
                                        invitation.date[0],
                                        invitation.date[1] - 1,
                                        invitation.date[2]
                                      ),
                                      "iii"
                                    )}
                                  </span>
                                </MovieDate>
                                <Wrap4>
                                  <Photo
                                    photoURL={invitation.userInfo.photoURL}
                                  />
                                  <Name>
                                    {invitation.userInfo.name}
                                    <span>
                                      wants to invite you to watch ...
                                    </span>
                                  </Name>
                                </Wrap4>
                                <MovieName>
                                  {invitation.movieInfo?.original_title}
                                </MovieName>
                                <InvitationIconWrap>
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
                                      cancelMovieInvitation(
                                        invitation.invitation_id
                                      );
                                    }}
                                  />
                                </InvitationIconWrap>
                              </Gradient>
                            </SubContainer>
                          );
                        })}
                      </Slider>
                    )}
                  </Wrap3>
                </Wrap>
                <PersonalCalendar
                  setSelectDay={setSelectDay}
                  selectDay={selectDay}
                  uid={uid}
                  userList={userList}
                  myCalendarMovies={myCalendarMovies}
                  calendarMoviesInfo={calendarMoviesInfo}
                />
              </Container>
            </Main>
          </Wrapper>
        </>
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
  min-height: calc(100vh - 130px);
  width: 100%;
  position: relative;
  background-image: url(${Background});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${Color.Background};
`;
const Wrapper2 = styled.section`
  width: 100%;
  height: 280px;
  position: relative;
  background-color: ${Color.Background};
`;
const Main = styled.main`
  width: calc(100% - 80px);
  position: relative;
  top: -230px;
  left: 80px;
`;
const Container = styled.div`
  max-width: 1400px;
  width: 90%;
  margin: 0 auto;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${Color.Content};
  margin-bottom: 100px;
`;
const Wrap2 = styled.div`
  width: 25%;
`;
const Wrap3 = styled.div`
  width: 70%;
`;
const Title = styled.h3`
  text-align: center;
  font-weight: 500;
  color: ${Color.Content};
  font-size: 1.2rem;
  margin-bottom: 20px;
`;
const List = styled.div`
  background-color: ${Color.Sub};
  width: 100%;
  margin-bottom: 15px;
  padding: 25px 20px;
  overflow-y: scroll;
  height: 250px;
`;
const Wrap4 = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
// const List = styled.div`
//   width: 32%;
//   outline: 1px solid gray;
//   margin-top: 30px;
//   padding: 20px 40px;
//   overflow-y: scroll;
//   height: 300px;
// `;
const SearchFriend = styled.input`
  height: 40px;
  width: 100%;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: ${Color.Content};
  background-color: ${Color.Dark};
  border-radius: 50px;
  padding: 10px;
`;
const SearchIcon = styled(IoPersonAdd)`
  ${iconStyle};
  position: absolute;
  top: 8px;
  right: 10px;
`;
const SubContainer = styled.div`
  background-image: url(https://image.tmdb.org/t/p/w1280/${(props) =>
    props.backdrop});
  background-color: ${Color.Background};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 515px;
  color: ${Color.Content};
  display: flex;
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
  width: 25px;
  height: 25px;
`;
const Name = styled.p`
  margin-left: 10px;
  font-size: 1rem;
  color: ${Color.Content};
  font-weight: 200;
  line-height: 2rem;

  & span {
    margin-left: 0.5rem;
    color: ${Color.Light};
  }
`;
const IconWrap = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
`;
const InvitationIconWrap = styled.div`
  position: absolute;
  bottom: 30px;
  right: 40px;
`;
const Accept = styled(ImCheckmark)`
  ${iconStyle}
  margin-right: 40px;
`;
const Cansel = styled(ImCross)`
  ${iconStyle}
  font-size: 1.25rem;
`;
const Gradient = styled.div`
  /* display: flex; */
  /* align-items: center; */
  padding-top: 150px;
  padding-left: 5%;
  width: 100%;
  height: 60%;
  position: relative;
  top: 40%;
  background: linear-gradient(360deg, ${Color.Background} 20%, transparent);
  color: ${Color.Content};
`;
const MovieDate = styled.p`
  color: ${Color.Main};
  font-size: 1.5rem;
  font-weight: 200;
  letter-spacing: 2px;

  & span {
    font-size: 0.5rem;
    margin-left: 0.5rem;
  }
`;
const MoviePoster = styled.img``;
const MovieName = styled.h3`
  font-size: 2rem;
  font-weight: 200;
  word-break: break-word;
`;
export default Personal;
