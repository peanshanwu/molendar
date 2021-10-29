import React from 'react'
import styled from 'styled-components'
import { FaStar } from "react-icons/fa"
// import * as Color from "../../components/layout/Color"

function DisplayStar({starPoints}) {
  const starToFive = Math.round(starPoints / 2)
  const starElement = [];
  for (let i = 0; i < starToFive; i += 1) {
    starElement.push(<StarIcon />)
  }
  return <>{ starElement }<p>{starPoints}</p></>
}

const StarIcon = styled(FaStar)`
  margin-right: 5px;
`

export default DisplayStar