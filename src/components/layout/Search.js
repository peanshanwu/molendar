import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import * as Color from "./Color";
import * as BreakPoint from "../../components/layout/BreakPoints"

function Search({ style, setDisplaySearchBar }) {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  function searchMovie(e) {
    setSearchValue(e.target.value);
  }

  function keyPressSearch(e) {
    if (e.key === "Enter") {
      setSearchValue(e.target.value);
      history.push(`/search/${searchValue}`);
    }
  }

  function resetInput(e) {
    setSearchValue("");
  }

  return (
    <>
      <Mask onClick={() => { setDisplaySearchBar(false) }} style={style}/>
      <SearchContainer style={style}>
        <SearchInput
          type="text"
          placeholder="Search for movie"
          value={searchValue}
          onChange={searchMovie}
          onKeyPress={keyPressSearch}
          onClick={resetInput}
        />
        <SearchIconLink to={`/search/${searchValue}`}>
          <SearchIcon />
        </SearchIconLink>
      </SearchContainer>
    </>
  );
}
const iconStyle = {
  fontSize: "1.5rem",
  color: Color.Dark,
  cursor: "pointer",
  transition: ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, .5))",
  },
};
const Mask = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`
const SearchContainer = styled.section`
  transition: ease-in-out 0.6s;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${Color.Background};
  box-shadow: 0 0 50px rgba(0, 204, 204, 0.5);
  position: fixed;
  z-index: 2;
  top: 0;
  left: 80px;
  color: ${Color.Content};
  @media (max-width: ${BreakPoint.lg}) {
    left: 0;
  }
`;
const SearchInput = styled.input`
  font-size: 18px;
  padding: 10px 40px;
  color: ${Color.LLight};
  width: 100%;
  height: 60px;
  border: none;
`;
const SearchIconLink = styled(Link)`
  display: inline-block;
  position: absolute;
  right: 160px;
  @media (max-width: ${BreakPoint.lg}) {
    right: 80px;
  }
`;
const SearchIcon = styled(FaSearch)`
  ${iconStyle}
`;

export default Search;
