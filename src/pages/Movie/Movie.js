import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import DisplayStar from "../../components/common/DisplayStar";
import { ImCross } from "react-icons/im";
import EasyEdit, { Types } from "react-easy-edit";
import Loading from "../../components/layout/Loading";
import DetailBanner from "./DetailBanner";
import { fetchMovie } from "../../utils/api";

// react-easy-edit
// const CustomDisplay = (props) => {
//   const val = props.value || "redlohecalp motsuC";
//   return <div>{val.split("").reverse().join("")}</div>;
// };

function Movie({}) {
  const [movieDetail, setMovieDetail] = useState();
  const { id } = useParams();

  // react-easy-edit
  const save = (value) => {
    alert(value);
  };
  const cancel = () => {
    alert("Cancelled");
  };

  useEffect(() => {
    let isMount = true;
    if (isMount) {
      fetchMovie(id).then((res) => {
        console.log(res);
        setMovieDetail(res);
      });
    }
    return () => {
      isMount = false; // 清除fetchAPI
    };
  }, []);

  return (
    <>
      {movieDetail && (
        <Wrapper>
          <Main>
            <DetailBanner movieDetail={movieDetail} />
            <Container>
              <InfoWrap>
                <Poster
                  src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
                ></Poster>
                <ContentWrap>
                  <Storyline>Storyline</Storyline>
                  <StorylineInfo>{movieDetail.overview}</StorylineInfo>
                  <Wrap1>
                    <Wrap2>
                      <DetailTitle>Released</DetailTitle>
                      <DetailContent>11 August 2021</DetailContent>
                    </Wrap2>
                    <Wrap2>
                      <DetailTitle>Runtime</DetailTitle>
                      <DetailContent>1h 55min</DetailContent>
                    </Wrap2>
                    <Wrap2>
                      <DetailTitle>Director</DetailTitle>
                      <DetailContent> Shawn Levy</DetailContent>
                    </Wrap2>
                    <Wrap2>
                      <DetailTitle>Genre</DetailTitle>
                      <DetailContent>
                        Comedy, Action, Adventure, Science Fiction
                      </DetailContent>
                    </Wrap2>
                    <Wrap2>
                      <DetailTitle>Status</DetailTitle>
                      <DetailContent>Released</DetailContent>
                    </Wrap2>
                    <Wrap2>
                      <DetailTitle>Language</DetailTitle>
                      <DetailContent>English</DetailContent>
                    </Wrap2>
                    <Wrap2>
                      <DetailTitle>Production </DetailTitle>
                      <DetailContent>
                        Berlanti Productions, 21 Laps Entertainment, Maximum
                        Effort, Lit Entertainment Group
                      </DetailContent>
                    </Wrap2>
                  </Wrap1>
                </ContentWrap>
              </InfoWrap>
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
  color: ${Color.Content};
  position: relative;
  width: 100%;
  background-color: ${Color.Background};
`;
const Main = styled.main`
  width: calc(100% - 80px);
  position: relative;
  left: 80px;
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
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;
const MovieName = styled.h2`
  font-size: 2rem;
`;
const EditWrap = styled.div`
  width: 80%;
  /* height: 300px; */
  max-height: 300px;
  overflow-y: scroll;
  /* background-color: ${Color.Light}; */
`;
const CommentWrap = styled.div`
  width: 100%;
  /* height: 500px; */
  background-color: ${Color.Sub};
  margin-bottom: 50px;
  display: flex;
  position: relative;
`;
const IconWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const Cansel = styled(ImCross)`
  ${iconStyle}
  font-size: 1.25rem;
`;
const StarWrapper = styled.div`
  color: ${Color.Main};
  display: flex;
  flex-wrap: wrap;
  margin-left: 15px;
  font-size: 20px;
`;

export default Movie;
