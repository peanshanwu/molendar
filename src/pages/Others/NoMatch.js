import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Color from "../../components/layout/Color";
import { Main } from "../../components/layout/Container";
import { MaxWidthContainer } from "../../components/layout/Container";

function NoMatch() {
  return (
    <Main>
      <Wrap>
        <Video autoPlay muted loop>
          <source
            src="https://c.tenor.com/swTDQJ85dDEAAAPo/aaaa.mp4"
            type="video/mp4"
          />
        </Video>
        <Title to="/">Back to Index</Title>
      </Wrap>
    </Main>
  );
}
const Wrap = styled(MaxWidthContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Video = styled.video`
  display: block;
  width: 80%;
`;
const Title = styled(Link)`
  text-align: center;
  width: 100%;
  font-size: 1rem;
  color: ${Color.Content};
  font-weight: 200;
  font-size: 1.5rem;
`;
export default NoMatch;
