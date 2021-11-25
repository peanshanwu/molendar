import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as Color from "../../components/layout/Color";
import { ImCheckmark, ImCross } from "react-icons/im";
import { format } from "date-fns";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { acceptMovieInvitation, cancelMovieInvitation } from "../../utils/operateFirebase";
import { v4 as uuidv4 } from 'uuid';

function MovieInvite({ uid, movieInviteInfo }) {
  
  // slider
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <Slider {...settings}>
      {movieInviteInfo?.map((invitation) => {
        return (
          <SubContainer
            key={uuidv4}
            backdrop={invitation.movieInfo.backdrop_path}
          >
            <Gradient>
              <MovieDate>
                {format(
                  new Date(
                    invitation.date[0],
                    invitation.date[1] - 1,
                    invitation.date[2]
                  ),
                  "MM/dd"
                )}
                <span>
                  {format(
                    new Date(
                      invitation.date[0],
                      invitation.date[1] - 1,
                      invitation.date[2]
                    ),
                    "iii"
                  )}
                </span>
              </MovieDate>
              <Wrap>
                <Photo
                  photoURL={invitation.userInfo.photoURL}
                />
                <Name>
                  {invitation.userInfo.name}
                  <span>
                    wants to invite you to watch ...
                  </span>
                </Name>
              </Wrap>
              <LinkTo to={`/movie/${invitation.movieInfo.id}`}>
              <MovieName>
                {invitation.movieInfo?.original_title}
              </MovieName>
              </LinkTo>
              <InvitationIconWrap>
                <Accept
                  onClick={() => {
                    acceptMovieInvitation(
                      invitation.userInfo.uid,
                      invitation.invitation_id,
                      invitation.event_doc_id,
                      invitation.date,
                      invitation.movieInfo.id,
                      uid
                    );
                  }}
                />
                <Cansel
                  onClick={() => {
                    cancelMovieInvitation(
                      invitation.invitation_id
                    );
                  }}
                />
              </InvitationIconWrap>
            </Gradient>
          </SubContainer>
        );
      })}
    </Slider>
  );
}

const iconStyle = {
  fontSize: "1.5rem",
  color: Color.Main,
  cursor: "pointer",
  transition: ".3s ease",
  "&:hover": {
    color: Color.Content,
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
  },
};
const Wrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;
const SubContainer = styled.div`
  background-image: url(https://image.tmdb.org/t/p/w1280/${(props) => props.backdrop});
  background-color: ${Color.Background};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  height: 515px;
  color: ${Color.Content};
  display: flex;
  margin-bottom: 30px;
  position: relative;
`;
const Photo = styled.div`
  /* background-color: #fff; */
  background-image: url(${(props) => props.photoURL});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;
const Name = styled.p`
  margin-left: 10px;
  font-size: 1rem;
  color: ${Color.Content};
  font-weight: 200;
  line-height: 2rem;

  & span {
    margin-left: 0.5rem;
    color: ${Color.Light};
  }
`;
const InvitationIconWrap = styled.div`
  position: absolute;
  bottom: 30px;
  right: 40px;
  
`;
const Accept = styled(ImCheckmark)`
  ${iconStyle}
  margin-right: 40px;
`;
const Cansel = styled(ImCross)`
  ${iconStyle}
  font-size: 1.25rem;
`;
const Gradient = styled.div`
  /* display: flex; */
  /* align-items: center; */
  padding-top: 150px;
  padding-left: 5%;
  width: 100%;
  height: 60%;
  position: relative;
  top: 40%;
  background: linear-gradient(360deg, ${Color.Background} 20%, transparent);
  color: ${Color.Content};
`;
const MovieDate = styled.p`
  color: ${Color.Main};
  font-size: 1.5rem;
  font-weight: 200;
  letter-spacing: 2px;

  & span {
    font-size: 0.5rem;
    margin-left: 0.5rem;
  }
`;
const LinkTo = styled(Link)`
  width: 100%;
`
const MovieName = styled.h3`
  max-width: calc(100% - 150px);
  font-size: 2rem;
  font-weight: 200;
  /* word-break: break-word; */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`;
export default MovieInvite;
