import React from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { IoMdAddCircle } from "react-icons/io";
import { format } from "date-fns";

export default function AddToCalendarIcon({ uid, selectDay, movieId }) {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const formatSelectDay = format(selectDay, "yyyy-MM-dd")
    .split("-")
    .map((e) => e);

  function clickAdd() {
    userRef
      .doc(uid)
      .collection("user_calendar")
      .add({
        date: formatSelectDay,
        movie_id: movieId,
        watchWith: [uid], //一開始加入自己，為了之後如果多個邀請時，加入watchWith只要刪掉currentUser，即得所有共享這個電影行程的其他人
        scheduleOwner: uid,
        uid: uid,
      })
      .then((docRef) => {
        window.alert("Add to Calendar");
        console.log("Document written with ID: ", docRef.id);
        console.log(typeof uid);
        userRef
          .doc(uid)
          .collection("user_calendar")
          .doc(docRef.id)
          .set({ doc_id: docRef.id, event_doc_id: docRef.id }, { merge: true });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }

  return <AddToCalendar onClick={clickAdd} />;
}

const AddToCalendar = styled(IoMdAddCircle)`
  color: white;
  font-size: 40px;
  cursor: pointer;
  margin-left: 10px;
`;
