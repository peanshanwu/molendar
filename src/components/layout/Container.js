import styled from "styled-components";
import * as Color from "./Color";

export const Main = styled.main`
  position: relative;
  left: 80px;
  width: calc(100% - 80px);
  min-height: calc(100vh - 130px);
`;

export const MaxWidthContainer = styled.section`
  margin: 0 auto;
  max-width: 1400px;
  width: 60%;
  @media (max-width: 1450px) {
    width: 81%;
  }
`;
