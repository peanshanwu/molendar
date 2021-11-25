import styled from "styled-components";
import * as BreakPoint from "../../components/layout/BreakPoints"

export const Main = styled.main`
  position: relative;
  left: 80px;
  width: calc(100% - 80px);
  min-height: calc(100vh - 130px);
  @media (max-width: ${BreakPoint.lg}) {
    width: 100%;
    left: 0;
  }
`;
export const MaxWidthContainer = styled.section`
  margin: 0 auto;
  max-width: 1400px;
`;
