import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import Comment from "./Comment";
import LoginFirst from "./LoginFirst";
import Banner from "../../components/common/Banner"
import WriteComment from "./WriteComment";
import DetailCarousel from "./DetailCarousel";
import { fetchMovie, fetchCast } from "../../utils/api";
import AddToCalendarIcon from "../../components/common/AddToCalendar";
import AddToCollection from "../../components/common/AddToCollection";
import * as Title from "../../components/layout/Title";
import { Main, MaxWidthContainer } from "../../components/layout/Container"
import MovieIntro from "./MovieIntro"
import * as BreakPoint from "../../components/layout/BreakPoints"

// const isoConv = require("iso-language-converter");

function Movie({ uid, userList }) {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState();
  const [castInfo, setCastInfo] = useState();

  const db = firebase.firestore();
  const commentRef = db.collection("user_comments");
  const [commentInfo, setCommentInfo] = useState(null);

  const history = useHistory()

  // comment state
  useEffect(() => {
    commentRef
      .doc(id)
      .collection("comments")
      .onSnapshot((snapshot) => {
        let commentsArr = [];

        // 時間排序
        let arr = [];
        snapshot.forEach((docRef) => {
          arr.push(docRef.data());
        });
        arr.sort((a, b) => {
          return a.time < b.time ? 1 : -1;
          // 1: b排序在a前（新到舊)
          // -1: a排序在b前(舊到新)
        });

        // 做成obj
        arr.forEach((comment) => {
          let obj = {};
          obj.commentInfo = comment;
          obj.userInfo = userList.find((user) => user.uid === comment.uid);
          commentsArr.push(obj);
        });

        console.log(`commentsArr`, commentsArr);
        setCommentInfo(commentsArr);
      });
  }, [userList]);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      fetchCast(id).then((res) => {
        if (res.status_code === 34) {
          history.push("/no-match")
        } else {
          setCastInfo(res);
        }
      });
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, []);

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      fetchMovie(id).then((res) => {
        if (res.status_code === 34) {
          history.push("/no-match")
        } else {
          setMovieDetail(res);
        }
      });
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, []);
  
  return (
    <>
      {movieDetail && castInfo && (
        <Main>
          <Banner movieData={movieDetail} />
          <IconWrap>
            <AddToCalendarIcon
              uid={uid}
              selectDay={new Date()}
              movieId={parseInt(id, 10)}
            />
            <AddToCollection uid={uid} movieId={parseInt(id, 10)} />
          </IconWrap>
          <Wrap>
            <Container>
              <MovieIntro movieDetail={movieDetail} castInfo={castInfo}/>
            </Container>
          </Wrap>
          <DetailCarousel castInfo={castInfo} />
          <Wrap>
            <Container>
              <Title.Sub>All Comments</Title.Sub>
              {uid ? <WriteComment id={id} uid={uid} /> : <LoginFirst />}
              {commentInfo &&
                commentInfo.map((info) => {
                  return <Comment info={info} uid={uid} id={id} />;
                })}
            </Container>
          </Wrap>
        </Main>
      )}
    </>
  );
}

const IconWrap = styled.div`
  width: 60px;
  position: fixed;
  z-index: 1;
  top: 70px;
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  & svg {
    margin-bottom: 10px;
  }
`;
const Wrap = styled.section`
  padding: 50px 8rem;
  width: 100%;
  @media (max-width: ${BreakPoint.md}) {
    padding: 50px 2rem;
  }
`
const Container = styled(MaxWidthContainer)`
  word-break: break-all;
  color: ${Color.Content};
`;


export default Movie;
