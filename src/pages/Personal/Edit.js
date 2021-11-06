import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";
import * as Color from "../../components/layout/Color";
import background from "../../image/index-calendar-bg.png";
import Loading from "../../components/layout/Loading";
import { BsFillPeopleFill } from "react-icons/bs";
import { IoMdRemoveCircle } from "react-icons/io";
import { MdPersonAddAlt1, MdAddCircle } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../../utils/firebase";
import { format, getDate, isSameDay } from "date-fns";
import { fetchMultiMovies, fetchUserInfo } from "../../utils/api";



function Edit({
  uid,
  currentUserInfo,
  myCalendarMovies,
  userList,
  calendarMoviesInfo,
}) {
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
  // let { id } = useParams();
  let id = parseInt(useParams().id, 10);

  console.log(`currentUserInfo`, currentUserInfo);
  console.log(`myCalendarMovies`, myCalendarMovies);
  console.log(`userList`, userList);
  console.log(`calendarMoviesInfo`, calendarMoviesInfo);

  // 設定scheduleInfo state
  useEffect(() => {
    if (myCalendarMovies.length > 0) {
      myCalendarMovies.forEach((item) => {
        if (item.movie_id === id) {
          setScheduleInfo(item);
        }
      });
    }
  }, [myCalendarMovies])

  // 設定InviteInfo state
  useEffect(() => {
    if (currentUserInfo) {
      movieInviteRef
        .where("from", "==", uid)
        .where("movie_id", "==", id)
        .onSnapshot((querySnapshot) => {
          var inviteIdArr = [];
          querySnapshot.forEach((doc) => {
            inviteIdArr.push(doc.data().to);
        });
        setInviteInfo(
          userList.filter(userInfo => inviteIdArr.includes(userInfo.uid))
        )
      })
    }
  }, [currentUserInfo, userList])

  // 設定select date state
  useEffect(() => {
    if (scheduleInfo) {
      setSelectDate(
        new Date(
          scheduleInfo.date[0],
          scheduleInfo.date[1] - 1,
          scheduleInfo.date[2]
        )
      )
    }
  }, [scheduleInfo])

  // 設定movieName state
  useEffect(() => {
    if (scheduleInfo && calendarMoviesInfo.length > 0) {
      calendarMoviesInfo.forEach((item) => {
        if (item.id === scheduleInfo.movie_id) {
          setMovieName(item.original_title);
        }
      });
    }
  }, [scheduleInfo, calendarMoviesInfo])

  // 設定watchWith state
  useEffect(() => {
    if (scheduleInfo && userList.length > 0) {
      let arr = [];
      scheduleInfo.watchWith.forEach((watchWith) => {
        userList.forEach((userInfo) => {
          if (watchWith === userInfo.uid) {
            arr.push(userInfo);
          }
        });
      });
      setWatchWithInfo(arr);
    }
  }, [ scheduleInfo, userList]); // 其中一個有變動，就會重新render，然後跑「這個」useEffect
  
  // 設定friendList state
  useEffect(() => {

    console.log("HOLA!!!!");
    console.log(currentUserInfo);
    console.log(inviteInfo);
    console.log(watchWithInfo);
    console.log(userList);

    // if (currentUserInfo && inviteInfo.length > 0 && watchWithInfo.length > 0 && userList.length > 0) {
    if (currentUserInfo && userList.length > 0) {
      const inviteAndWatchWithIdsArr =
        inviteInfo.map(invite => invite.uid)
        .concat
        (watchWithInfo.map(watchWith => watchWith.uid))
      
      const filteredFriendList = currentUserInfo.friend_list.filter(friend => !inviteAndWatchWithIdsArr.includes(friend))
      
      setFriendListInfo(
        userList.filter(user => filteredFriendList.includes(user.uid))
      )
    }

  }, [inviteInfo, watchWithInfo, currentUserInfo, userList]);


  function editSave() {
    // 先統一轉好資料
    const selectDateData = format(selectDate, 'yyyy-MM-dd').split('-').map(e => e)
    const watchWithData = watchWithInfo.map(watchWith => watchWith.uid)
    const invitationData = inviteInfo.map(invite => invite.uid)
    
    // 處理currentUser行事曆
    const data = {
      date: selectDateData,
      movie_id: id,
      watchWith: watchWithData
    }
    console.log(scheduleInfo);
    userRef.doc(uid).collection('user_calendar').doc(`${id}`).set(data) //db.collectionGroup('user_calendar')
    .then(() => { console.log("set!")})
    .catch(err => console.log(err))

    // 處理invitation
    // invitationData.forEach(inviteUid => {
    //   movieInviteRef
    //     .where("from", "==", uid)
    //     .where("movie_id", "==", id)
    //     .where("to", "==", inviteUid)
    //     .onSnapshot((querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         // 處理時間更改
    //         doc.set(selectDateData)
    //         // 處理刪除、新增invitation

    //       });

    //     })
    // })
  
    // 處理與其他好友的行程（selectDate更改、watchWith更改）
    // watchWithData.forEach(watchWith => {
    //   watchWith.
    // })


  }

  function removeWatchwith(uid) {
    if (window.confirm("Do you really want to delete?")) {

      setWatchWithInfo(watchWithInfo.filter(watchWith => uid !== watchWith.uid));

      const removeItemInfo = userList.find(userInfo => userInfo.uid === uid)
      setFriendListInfo(
        (friendList) => [...friendList, removeItemInfo]
      )

    } else {
      return;
    }
  }

  function removeInvite(uid) {
    if (window.confirm("Do you really want to delete?")) {

      setInviteInfo(
        inviteInfo.filter(invite => uid !== invite.uid)
      );

      const removeItemInfo = userList.find(userInfo => userInfo.uid === uid)
      setFriendListInfo(
        (friendList) => [...friendList, removeItemInfo]
      )

    } else {
      return;
    }
  }

  function sendWatchInvitation(uid) {
    if (window.confirm("Send watch movie request?")) {
      const userInfo = userList.find((user) => user.uid === uid);
      setInviteInfo(
        (inviteInfo) => [...inviteInfo, userInfo]
      );
      setFriendListInfo(
        friendListInfo.filter((friend) => !(uid === friend.uid))
      );
    } else {
      return;
    }
  }

  function cancel() {
    history.push('/personal')
  }

  console.log(selectDate);
  console.log(watchWithInfo);
  return (
    <Background>
      <Container>
        <Wrap1>
          <div>
            <MovieName>{movieName}</MovieName>
            <DatePickerStyled
              closeOnScroll={true}
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
            <div>
              <WatchWithIcon /> Watch With
            </div>
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
            <div>
              <InviteIcon />Friends List
            </div>
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
const MovieName = styled.h3`
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
  border-bottom: 1px solid ${Color.LLight};
  padding: 10px 20px;
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
  margin-top: 28px;
  width: 40%;
  color: ${Color.Dark};
  background-color: #eee;
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
