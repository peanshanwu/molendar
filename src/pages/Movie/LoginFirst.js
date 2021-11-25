import React from "react";
import { Link } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";

export default function LoginFirst() {
  return (
    <CommentContainer>
      <ContentContainer>
        <LoginFirstTxt>
          Please Login first before you write down your comment
        </LoginFirstTxt>
        <LoginBtn to="/signin">Login or Sign Up</LoginBtn>
      </ContentContainer>
    </CommentContainer>
  );
}

const CommentContainer = styled.article`
  padding: 50px 80px;
  width: 100%;
  height: 300px;
  background-color: ${Color.Sub};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;
const ContentContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;
const LoginFirstTxt = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;
const LoginBtn = styled(Link)`
  width: 180px;
  height: 40px;
  background-color: ${Color.Main};
  text-align: center;
  line-height: 2.5rem;
  border-radius: 50px;
  font-weight: 500;
  &:hover {
    background-color: ${Color.Content};
    color: ${Color.Main};
    box-shadow: 0 0 30px rgba(0, 204, 204, 0.5);
  }
`;
