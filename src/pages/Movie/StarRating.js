import React, { useState } from "react";
import "./StarRating.css";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

function StarRating({ rating, setRating, hover, setHover }) {
  // const [rating, setRating] = useState(0);
  // const [hover, setHover] = useState(0);

  return (
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
  );
}
const Container = styled.div`
  display: flex;
  align-items: flex-end;
`;
const StarIcon = styled(FaStar)`
  font-size: 1.2rem;
  margin-right: 5px;
`;
const RatingNum = styled.div`
  margin-left: 10px;
  font-size: 1.25rem;
  line-height: 1.5rem;
  width: 30px;
  color: ${Color.Main};
`;

export default StarRating;
