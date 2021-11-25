import styled from "styled-components";
import * as BreakPoint from "./BreakPoints";

export const Main  = styled.h1`
  font-size: 2.8rem;
  font-weight: 300;
  margin-bottom: 30px;
  @media (max-width: ${BreakPoint.lg}) {
    margin-bottom: 0;
    font-size: 2.5rem;
  }
`;
export const Sub = styled.h2`
  font-size: 1.8rem;
  font-weight: 100;
  margin-bottom: 30px;
`;
export const Third = styled.h2`
  font-size: 2rem;
  @media (max-width: ${BreakPoint.sm}) {
    font-size: 1.8rem;
  }
`;

