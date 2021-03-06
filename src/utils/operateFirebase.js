import firebase from "./firebase"
import swal from "sweetalert";


const db = firebase.firestore();
const userRef = db.collection("users");
const movieInviteRef = db.collection("movie_invitations");
const friendInviteRef = db.collection("friend_invitations");



// -------------------------------------- Personal --------------------------------------
export function acceptFriend(friendUid, uid) {
  // 加入雙方friend_list
  userRef.doc(uid).update({
    friend_list: firebase.firestore.FieldValue.arrayUnion(friendUid),
  });
  userRef.doc(friendUid).update({
    friend_list: firebase.firestore.FieldValue.arrayUnion(uid),
  });
  // 移除朋友邀請
  friendInviteRef
    .doc(`${friendUid}-${uid}`)
    .delete()
    .then(() => {
      swal(`Accept!`, {
        icon: "success",
        button: false,
        timer: 1500,
      });

    })
    .catch((error) => {
      console.error(error);
    });
}

export function canselFriend(friendUid, uid) {
  swal({
    title: `Do you really want to cansel?`,
    text: `once you click, you will not be able to recover`,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      // 移除朋友邀請
      friendInviteRef
      .doc(`${friendUid}-${uid}`)
      .delete()
      .then(() => {
        console.log("deleted!");
      })
      .catch((error) => {
        console.error(error);
      });
      
      swal(`Deleted!`, {
        icon: "success",
        button: false,
        timer: 1500,
      });
    } else {
      swal("Mmm...Maybe next time!", {
        button: false,
        timer: 1500,
      });
    }
  });
}

export function acceptMovieInvitation(
  scheduleOwner,
  invitation_id,
  event_doc_id,
  date,
  movie_id,
  uid,
  movieInviteInfo,
  setMovieInviteInfo
) {
  // 刪除電影邀請
  movieInviteRef
    .doc(invitation_id)
    .delete()
    .then(() => {
      console.log(" Hi! movie invite delete");
    });

  db.collectionGroup("user_calendar")
    .where("event_doc_id", "==", event_doc_id)
    .get()
    .then((querySnapshot) => {
      let originWatchWithArr = [];

      // 將currnetUser加入所有人的watchWith
      querySnapshot.forEach((docRef) => {
        const docData = docRef.data();
        originWatchWithArr = [...docData.watchWith];
        userRef
          .doc(docData.uid)
          .collection("user_calendar")
          .doc(docData.doc_id)
          .set({ watchWith: [...docData.watchWith, uid] }, { merge: true });
      });
      // 加入currentUser的calendar
      const scheduleData = {
        scheduleOwner,
        date,
        event_doc_id,
        movie_id,
        watchWith: [...originWatchWithArr, uid],
        uid: uid,
      };
      userRef
        .doc(uid)
        .collection("user_calendar")
        .add(scheduleData)
        .then((docRef) => {
          swal("Add to Calendar!", `Check it out`, "success");
          userRef
            .doc(uid)
            .collection("user_calendar")
            .doc(docRef.id)
            .set({ doc_id: docRef.id }, { merge: true });
        });
    });
    
  if (movieInviteInfo.length === 1) {
    setMovieInviteInfo([])
  }
}

export function cancelMovieInvitation(invitation_id, movieInviteInfo, setMovieInviteInfo) {
  swal({
    title: "Reject this invitation?",
    text: "Once you reject, you will not be able to recover!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      // 刪除電影邀請
      movieInviteRef.doc(invitation_id).delete();
      swal("Cansel", {
        icon: "success",
      });
      if (movieInviteInfo.length === 1) {
        setMovieInviteInfo([])
      }
    } else {
      swal("Maybe think about it is right!", { button: false, timer: 1500 });
    }
  });
}

export function sendFriendInvitation(friendInfo, uid) {
  friendInviteRef.doc(`${uid}-${friendInfo.uid}`).set({
    from: uid,
    to: friendInfo.uid,
  });
  swal(`you send a friend invitaion to " ${friendInfo.name} "`, {
    buttons: false,
    timer: 3000,
  });
}