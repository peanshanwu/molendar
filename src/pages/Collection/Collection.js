import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import { fetchCollectionMovies } from "../../utils/api";
import CollectionItem from "./CollectionItem";
import { Title } from "../../components/layout/Tilte";
// redux
import { useSelector } from "react-redux";

export default function Collection({ uid }) {
  // const history = useHistory();
  // if (uid === null) {
  //   // window.alert("please Login first, thank you");
  //   history.push("/");
  // }

  const [collectionInfo, setCollectionInfo] = useState();
  const currentUserInfo = useSelector((state) => state.currentUserInfo);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      currentUserInfo &&
        fetchCollectionMovies(currentUserInfo.user_collection).then(
          (movieInfo) => {
            console.log(`movieInfo`, movieInfo);
            setCollectionInfo(movieInfo);
          }
        );
    }
    return () => {
      isMounted = false;
    };
  }, [currentUserInfo]);

  console.log(collectionInfo);

  return (
    <Wrapper>
      <Main>
        <Container>
          <Title>Collections</Title>
          {collectionInfo?.length > 0 ? (
            <FlexWrap>
              {collectionInfo.map((result) => {
                const url = result.poster_path
                  ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                  : `https://firebasestorage.googleapis.com/v0/b/molendar-shan.appspot.com/o/default_photo.png?alt=media&token=376c66cd-730d-44b7-a2f1-347999a60c02`;

                return (
                  <CollectionItem
                    url={url}
                    result={result}
                    uid={currentUserInfo.uid}
                  />
                );
              })}
            </FlexWrap>
          ) : (
            <NoItem>
              Sorry, you don't have collection <span> ...</span>
              <Link to={`/`}> | Back to index</Link>
            </NoItem>
          )}
        </Container>
      </Main>
    </Wrapper>
  );
}

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
const Container = styled.div`
  word-break: break-all;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 100px 0;
`;
const NoItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 130px);
  color: ${Color.Dark};
  font-weight: 100;
  font-size: 1.25rem;
  /* background-color: ${Color.Sub}; */
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10vh 5.7%;
`;
