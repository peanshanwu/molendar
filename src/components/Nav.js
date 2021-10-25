import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import * as Color from "./Color"
import { animated } from "react-spring"

function Nav({ style }) {
  
  return (
    <Wrapper style={style}>
      <Menu>
        {/* <Link>Home</Link> 
        <Link>Home</Link> 
        <Link>Home</Link>  */}
        <a href="#">My Calendar</a>
        <a href="#">My Calendar</a>
        <a href="#">List</a>
        <a href="#">Calendar</a>
      </Menu>
    </Wrapper>
  )

}

// const Wrapper = styled.section`
//   width: 100%;
// `
// const Menu = styled(animated.div)`
//   position: absolute;
//   z-index: 1;
//   top: 0;
//   bottom: 0;
//   left: 80px;
//   width: calc(100% - 80px);
//   background-color: ${Color.Sub};
//   transition: 0.6s ease-in-out;
// `
const Wrapper = styled(animated.section)`
  width: 100%;
  transition: 0.6s ease-in-out;
`
const Menu = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 80px;
  width: calc(100% - 80px);
  background-color: ${Color.Sub};
`

export default Nav