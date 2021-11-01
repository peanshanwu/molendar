import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../../image/footer-logo.png'
import { Link } from 'react-router-dom'
import * as Color from './Color'


function Footer() {


  return (
    <Container>
      <LinkLogo to="/">
        <FooterLogo src={logo} ></FooterLogo>
      </LinkLogo>
      <Right>© 2021 Pean Shan Wu. All rights reserved.</Right>
    </Container>
  )

}


const Container = styled.footer`
  padding: 30px 50px;
  color: ${Color.Content};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 80px;
  width: 100%;
  height: 130px;
  background-color: ${Color.Background}
`
const LinkLogo = styled(Link)`
  width: 130px;
  height: 30px;
`
const FooterLogo = styled.img`
  opacity: .5;
  transition: ease-in-out .3s;
  &:hover {
    opacity: 1;
    -webkit-filter: drop-shadow(0 0 5px rgba(0, 204, 204, 1));
    filter: drop-shadow(0 0 5px rgba(0, 204, 204, 1));
  }
`
const Right = styled.span`
  color: ${Color.Dark};
`

export default Footer