import React from 'react'
import styled from 'styled-components'
import logo from '../../image/logo.png'
import { Link } from 'react-router-dom'


function Logo() {

  return (
    <LinkTo to='/'>
      <LogoIcon src={logo}/>
    </LinkTo>
  )

}

export default Logo

const LinkTo = styled(Link)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
`
const LogoIcon = styled.img`
  width: 60px;
  height: 60px;
  transition: ease-in-out .3s;
  cursor: pointer;
  /* &:hover {
    box-shadow: 0 0 30px rgba(0, 204, 204, .5);
  } */
`