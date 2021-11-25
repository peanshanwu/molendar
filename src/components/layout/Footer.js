import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../../image/footer-logo.png";
import { Link } from "react-router-dom";
import * as Color from "./Color";
import * as BreakPoint from "../../components/layout/BreakPoints"

function Footer() {
  return (
      <Container>
        <LinkLogo to="/">
          <FooterLogo src={logo}></FooterLogo>
        </LinkLogo>
        <Right>© 2021 Pean Shan Wu. All rights reserved.</Right>
      </Container>
  );
}
const Container = styled.footer`
  padding: 50px 0;
  padding-left: 80px;
  color: ${Color.Content};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 130px;
  background-color: ${Color.Background};
  @media (max-width: ${BreakPoint.lg}) {
    padding-left: 0;
    height: 200px;
    justify-content: flex-start;
    text-align: center;
  }
`;
const LinkLogo = styled(Link)`
  width: 130px;
  height: 30px;
`;
const FooterLogo = styled.img`
  opacity: 0.5;
  transition: ease-in-out 0.3s;
  &:hover {
    opacity: 1;
    -webkit-filter: drop-shadow(0 0 5px rgba(0, 204, 204, 1));
    filter: drop-shadow(0 0 5px rgba(0, 204, 204, 1));
  }
`;
const Right = styled.span`
  color: ${Color.Dark};
`;

export default Footer;
