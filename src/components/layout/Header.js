import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { TiThMenu } from 'react-icons/ti'
import { AiFillHome } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'
import { FaSearch, FaHeart } from 'react-icons/fa'
import { BsFillPersonFill, BsPersonCircle } from 'react-icons/bs'
import * as Color from './Color'
import Nav from './Nav'
import firebase from '../../utils/firebase'


function Header() {

  const [user, setUser] = useState(null) //儲存user狀態，要改成redux


  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((currentUser) => {
      console.log('onAuthStateChanged 回傳',currentUser);
      setUser(currentUser)
    })
  },[])


  // const [hamClick, setHamClick] = useState(false)
  // const  navAnimation = useSpring({
  //   transform: hamClick ? `translateX(0)` : `translateX(-150%)`
  // });

  return (
    // <Nav style={ navAnimation }/>
    <NavContainer>
      {/* <HamIcon onClick={() => setHamClick(!hamClick)}/> */}
        <Link to='/'>
          <HomeIcon />
        </Link>
        <Link to='/personal'>
          <MemberIcon />
        </Link>
        <Link to='/collection'>
          <CollectionIcon />
        </Link>
        <SearchIcon />
      
        {user && <LogoutIcon onClick={() => {
          // 優化，不要用alert
          if (window.confirm("Do you really want to leave?")) {
            firebase.auth().signOut()
          } else { return }
        }} />}

      </NavContainer>
  )

}

const iconStyle = {
  fontSize: "30px",
  color: Color.Dark,
  marginBottom: "30px",
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
const HomeIcon = styled(AiFillHome)`
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
  font-size: 25px;
`
const LogoutIcon = styled(BiLogOut)`
  ${iconStyle};
  margin-top: auto;

`


export default Header