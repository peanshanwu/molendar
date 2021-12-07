import React, { useState } from "react";
import styled from "styled-components";
import * as Color from "../../components/layout/Color";
import { IoPersonAdd } from "react-icons/io5";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { sendFriendInvitation } from "../../utils/operateFirebase"
import swal from "sweetalert";
import { v4 as uuidv4 } from 'uuid';

// function FriendList({ friendListInfo, searchFriend, setSearchFriend, handleSearchFriend }) {
function FriendList({ friendListInfo, userList, uid }) {

  const [searchFriend, setSearchFriend] = useState("");


  function handleSearchFriend(value) {

    const userInfo = userList.find((user) => user.email === value);

    if (userInfo) {
      swal({
        title: `${userInfo.name}`,
        text: `do you want to send a friend request to ${userInfo.name}?`,
        icon: "success",
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {

          sendFriendInvitation(userInfo, uid);

          swal(`Send a friend request to ${userInfo.name}`, {
            icon: "success",
            button: false,
            timer: 1500,
          });
        } else {
          swal("Mmm...Maybe next time!", {
            button: false,
            timer: 1500,
          });
        }
      });
    } else {
      swal("Sorry, can't found", "please try agin", {
        icon: "warning",
        button: false,
        timer: 1500,
      });
    }
  }


  return (
    <List>
      <Title>My Friend List</Title>
      <Wrap>
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
      </Wrap>
      {friendListInfo.map((friend) => {
        return (
          <Wrap key={uuidv4()}>
            <Photo photoURL={friend.photoURL} />
            <Name>{friend.name}</Name>
          </Wrap>
        );
      })}
    </List>
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
const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
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

export default FriendList;
