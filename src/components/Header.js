import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSpring } from 'react-spring'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { FaSearch, FaHeart } from 'react-icons/fa'
import { TiThMenu } from 'react-icons/ti'
import { BsFillPersonFill, BsPersonCircle } from 'react-icons/bs'
import * as Color from './Color'
import Nav from './Nav'


function Header() {

  // const [hamClick, setHamClick] = useState(false)
  // const  navAnimation = useSpring({
  //   transform: hamClick ? `translateX(0)` : `translateX(-150%)`
  // });

  return (
    // <Nav style={ navAnimation }/>
    <NavContainer>
        {/* <HamIcon onClick={() => setHamClick(!hamClick)}/> */}
        <SearchIcon />
        <Link to='/member'>
          <MemberIcon />
        </Link>
        <Link to='/collection'>
          <CollectionIcon />
        </Link>
      </NavContainer>
  )

}

const iconStyle = {
  fontSize: "30px",
  color: Color.Dark,
  marginBottom: "20px",
  cursor: "pointer",
  "transition": ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))"
  }
}

// const Wrapper = styled.div`
//   position: fixed;
//   z-index: 2;
//   width: 100%;
// `
const NavContainer = styled.section`
  position: fixed;
  z-index: 2;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
  height: 100vh;
  background-color: ${Color.Sub};
`
const HamIcon = styled(TiThMenu)`
  ${iconStyle};
`
const SearchIcon = styled(FaSearch)`
  ${iconStyle};
  font-size: 26px;
`
const MemberIcon = styled(BsFillPersonFill)`
  ${iconStyle};
`
const CollectionIcon = styled(FaHeart)`
  ${iconStyle};
  font-size: 26px;
`


export default Header