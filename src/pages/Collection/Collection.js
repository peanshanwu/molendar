import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import { fetchCollectionMovies } from "../../utils/api";
import CollectionItem from "./CollectionItem";
import * as Title from "../../components/layout/Title";
import * as Container from "../../components/layout/Container";
import Loading from "../../components/layout/Loading";
import { v4 as uuidv4 } from 'uuid';

// redux
import { useSelector } from "react-redux";

export default function Collection({ uid }) {
  const history = useHistory();
  if (!uid) {
    window.alert("please Login first, thank you");
    history.push("/");
  }

  console.log(uid);
  
  const [isLoading, setIsLoading] = useState(true);
  const [collectionInfo, setCollectionInfo] = useState();
  const currentUserInfo = useSelector((state) => state.currentUserInfo);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      currentUserInfo &&
        fetchCollectionMovies(currentUserInfo.user_collection).then(
          (movieInfo) => {
            setCollectionInfo(movieInfo);
            setIsLoading(false)
          }
        );
    }
    return () => {
      isMounted = false;
    };
  }, [currentUserInfo]);


  return (
    <>
      {isLoading ? <Loading /> :
        <Container.Main>
          <Wrap>
            <Title.Sub>Collections</Title.Sub>
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
                      key={uuidv4()}
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
          </Wrap>
        </Container.Main>
      }
    </>

  );
}

// const Wrapper = styled.section`
//   color: ${Color.Content};
//   position: relative;
//   width: 100%;
//   min-height: calc(100vh - 130px);
//   background-color: ${Color.Background};
// `;
// const Main = styled.main`
//   width: calc(100% - 80px);
//   position: relative;
//   left: 80px;
//   @media (max-width: ${BreakPoint.lg}) {
//     width: 100%;
//     position: static;
//   }
// `;
const Wrap = styled(Container.MaxWidthContainer)`
  color: ${Color.Content};
  max-width: 1000px;
  width: 100%;
  padding: 100px 2rem;
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
