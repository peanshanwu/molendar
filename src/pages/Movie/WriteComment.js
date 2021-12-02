import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import StarRating from "./StarRating";
import firebase from "../../utils/firebase";
import * as BreakPoint from "../../components/layout/BreakPoints";
import { FaStar } from "react-icons/fa";

import swal from "sweetalert";

export default function WriteComment({ id, uid }) {
  const db = firebase.firestore();
  const commentRef = db.collection("user_comments");
  const commentAreaRef = useRef();
  const [comment, setComment] = useState("");
  const [allCommentInfo, setAllCommentInfo] = useState(null);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function postComment() {
    if (comment === "") {
      commentAreaRef.current.style.border = `1px #FF4500 solid`;
    } else {
      const data = {
        uid: uid,
        comment: comment,
        rating: rating * 2,
        time: firebase.firestore.Timestamp.fromDate(new Date()),
      };
      commentRef
        .doc(id)
        .collection("comments")
        .add(data)
        .then((docRef) => {
          commentRef
            .doc(id)
            .collection("comments")
            .doc(docRef.id)
            .set({ comment_id: docRef.id }, { merge: true });

          swal(`Add comment!`, {
            icon: "success",
            button: false,
            timer: 1500,
          });
          setComment("");
          setRating(0);
          setHover(0);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <CommentContainer>
      <ContentContainer>
        <TextArea
          ref={commentAreaRef}
          placeholder="your comment..."
          value={comment}
          onClick={() => {
            commentAreaRef.current.style.border = `1px solid ${Color.Light}`;
          }}
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <Wrap>
          {/* StarRating */}
          <Container>
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <StarIcon />
                </button>
              );
            })}
            <RatingNum>{hover * 2}</RatingNum>
          </Container>
          <SaveBtn onClick={postComment}>post</SaveBtn>
        </Wrap>
      </ContentContainer>
    </CommentContainer>
  );
}

const CommentContainer = styled.article`
  padding: 50px 60px;
  width: 100%;
  height: 300px;
  background-color: ${Color.Sub};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  @media (max-width: ${BreakPoint.sm}) {
    padding: 20px;
  }
`;
const ContentContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const TextArea = styled.textarea`
  padding: 20px;
  color: ${Color.Content};
  font-family: sans-serif;
  width: 100%;
  height: 150px;
  border: 1px solid ${Color.Light};
  border-radius: 5px;
  resize: none;
  margin-bottom: 15px;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: ${BreakPoint.sm}) {
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
  }
`;
const SaveBtn = styled.div`
  width: 180px;
  height: 40px;
  background-color: ${Color.Main};
  text-align: center;
  line-height: 2.5rem;
  border-radius: 50px;
  font-weight: 500;
  transition: 0.3s ease;
  &:hover {
    background-color: ${Color.Content};
    color: ${Color.Main};
    box-shadow: 0 0 30px rgba(0, 204, 204, 0.5);
  }
  @media (max-width: ${BreakPoint.sm}) {
    align-self: center;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-end;
  @media (max-width: ${BreakPoint.sm}) {
    justify-content: center;
    margin-bottom: 10px;
  }
`;
const StarIcon = styled(FaStar)`
  font-size: 1.2rem;
  margin-right: 5px;
`;
const RatingNum = styled.div`
  text-align: center;
  margin-left: 10px;
  font-size: 1.25rem;
  line-height: 1.5rem;
  width: 30px;
  color: ${Color.Main};
`;
