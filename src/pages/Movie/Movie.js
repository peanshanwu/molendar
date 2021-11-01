import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
// import styled from "styled-components"
// import * as Color from '../../components/layout/Color'


// const posterURL = 'https://image.tmdb.org/t/p/w500'


const Movie = () => {

  const { id } = useParams();

  return (

		<div>{id}</div>
	)
}



export default Movie