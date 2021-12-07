import React, { useState, useEffect } from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { IoHeartCircleSharp } from "react-icons/io5";
import * as Color from "../../components/layout/Color";
import swal from "sweetalert";

// redux
import { useSelector } from "react-redux";

export default function AddToCollection({ uid, movieId }) {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [collected, setCollected] = useState(false);
  const isLogin = useSelector(state => state.isLogin)

  useEffect(() => {
    uid &&
      userRef
        .doc(uid)
        .get()
        .then((doc) => {
          setCollected(doc.data().user_collection?.includes(movieId));
        });
  }, [uid]);

  function clickAdd(movieId) {
    if (collected) {
      // remove
      userRef.doc(uid).update({
        user_collection: firebase.firestore.FieldValue.arrayRemove(movieId),
      });
      setCollected(false);
      swal("Remove from Favorites!", {
        icon: "success",
        button: false,
        timer: 1500,
      });
    } else {
      // add
      userRef.doc(uid).update({
        user_collection: firebase.firestore.FieldValue.arrayUnion(movieId),
      });
      setCollected(true);
      swal("Add to Favorites!", {
        icon: "success",
        button: false,
        timer: 1500,
      });
    }
  }

  return (
    <>
      {isLogin
        ? <Icon onClick={() => clickAdd(movieId)} collected={collected} />
        : null
      }
    </>
  )
}

const iconStyle = {
  filter: "drop-shadow(1px 1px 10px rgba(0, 0, 0, .5))",
  fontSize: "2rem",
  cursor: "pointer",
  transition: ".3s ease",
  "&:hover": {
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
  },
};

const Icon = styled(IoHeartCircleSharp)`
  ${iconStyle};
  color: ${(props) => (props.collected ? Color.Main : Color.Content)};
  font-size: 40px;
  cursor: pointer;
`;
