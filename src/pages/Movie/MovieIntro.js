import React, { useState, useEffect } from "react";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import * as BreakPoint from "../../components/layout/BreakPoints"
const isoConv = require("iso-language-converter");

function MovieIntro({ movieDetail, castInfo }) {

  const posterURL = movieDetail?.poster_path
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
  
  return (
    <InfoWrap>
      <Poster src={posterURL}></Poster>
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
  );
}
const InfoWrap = styled.div`
  display: flex;
  align-items: flex-start;
  --webkit-row-gap: 3rem;
  --webkit-column-gap: 3rem;
  gap: 3rem;
`;
const Poster = styled.img`
  width: 25%;
  background-color: ${Color.Background};
  @media (max-width: 1000px) {
    display: none;
  }
`;
const ContentWrap = styled.div`
  width: 75%;
  font-weight: 100;
  @media (max-width: 1000px) {
    width: 100%;
  }
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
  --webkit-row-gap: 0.5rem;
  --webkit-column-gap: 0.5rem;
  gap: 0.5rem;
`;
const Wrap2 = styled.div`
  display: flex;
`;
const DetailTitle = styled.h6`
  min-width: 90px;
  width: 15%;
`;
const DetailContent = styled.p`
  width: 80%;
`;

export default MovieIntro;
