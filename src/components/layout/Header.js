import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { FaSearch, FaHeart } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import * as Color from "./Color";
import firebase from "../../utils/firebase";
import Search from "./Search";
import swal from "sweetalert";
import * as BreakPoint from "../../components/layout/BreakPoints"

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
  
  function handleSignOut() {
    swal({
      title: "Are you sure?",
      icon: "info",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        firebase.auth().signOut();
        history.push("/");
        swal("See ya!", {
          icon: "success",
          buttons: false,
          timer: 1500
        });
      } else {
        swal("Great Choice!",{
          buttons: false,
          timer: 1500
        });
      }
    });
  }

  return (
    <>
      <Search
        style={
          displaySearchBar
            ? { transform: `translateX(0) translateY(0)` }
            : { transform: `translateX(0) translateY(-200%)` }
        }
        setDisplaySearchBar={setDisplaySearchBar}
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
            onClick={handleSignOut}
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
  "& a": {
    display: "inline-block",
  },
  "@media (max-width: 1200px)": {
    marginBottom: "0",
  }
};
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
  @media (max-width: ${BreakPoint.lg}) {
    flex-direction: row;
    width: 100%;
    height: 60px;
    left: 0;
    bottom: -2px;
    justify-content: space-between;
  }
`;
const HomeIcon = styled(AiFillHome)`
  ${iconStyle};
`;
const SearchIcon = styled(FaSearch)`
  ${iconStyle};
  font-size: 26px;
  @media (max-width: ${BreakPoint.lg}) {
    padding-bottom: 2px;
  }
`;
const MemberIcon = styled(BsFillPersonFill)`
  ${iconStyle};
`;
const CollectionIcon = styled(FaHeart)`
  ${iconStyle};
  font-size: 28px;
  @media (max-width: ${BreakPoint.lg}) {
    padding-top: 2px;
  }
`;
const LogoutIcon = styled(BiLogOut)`
  ${iconStyle};
  margin-top: auto;
  font-size: 35px;
  @media (max-width: ${BreakPoint.lg}) {
    margin-top: 0;
  }
`;

export default Header;
