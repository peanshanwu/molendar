import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import background from "../../image/index-calendar-bg.png";
import Loading from "../../components/layout/Loading";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdPersonAddAlt1, MdAddCircle } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../../utils/firebase";
import { format } from "date-fns";
import { useSelector } from "react-redux";

function Edit({ uid, myCalendarMovies, userList, calendarMoviesInfo }) {
  const currentUserInfo = useSelector((state) => state.currentUserInfo);
  const history = useHistory();
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const movieInviteRef = db.collection("movie_invitations");
  const [movieName, setMovieName] = useState("");
  const [scheduleInfo, setScheduleInfo] = useState(null);
  const [selectDate, setSelectDate] = useState(new Date());
  const [watchWithInfo, setWatchWithInfo] = useState([]);
  const [friendListInfo, setFriendListInfo] = useState([]);
  const [inviteInfo, setInviteInfo] = useState([]);
  const [removeWatchWithUid, setRemoveWatchWithUid] = useState([]);
  // const { id } = useParams();
  const paramId = useParams().event_doc_id;

  // 設定scheduleInfo state
  useEffect(() => {
    if (myCalendarMovies.length > 0) {
      myCalendarMovies.forEach((item) => {
        if (item.doc_id === paramId) {
          setScheduleInfo(item);
        }
      });
    }
  }, [myCalendarMovies]);

  // 設定InviteInfo state
  useEffect(() => {
    if (currentUserInfo) {
      movieInviteRef
        .where("event_doc_id", "==", paramId)
        .onSnapshot((querySnapshot) => {
          console.log(querySnapshot.docs);
          var inviteIdArr = [];
          querySnapshot.forEach((docRef) => {
            inviteIdArr.push(docRef.data().to);
          });
          setInviteInfo(
            userList.filter((userInfo) => inviteIdArr.includes(userInfo.uid))
          );
        });
    }
  }, [currentUserInfo, userList]);

  // 設定select date state
  useEffect(() => {
    if (scheduleInfo) {
      setSelectDate(
        new Date(
          scheduleInfo.date[0],
          scheduleInfo.date[1] - 1,
          scheduleInfo.date[2]
        )
      );
    }
  }, [scheduleInfo]);

  // 設定movieName state
  useEffect(() => {
    if (scheduleInfo && calendarMoviesInfo.length > 0) {
      calendarMoviesInfo.forEach((item) => {
        if (item.id === scheduleInfo.movie_id) {
          setMovieName(item.original_title);
        }
      });
    }
  }, [scheduleInfo, calendarMoviesInfo]);

  // 設定watchWith state
  useEffect(() => {
    if (scheduleInfo && userList.length > 0 && uid) {
      // 先篩選掉是currnetUser
      let arr = [];
      const watchWithNoCurrentUser = scheduleInfo.watchWith.filter(
        (watchWith) => watchWith !== uid
      );
      watchWithNoCurrentUser.forEach((watchWith) => {
        userList.forEach((userInfo) => {
          if (watchWith === userInfo.uid) {
            arr.push(userInfo);
          }
        });
      });
      setWatchWithInfo(arr);
    }
  }, [scheduleInfo, userList, uid]); // 其中一個有變動，就會重新render，然後跑「這個」useEffect

  // 設定friendList state
  useEffect(() => {
    if (currentUserInfo?.friend_list?.length > 0 && userList.length > 0) {
      const inviteAndWatchWithIdsArr = inviteInfo
        .map((invite) => invite.uid)
        .concat(watchWithInfo.map((watchWith) => watchWith.uid));
      const filteredFriendList = currentUserInfo.friend_list.filter(
        (friend) => !inviteAndWatchWithIdsArr.includes(friend)
      );
      setFriendListInfo(
        userList.filter((user) => filteredFriendList.includes(user.uid))
      );
    }
  }, [inviteInfo, watchWithInfo, currentUserInfo, userList]);

  function changeSchedule(watchWithData, selectDateData) {
    if (watchWithData.length > 0) {
      db.collectionGroup("user_calendar")
        .where("event_doc_id", "==", paramId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((docRef) => {
            userRef
              .doc(docRef.data().uid)
              .collection("user_calendar")
              .doc(docRef.data().doc_id)
              .update({ date: selectDateData, watchWith: watchWithData });
          });
        });
    }
  }

  function removeWatchWithSchedule() {
    if (removeWatchWithUid.length > 0) {
      // 目的：刪除被移除者的電影行程

      // 先篩選出所有參與者的行程doc
      db.collectionGroup("user_calendar")
        .where("event_doc_id", "==", paramId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((docRef) => {
            const docData = docRef.data();
            console.log(docRef.data());
            // 比對是否符合removeWatchWithUid的uid
            removeWatchWithUid.forEach((removeUid) => {
              if (removeUid === docData.uid) {
                // 若是，刪除該行程
                userRef
                  .doc(removeUid)
                  .collection("user_calendar")
                  .doc(docData.doc_id)
                  .delete();
              }
            });
          });
        });
    }
  }
  function changeInvitation(selectDateData) {
    movieInviteRef
      .where("event_doc_id", "==", paramId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((docRef) => {
          const docData = docRef.data();
          movieInviteRef
            .doc(docData.invitation_id)
            .update({ date: selectDateData });
        });
      });
  }

  function sendInvitation(inviteUid, selectDateData) {
    console.log(selectDateData);
    console.log(paramId);
    console.log(uid);
    console.log(scheduleInfo.movie_id);
    const data = {
      date: selectDateData,
      event_doc_id: paramId,
      from: uid,
      to: inviteUid,
      movie_id: scheduleInfo.movie_id,
      sendTime: firebase.firestore.Timestamp.fromDate(new Date()),
    };
    movieInviteRef
      .add(data)
      .then((docRef) => {
        movieInviteRef
          .doc(docRef.id)
          .set({ invitation_id: docRef.id }, { merge: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function deleteInvitation(invitation_id) {
    movieInviteRef.doc(invitation_id).delete();
  }
  function editSave() {
    // 先統一轉好資料
    const movieInviteData = [...inviteInfo.map((invitation) => invitation.uid)];
    const selectDateData = format(selectDate, "yyyy-MM-dd")
      .split("-")
      .map((e) => e);
    const watchWithData = [
      uid,
      ...watchWithInfo.map((watchWith) => watchWith.uid),
    ];

    changeSchedule(watchWithData, selectDateData); // selectDate、watchWith更改：每個參與者的行程更改
    removeWatchWithSchedule(); // 處理watchWith，刪除被移除者的電影行程（之後擴充加上通知被移除者）
    changeInvitation(selectDateData); // selecDate更改：正在邀請中的invitation也要更改

    // 處理invitation --------------------------------------------------------------------------------------------

    // 比對
    movieInviteRef
      .where("event_doc_id", "==", paramId)
      .get()
      .then((querySnapshot) => {
        // 原始firebase無、最終state有｜ 新增邀請
        movieInviteData.forEach((invite) => {
          const originToArr = [];
          querySnapshot.forEach((docRef) => originToArr.push(docRef.data().to));
          // const originToArr = querySnapshot.docs.map(
          //   (docRef) => docRef.data().to
          // );
          // querySnapShot.docs是一個array，可以使用array方法，裡面包著一個特殊的東西，可以用data()
          if (!originToArr.includes(invite)) {
            sendInvitation(invite, selectDateData);
          }
        });

        // 原始firebase有、最終state無｜ 刪除邀請
        querySnapshot.forEach((docRef) => {
          const docData = docRef.data();
          console.log(movieInviteData);
          console.log(docData);

          if (!movieInviteData.includes(docData.to)) {
            deleteInvitation(docData.invitation_id);
          }
        });
      });

    history.push("/personal");
  }
  function removeWatchwith(removeUid) {
    if (window.confirm("Do you really want to delete?")) {
      setWatchWithInfo(
        watchWithInfo.filter((watchWith) => removeUid !== watchWith.uid)
      );
      const removeItemInfo = userList.find(
        (userInfo) => userInfo.uid === removeUid
      );
      setFriendListInfo((friendList) => [...friendList, removeItemInfo]);
      setRemoveWatchWithUid((removeWatchWithUid) => [
        ...removeWatchWithUid,
        removeUid,
      ]);
    } else {
      return;
    }
  }
  function removeInvite(removeUid) {
    if (window.confirm("Do you really want to delete?")) {
      setInviteInfo(inviteInfo.filter((invite) => removeUid !== invite.uid));
      const removeItemInfo = userList.find(
        (userInfo) => userInfo.uid === removeUid
      );
      setFriendListInfo((friendList) => [...friendList, removeItemInfo]);
    } else {
      return;
    }
  }

  function sendWatchInvitation(uid) {
    if (window.confirm("Send watch movie request?")) {
      const userInfo = userList.find((user) => user.uid === uid);
      setInviteInfo((inviteInfo) => [...inviteInfo, userInfo]);
      setFriendListInfo(
        friendListInfo.filter((friend) => !(uid === friend.uid))
      );
    } else {
      return;
    }
  }
  function cancel() {
    history.push("/personal");
  }

  console.log(calendarMoviesInfo);
  console.log(userList);
  console.log(myCalendarMovies);
  console.log(currentUserInfo);
  console.log(scheduleInfo);
  console.log(selectDate);
  console.log(watchWithInfo);
  console.log(friendListInfo);
  console.log(inviteInfo);

  return (
    <Background>
      <Container>
        <Wrap1>
          <div>
            <MovieName>{movieName}</MovieName>
            <DatePickerStyled
              closeOnScroll={false}
              selected={selectDate}
              onChange={(date) => setSelectDate(date)}
            />
          </div>
          <Wrap2>
            <Cancel onClick={cancel}>cancel</Cancel>
            <Save onClick={editSave}>save</Save>
          </Wrap2>
        </Wrap1>
        <Wrap3>
          <Wrap4>
            <Wrap5>
              <WatchWithIcon />
              <Title>Watch With</Title>
            </Wrap5>
            <ListContainer>
              {watchWithInfo.map((watchWith) => {
                return (
                  <Friend>
                    {watchWith.name}
                    <Remove onClick={() => removeWatchwith(watchWith.uid)} />
                  </Friend>
                );
              })}
            </ListContainer>
            <Wrap5>
              <InviteIcon />
              <Title>My Friends List</Title>
            </Wrap5>
            <ListContainer>
              {friendListInfo.map((friend) => {
                return (
                  <Friend>
                    {friend.name}
                    <Add onClick={() => sendWatchInvitation(friend.uid)} />
                  </Friend>
                );
              })}
            </ListContainer>
          </Wrap4>
          <InvitingContainer>
            <NowInvitedTitle>Send Invitation to</NowInvitedTitle>
            {inviteInfo.map((invite) => {
              return (
                <Invited>
                  {invite.name}
                  <Remove onClick={() => removeInvite(invite.uid)} />
                </Invited>
              );
            })}
          </InvitingContainer>
        </Wrap3>
      </Container>
    </Background>
  );
}

const inputStyle = {
  width: "120px",
  height: "35px",
  borderRadius: "5px",
  fontSize: "1.05rem",
  backgroundColor: Color.Light,
  color: Color.Content,
  cursor: "pointer",
  transition: ".3s ease",
  "&:hover": {
    color: Color.Main,
    backgroundColor: Color.Content,
    WebkitFilter: "drop-shadow(0 0 10px rgba(0, 204, 204, .5))",
    filter: "drop-shadow(0 0 10px rgba(0, 204, 204, .5))",
  },
};
const iconStyle = {
  fontSize: "1.5rem",
  color: Color.Light,
  cursor: "pointer",
  transition: ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
  },
};
const Background = styled.section`
  padding-left: 160px;
  height: calc(100vh - 130px);
  background-color: ${Color.Background};
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  border-radius: 10px;
  padding: 70px 50px;
  width: 50%;
  background-color: ${Color.Content};
  color: ${Color.Main};
`;
const Wrap1 = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
const Wrap2 = styled.div`
  display: flex;
  align-items: center;
`;
const Wrap3 = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: space-between;
`;
const Wrap4 = styled.div`
  width: 55%;
`;
const Wrap5 = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const Title = styled.h3`
  margin-left: 10px;
  font-size: 1.25rem;
`;
const MovieName = styled.h3`
  line-height: 1.2;
  margin-bottom: 36px;
  font-size: 2rem;
`;
const Cancel = styled.button`
  ${inputStyle}
`;
const Save = styled.button`
  ${inputStyle}
  margin-left: 20px;
  background-color: ${Color.Main};
`;
const WatchWithIcon = styled(BsFillPeopleFill)`
  font-size: 1.5rem;
  color: ${Color.Light};
`;
const InviteIcon = styled(MdPersonAddAlt1)`
  font-size: 1.5rem;
  color: ${Color.Light};
`;
const ListContainer = styled.div`
  padding: 0 20px;
  border: 2px solid ${Color.LLight};
  border-radius: 5px;
  width: 100%;
  height: 120px;
  overflow-y: scroll;
  color: ${Color.Dark};
  margin-bottom: 1.2rem;
  &:last-child {
    margin-bottom: 0;
  }
`;
const Friend = styled.div`
  position: relative;
  /* border-bottom: 1px solid ${Color.LLight}; */
  padding: 10px 20px;
  &::before {
    content: "";
    position: absolute;
    height: 2px;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: ${Color.LLight};
    &::last-child {
      height: 0;
    }
  }
`;
const Remove = styled(IoMdRemoveCircle)`
  ${iconStyle};
  position: absolute;
  right: 1rem;
  color: ${Color.Main};
  cursor: pointer;
`;
const Add = styled(MdAddCircle)`
  position: absolute;
  right: 1rem;
  ${iconStyle};
  color: ${Color.Main};
  cursor: pointer;
`;
const InvitingContainer = styled.section`
  padding: 10px;
  margin-top: 40px;
  width: 40%;
  color: ${Color.Dark};
  background-color: ${Color.LLight};
`;
const NowInvitedTitle = styled.h3`
  font-size: 1.2rem;
  color: ${Color.Content};
`;
const Invited = styled.div`
  position: relative;
  border-bottom: 1px solid ${Color.LLight};
  padding: 10px 0;
`;
const DatePickerStyled = styled(DatePicker)`
  background-color: ${Color.LLight};
  border-radius: 5px;
  color: ${Color.Dark};
  padding: 5px 10px;
`;

export default Edit;
