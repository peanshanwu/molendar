import { useState } from 'react'
import { animated } from "react-spring"
import styled from 'styled-components'
import * as Color from './Color'


function Search() {

  const [searchValue, setSearchValue] = useState('')

  function searchMovie(e) {
    console.log(searchValue);
    setSearchValue(e.target.value)
  }

  return (
    <SearchContainer>
      {/* <SearchInput type="text" placeholder="Search for movie" value={SearchValue} onChange={(e)=> setSearchValue(e.target.value)} /> */}
      <SearchInput type="text" placeholder="Search for movie" value={searchValue} onChange={searchMovie} />
    </SearchContainer>
  )
}

const SearchContainer = styled.section`
  width: 100%;
  height: 60px;
  background-color: ${Color.Background};
  box-shadow: 0 0 50px rgba(0, 204, 204, .5);
  position: fixed;
  z-index: 1;
  top: 0;
  left: 80px;
  color: ${Color.Content}
`
const SearchInput = styled.input`
  font-size: 18px;
  padding: 10px 40px;
  color: ${Color.Light};
  width: 100%;
  height: 60px;
  border: none;
`

export default Search