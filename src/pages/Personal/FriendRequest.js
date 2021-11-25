import React from "react";
import styled from "styled-components";
import * as Color from "../../components/layout/Color";
import { ImCheckmark, ImCross } from "react-icons/im";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { acceptFriend, canselFriend } from "../../utils/operateFirebase"
import { v4 as uuidv4 } from 'uuid';

function FriendRequest({ friendInviteInfo, uid }) {

  return (
    <List>
      <Title>Friend Request</Title>
      {friendInviteInfo.map((friendInfo) => {
        return (
          <Wrap key={uuidv4()}>
            <Photo photoURL={friendInfo.photoURL} />
            <Name>{friendInfo.name}</Name>
            <IconWrap>
              <Accept
                onClick={() => acceptFriend(friendInfo.uid, uid)}
              />
              <Cansel
                onClick={() => canselFriend(friendInfo.uid , uid)}
              />
            </IconWrap>
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
const Accept = styled(ImCheckmark)`
  ${iconStyle}
  margin-right: 40px;
`;
const Cansel = styled(ImCross)`
  ${iconStyle}
  font-size: 1.25rem;
`;

export default FriendRequest;
