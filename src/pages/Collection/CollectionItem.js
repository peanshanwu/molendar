import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import * as Color from "../../components/layout/Color";
import DisplayStar from "../../components/common/DisplayStar";
import firebase from "../../utils/firebase";
import * as BreakPoint from "../../components/layout/BreakPoints";

export default function CollectionItem({ url, result, uid }) {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [hover, setHover] = useState(false);

  function deleteComment(movieId) {
    console.log(movieId);
    userRef.doc(uid).update({
      user_collection: firebase.firestore.FieldValue.arrayRemove(movieId),
    });
  }

  return (
    <Movie
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <DeleteIcon hover={hover} onClick={() => deleteComment(result.id)} />
      <Link to={`/movie/${result.id}`}>
        <Poster src={url} key={result.id} alt={result.original_title} />
        <MovieName>{result.original_title}</MovieName>
        <StarWrapper>
          <DisplayStar starPoints={result.vote_average} />
        </StarWrapper>
      </Link>
    </Movie>
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

const Movie = styled.div`
  position: relative;
  width: 20.5%;
  @media (max-width: ${BreakPoint.md}) {
    width: 46%;
  }
`;
const MovieName = styled.h3`
  margin-top: 10px;
  font-weight: 100;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  @media (max-width: ${BreakPoint.md}) {
    font-size: 1.2rem;
  }
`;
const Poster = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  transform-origin: center;
  transition: ease-in 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;
const StarWrapper = styled.div`
  color: ${Color.Main};
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 5px;
  @media (max-width: ${BreakPoint.md}) {
    font-size: 1.1rem;
  }
`;
const DeleteIcon = styled(ImCross)`
  ${iconStyle};
  font-size: 1.25rem;
  position: absolute;
  z-index: 1;
  top: 10px;
  left: 10px;
  transition: ease-in 0.3;
  opacity: ${(props) => (props.hover ? 1 : 0)};
`;
