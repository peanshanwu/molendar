import React from "react";
import styled from "styled-components";
import firebase from "../../utils/firebase";
import { IoMdAddCircle } from "react-icons/io";
import { format } from "date-fns";
import * as Color from "../../components/layout/Color";
import swal from "sweetalert";

export default function AddToCalendarIcon({ uid, selectDay, movieId }) {
  const db = firebase.firestore();
  const userRef = db.collection("users");
  // const formatSelectDay = format(selectDay, "yyyy-MM-dd")
  //   .split("-")
  //   .map((e) => e);

  const formatToday = format(new Date(), "yyyy-MM-dd")
    .split("-")
    .map((e) => e);

  function clickAdd() {
    userRef
      .doc(uid)
      .collection("user_calendar")
      .add({
        // date: formatSelectDay,
        date: formatToday, //改成加到今天
        movie_id: movieId,
        watchWith: [uid], //一開始加入自己，為了之後如果多個邀請時，加入watchWith只要刪掉currentUser，即得所有共享這個電影行程的其他人
        scheduleOwner: uid,
        uid: uid,
      })
      .then((docRef) => {
        swal(
          "Add to Calendar!",
          `The date you add | ${format(new Date(), "yyyy/MM/dd")}`,
          "success"
        );
        userRef
          .doc(uid)
          .collection("user_calendar")
          .doc(docRef.id)
          .set({ doc_id: docRef.id, event_doc_id: docRef.id }, { merge: true });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return <AddToCalendar onClick={clickAdd} />;
}

const iconStyle = {
  filter: "drop-shadow(1px 1px 10px rgba(0, 0, 0, .5))",
  fontSize: "2rem",
  color: Color.Dark,
  cursor: "pointer",
  transition: ".3s ease",
  "&:hover": {
    WebkitFilter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
    filter: "drop-shadow(0 0 5px rgba(0, 204, 204, 1))",
  },
};

const AddToCalendar = styled(IoMdAddCircle)`
  ${iconStyle};
  color: white;
  font-size: 40px;
  cursor: pointer;
`;
