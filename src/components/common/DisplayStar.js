import React from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';


function DisplayStar({ starPoints }) {
  const starToFive = Math.round(starPoints / 2);
  const starElement = [];
  for (let i = 0; i < starToFive; i += 1) {
    starElement.push(<StarIcon key={uuidv4()}/>);
  }
  return (
    <>
      {starPoints === 0 ? null : (
        <>
          {starElement}
          <StarNum>{starPoints}</StarNum>
        </>
      )}
    </>
  );
}

const StarIcon = styled(FaStar)`
  margin-right: 5px;
`;
const StarNum = styled.p`
  padding-top: 2px; /* 微調 */
  line-height: 1;
`;

export default DisplayStar;
