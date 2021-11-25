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

const LinkTo = styled(Link)`
  position: fixed;
  top: -1px;
  right: -1px;
  z-index: 3;
`
const LogoIcon = styled.img`
  width: 60px;
  height: 60px;
  cursor: pointer;
`

export default Logo