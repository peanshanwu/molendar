import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaSearch, FaHeart } from "react-icons/fa";
import { BsFillPersonFill, BsPersonCircle } from "react-icons/bs";
import * as Color from "./Color";
import firebase from "../../utils/firebase";
import Search from "./Search";

function Header({ user }) {
  const history = useHistory();
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  console.log(displaySearchBar);

  function showSearchBar() {
    if (displaySearchBar) {
      setDisplaySearchBar(false);
    } else {
      setDisplaySearchBar(true);
    }
  }

  return (
    <>
      <Search
        style={
          displaySearchBar
            ? { transform: `translateX(0) translateY(0)` }
            : { transform: `translateX(0) translateY(-200%)` }
        }
      />
      <NavContainer>
        <Link to="/">
          <HomeIcon />
        </Link>
        {user ? (
          <Link to="/personal">
            <MemberIcon />
          </Link>
        ) : (
          <Link to="/signin">
            <MemberIcon />
          </Link>
        )}

        <Link to="/collection">
          <CollectionIcon />
        </Link>
        <SearchIcon onClick={showSearchBar} />

        {user && (
          <LogoutIcon
            onClick={() => {
              // 優化，不要用alert
              if (window.confirm("Do you really want to leave?")) {
                firebase.auth().signOut();
                history.push("/");
                console.log(`user`, user);
              } else {
                return;
              }
            }}
          />
        )}
      </NavContainer>
    </>
  );
}

const iconStyle = {
  fontSize: "30px",
  color: Color.Dark,
  marginBottom: "30px",
  cursor: "pointer",
  transition: ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
  },
};

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
`;
const HomeIcon = styled(AiFillHome)`
  ${iconStyle};
`;
const SearchIcon = styled(FaSearch)`
  ${iconStyle};
  font-size: 26px;
`;
const MemberIcon = styled(BsFillPersonFill)`
  ${iconStyle};
`;
const CollectionIcon = styled(FaHeart)`
  ${iconStyle};
  font-size: 25px;
`;
const LogoutIcon = styled(BiLogOut)`
  ${iconStyle};
  margin-top: auto;
`;

export default Header;
