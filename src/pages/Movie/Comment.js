import React, { useState } from "react";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { format } from "date-fns";
import DisplayStar from "../../components/common/DisplayStar";
import firebase from "../../utils/firebase";
import * as BreakPoint from "../../components/layout/BreakPoints"


export default function Comment({ info, uid, id }) {
  const db = firebase.firestore();
  const commentRef = db.collection("user_comments");
  const [hover, setHover] = useState(false);
  const [readMore, setreadMore] = useState(false);

  function handleReadMore() {
    if (readMore) {
      setreadMore(false);
    } else {
      setreadMore(true);
    }
  }

  function deleteComment(commentId) {
    commentRef
      .doc(id)
      .collection("comments")
      .doc(commentId)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }

  return (
    <CommentContainer
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <ContentContainer>
        {uid === info.userInfo?.uid ? (
          <DeleteIcon
            hover={hover}
            onClick={() => deleteComment(info.commentInfo.comment_id)}
          />
        ) : null}
        <UserWrap>
          <Pic src={`${info.userInfo?.photoURL}`} />
          <Name>{info.userInfo?.name}</Name>
        </UserWrap>
        <TextContainer>
          <Time>{format(info.commentInfo?.time.toDate(), "Pp")}</Time>
          <Text readMore={readMore}>{info.commentInfo?.comment}</Text>
          <ReadMore onClick={handleReadMore}>
            {readMore ? `back` : `read more`}
          </ReadMore>
          <StarWrapper>
            <DisplayStar starPoints={info.commentInfo?.rating} />
          </StarWrapper>
        </TextContainer>
      </ContentContainer>
    </CommentContainer>
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
const CommentContainer = styled.article`
  position: relative;
  padding: 50px 60px;
  width: 100%;
  background-color: ${Color.Sub};
  margin-bottom: 30px;
  transition: ease-in-out 0.3s;
  @media (max-width: ${BreakPoint.sm}) {
    padding: 20px;
  }
`;
const ContentContainer = styled.div`
  display: flex;
  --webkit-row-gap: 5%;
  --webkit-column-gap: 5%;
  gap: 5%;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  @media (max-width: ${BreakPoint.sm}) {
    flex-direction: column;
  }
`;
const UserWrap = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: ${BreakPoint.sm}) {
    width: 100%;
  }
`;
const Pic = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin-bottom: 10px;
`;
const Name = styled.p`
  font-weight: 300;
  font-size: 1.25rem;
  text-align: center;
  word-break: break-word;
`;
const TextContainer = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: ${BreakPoint.sm}) {
    width: 100%;
    justify-content: center;
  }
`;
const Text = styled.p`
  width: 100%;
  word-break: break-word;
  white-space: pre-wrap;
  /* height: 120px; */
  height: ${(props) => (props.readMore ? "fit-content" : "50px")};
  overflow-y: hidden;
  margin-bottom: 20px;
  transition: ease-in-out 1s;
  font-weight: 300;
`;
const Time = styled.p`
  font-size: 0.8rem;
  color: ${Color.Light};
  margin-bottom: 5px;
  @media (max-width: ${BreakPoint.sm}) {
    width: 100%;
    text-align: center;
  }
`;
const ReadMore = styled.div`
  text-align: center;
  line-height: 2.5;
  cursor: pointer;
  width: 150px;
  height: 40px;
  color: ${Color.Light};
  background-color: ${Color.Background};
  border-radius: 5px;
  transition: ease-in 0.3s;
  &:hover {
    background-color: ${Color.Dark};
    color: ${Color.Content};
    /* box-shadow: 0 0 5px rgba(0, 204, 204, 1); */
  }
  @media (max-width: ${BreakPoint.sm}) {
    width: 100%;
    order: 4;
  }
`;
const DeleteIcon = styled(ImCross)`
  ${iconStyle}
  font-size: 1.25rem;
  position: absolute;
  top: 20px;
  left: 30px;
  transition: ease-in 0.3;
  opacity: ${(props) => (props.hover ? 1 : 0)};
`;
const StarWrapper = styled.div`
  color: ${Color.Main};
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  font-size: 1.2rem;
  line-height: 1;
  margin-bottom: 5px; /* 視覺微調 */
  @media (max-width: ${BreakPoint.sm}) {
    margin-bottom: 30px;
  }
`;
