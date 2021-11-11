import React from "react";
import { Link } from "react-router-dom";
import * as Color from "../../components/layout/Color";
import styled from "styled-components";
import DisplayStar from "../../components/common/DisplayStar";
import { ImCross } from "react-icons/im";
import EasyEdit, { Types } from "react-easy-edit";
// import Loading from '../../components/layout/Loading'

const CustomDisplay = (props) => {
  const val = props.value || "redlohecalp motsuC";
  return <div>{val.split("").reverse().join("")}</div>;
};

function Collection() {
  const save = (value) => {
    alert(value);
  };
  const cancel = () => {
    alert("Cancelled");
  };

  return (
    <>
      <Wrapper>
        <Main>
          <Container>
            <Title>My Collection</Title>
            <CommentWrap>
              <Poster src="https://image.tmdb.org/t/p/w500/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg" />
              <Wrap1>
                <Wrap2>
                  <MovieName>Movie Name</MovieName>
                  <StarWrapper>
                    <DisplayStar starPoints={10} />
                  </StarWrapper>
                </Wrap2>
                <EditWrap>
                  <EasyEdit
                    // type={Types.TEXT}
                    // value="em esrever ot em kcilC"
                    // onSave={val => console.log(val)}
                    // displayComponent={<CustomDisplay />}
                    // instructions="Custom placeholder reverses text"
                    type="text"
                    onSave={save}
                    onCancel={cancel}
                    saveButtonLabel="Save"
                    cancelButtonLabel="Cancel"
                    attributes={{ name: "awesome-input", id: 1 }}
                    instructions="write down your short comment!"
                  />
                </EditWrap>
                <IconWrap>
                  <Cansel />
                </IconWrap>
              </Wrap1>
            </CommentWrap>
            <CommentWrap>
              <Poster src="https://image.tmdb.org/t/p/w500/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg" />
              <Wrap1>
                <Wrap2>
                  <MovieName>Movie Name</MovieName>
                  <StarWrapper>
                    <DisplayStar starPoints={10} />
                  </StarWrapper>
                </Wrap2>
                <EditWrap>
                  <EasyEdit
                    // type={Types.TEXT}
                    // value="em esrever ot em kcilC"
                    // onSave={val => console.log(val)}
                    // displayComponent={<CustomDisplay />}
                    // instructions="Custom placeholder reverses text"
                    type="text"
                    onSave={save}
                    onCancel={cancel}
                    saveButtonLabel="Save"
                    cancelButtonLabel="Cancel"
                    attributes={{ name: "awesome-input", id: 1 }}
                    instructions="write down your short comment!"
                  />
                </EditWrap>
                <IconWrap>
                  <Cansel />
                </IconWrap>
              </Wrap1>
            </CommentWrap>
            <CommentWrap>
              <Poster src="https://image.tmdb.org/t/p/w500/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg" />
              <Wrap1>
                <Wrap2>
                  <MovieName>Movie Name</MovieName>
                  <StarWrapper>
                    <DisplayStar starPoints={10} />
                  </StarWrapper>
                </Wrap2>
                <EditWrap>
                  <EasyEdit
                    // type={Types.TEXT}
                    // value="em esrever ot em kcilC"
                    // onSave={val => console.log(val)}
                    // displayComponent={<CustomDisplay />}
                    // instructions="Custom placeholder reverses text"
                    type="text"
                    onSave={save}
                    onCancel={cancel}
                    saveButtonLabel="Save"
                    cancelButtonLabel="Cancel"
                    attributes={{ name: "awesome-input", id: 1 }}
                    instructions="write down your short comment!"
                  />
                </EditWrap>
                <IconWrap>
                  <Cansel />
                </IconWrap>
              </Wrap1>
            </CommentWrap>
          </Container>
        </Main>
      </Wrapper>
    </>
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
const Wrapper = styled.section`
  color: ${Color.Content};
  padding: 40px 0;
  position: relative;
  width: 100%;
  /* border: 1px solid gray; */
  /* background-image: url(); */
  background-color: ${Color.Background};
`;
const Main = styled.main`
  width: calc(100% - 80px);
  position: relative;
  left: 80px;
`;
const Container = styled.div`
  word-break: break-all;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  /* outline: 1px solid gray; */
`;
const Wrap1 = styled.div`
  width: 100%;
  /* outline: 1px solid red ; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Wrap2 = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  /* outline: 1px solid yellow; */
`;
const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;
const MovieName = styled.h2`
  font-size: 2rem;
`;
const EditWrap = styled.div`
  width: 80%;
  /* height: 300px; */
  max-height: 300px;
  overflow-y: scroll;
  /* background-color: ${Color.Light}; */
`;
const CommentWrap = styled.div`
  width: 100%;
  /* height: 500px; */
  background-color: ${Color.Sub};
  margin-bottom: 50px;
  display: flex;
  position: relative;
`;
const Poster = styled.img`
  width: 30%;
  background-color: ${Color.Background};
`;
const IconWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const Cansel = styled(ImCross)`
  ${iconStyle}
  font-size: 1.25rem;
`;
const StarWrapper = styled.div`
  color: ${Color.Main};
  display: flex;
  flex-wrap: wrap;
  margin-left: 15px;
  font-size: 20px;
`;

export default Collection;
