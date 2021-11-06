import React, { useState } from 'react'
import styled from 'styled-components'
import  * as Color from '../../components/layout/Color'
import firebase from '../../utils/firebase'





function Profile({ currentUserInfo }) {
  return (
    <Wrapper>
      <Photo photoURL={ currentUserInfo.photoURL }/>
      <Name >{currentUserInfo.name}</Name>
    </Wrapper>
  )

}

const Wrapper = styled.div`
  color: ${Color.Content};
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`
const Photo = styled.div`
  /* background-color: #fff; */
  background-image: url(${props => props.photoURL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: 30px;
  height: 30px;
`
const Name = styled.p`
  margin-left: 10px;
  font-size: 20px;
`

export default Profile