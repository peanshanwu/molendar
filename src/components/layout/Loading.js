import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import * as Color from "./Color"

// Styled Components

const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;

const DotWrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dot = styled.div`
  background-color: ${Color.Main};
  border-radius: 50%;
  width: 8px;
  height: 8px;
  margin: 15px 5px;

  /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${props => props.delay};
`;

class Loading extends Component {
  render() {
    return (
      <DotWrapper>
        <Dot delay="0s" />
        <Dot delay=".1s" />
        <Dot delay=".2s" />
      </DotWrapper>
    );
  }
}

export default Loading;
