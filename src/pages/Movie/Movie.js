import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import DisplayStar from "../../components/common/DisplayStar";
import { ImCross } from "react-icons/im";
import EasyEdit, { Types } from "react-easy-edit";
import Loading from "../../components/layout/Loading";
import firebase from "../../utils/firebase";
import Comment from "./Comment";
import LoginFirst from "./LoginFirst";
import WriteComment from "./WriteComment";
import DetailBanner from "./DetailBanner";
import DetailCarousel from "./DetailCarousel";
import { fetchMovie, fetchCast } from "../../utils/api";
import AddToCalendarIcon from "../../components/common/AddToCalendar";
import AddToCollection from "../../components/common/AddToCollection";
import { Title as CommentTitle } from "../../components/layout/Tilte";
const isoConv = require("iso-language-converter");

function Movie({ uid, userList }) {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState();
  const [castInfo, setCastInfo] = useState();

  const db = firebase.firestore();
  const commentRef = db.collection("user_comments");
  const [commentInfo, setCommentInfo] = useState(null);

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
        setCastInfo(res);
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
        setMovieDetail(res);
      });
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, []);

  const url = movieDetail
    ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
    : `https://firebasestorage.googleapis.com/v0/b/molendar-shan.appspot.com/o/default_photo.png?alt=media&token=376c66cd-730d-44b7-a2f1-347999a60c02`;

  function getGenres() {
    let genresArr = [];
    if (movieDetail) {
      movieDetail.genres.forEach((genres) => {
        genresArr.push(genres.name);
      });
    }
    return genresArr;
  }
  function getProduction() {
    let productArr = [];
    if (movieDetail) {
      movieDetail.production_companies.forEach((product) => {
        productArr.push(product.name);
      });
    }
    return productArr;
  }

  function timeConvert(n) {
    var num = n;
    var hours = num / 60;
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return `${rhours}h ${rminutes}min`;
  }

  function findDirector() {
    let directorName = "";
    castInfo.crew.forEach((crew) => {
      if (crew.job === "Director") {
        directorName = crew.name;
      }
    });
    return directorName;
  }

  console.log(movieDetail);
  console.log(castInfo);
  console.log(commentInfo);

  return (
    <Wrapper>
      {movieDetail && castInfo && (
        <Main>
          <DetailBanner movieDetail={movieDetail} />
          <IconWrap>
            <AddToCalendarIcon
              uid={uid}
              selectDay={new Date()}
              movieId={parseInt(id, 10)}
            />
            <AddToCollection uid={uid} movieId={parseInt(id, 10)} />
          </IconWrap>
          <Container>
            <InfoWrap>
              <Poster src={url}></Poster>
              <ContentWrap>
                <Storyline>Storyline</Storyline>
                <StorylineInfo>{movieDetail.overview}</StorylineInfo>
                <Wrap1>
                  <Wrap2>
                    <DetailTitle>Released</DetailTitle>
                    <DetailContent>{movieDetail.release_date}</DetailContent>
                  </Wrap2>
                  <Wrap2>
                    <DetailTitle>Runtime</DetailTitle>
                    <DetailContent>
                      {timeConvert(movieDetail.runtime)}
                    </DetailContent>
                  </Wrap2>
                  <Wrap2>
                    <DetailTitle>Director</DetailTitle>
                    <DetailContent>{findDirector()}</DetailContent>
                  </Wrap2>
                  <Wrap2>
                    <DetailTitle>Genre</DetailTitle>
                    <DetailContent>{getGenres().join(", ")}</DetailContent>
                  </Wrap2>
                  <Wrap2>
                    <DetailTitle>Status</DetailTitle>
                    <DetailContent>{movieDetail.status}</DetailContent>
                  </Wrap2>
                  <Wrap2>
                    <DetailTitle>Language</DetailTitle>
                    <DetailContent>
                      {isoConv(movieDetail.original_language)}
                    </DetailContent>
                  </Wrap2>
                  <Wrap2>
                    <DetailTitle>Production </DetailTitle>
                    <DetailContent>{getProduction().join(", ")}</DetailContent>
                  </Wrap2>
                </Wrap1>
              </ContentWrap>
            </InfoWrap>
          </Container>
          <DetailCarousel castInfo={castInfo} />
          <Container>
            <CommentTitle>All Comments</CommentTitle>
            {uid ? <WriteComment id={id} uid={uid} /> : <LoginFirst />}

            {commentInfo &&
              commentInfo.map((info) => {
                return <Comment info={info} uid={uid} id={id} />;
              })}
          </Container>
        </Main>
      )}
    </Wrapper>
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
  color: ${Color.Content};
  position: relative;
  width: 100%;
  min-height: calc(100vh - 130px);
  background-color: ${Color.Background};
`;
const Main = styled.main`
  width: calc(100% - 80px);
  position: relative;
  left: 80px;
`;
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
const Container = styled.div`
  word-break: break-all;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 0;
  /* outline: 1px solid gray; */
`;
const InfoWrap = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 3rem;
`;
const Poster = styled.img`
  width: 25%;
  background-color: ${Color.Background};
`;
const ContentWrap = styled.div`
  width: 75%;
  font-weight: 100;
`;
const Storyline = styled.h5`
  font-size: 1.4rem;
  margin-bottom: 10px;
`;
const StorylineInfo = styled.p`
  margin-bottom: 30px;
`;
const Wrap1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Wrap2 = styled.div`
  display: flex;
`;
const DetailTitle = styled.h6`
  min-width: 70px;
  width: 15%;
`;
const DetailContent = styled.p`
  width: 80%;
`;

export default Movie;
