import "./pages/reset.css";
import "./pages/base.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Index from "./pages/Index/Index";
import Personal from "./pages/Personal/Personal";
import Signin from "./pages/Signin/Signin";
import Movie from "./pages/Movie/Movie";
import MovieList from "./pages/MovieList/MovieList";
import Edit from "./pages/Personal/Edit";
import Collection from "./pages/Collection/Collection";
import Search from "./components/layout/Search";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Logo from "./components/layout/Logo";
import firebase from "./utils/firebase";
import { fetchMultiMovies } from "./utils/api";

// redux
import { useDispatch } from "react-redux";
import { getCurrentUserInfo } from "./redux/action";

function App() {
  const dispatch = useDispatch();
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [uid, setUid] = useState(null); //儲存uid，要改成redux
  const [user, setUser] = useState(null); //儲存uid，要改成redux
  const [userList, setUserList] = useState([]); // 所有user的資料
  const [myCalendarMovies, setMyCalendarMovies] = useState([]); // user_calendar底下所有電影
  const [calendarMoviesInfo, setCalendarMovieInfo] = useState([]); // 根據user_calendar打TMDB回來的電影資料

  useEffect(() => {
    // 取得使用者資料為非同步
    firebase.auth().onAuthStateChanged((currentUser) => {
      console.log("onAuthStateChanged 回傳", currentUser);
      setUser(currentUser);
      // setUid(currentUser.uid);

      if (currentUser) {
        setUid(currentUser.uid);
      } else {
        setUid(null);
      }
    });
  }, []);

  useEffect(() => {
    uid &&
      userRef.doc(uid).onSnapshot((doc) => {
        console.log(doc.data());
        // setCurrentUserInfo(doc.data());
        dispatch(getCurrentUserInfo(doc.data()));
      });
  }, [uid]);

  // useEffect(() => {
  //   uid &&
  //     userRef
  //       .doc(uid)
  //       .get()
  //       .then((doc) => {
  //         return doc.data();
  //       })
  //       .then((data) => {
  //         setCurrentUserInfo(data);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // }, [uid]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      uid &&
        userRef
          .doc(uid)
          .collection("user_calendar")
          .onSnapshot((snapshot) => {
            let myMoviesArr = [];
            snapshot.forEach((doc) => {
              myMoviesArr.push(doc.data());
            });
            console.log(myMoviesArr);
            setMyCalendarMovies(myMoviesArr);
            fetchMultiMovies(myMoviesArr).then((movieInfo) => {
              setCalendarMovieInfo(movieInfo);
            });
          });
    }
    return () => {
      isMounted = false;
    };
  }, [uid]);

  useEffect(() => {
    userRef
      .get()
      .then((snapshot) => {
        let userArr = [];
        snapshot.docs.forEach((user) => {
          console.log(user.data());
          userArr.push(user.data());
        });
        setUserList(userArr);
      })
      .catch((err) => {
        console.err(err);
      });
  }, []);

  // useEffect(() => {
  //   uid &&
  //     userRef
  //       .get()
  //       .then((snapshot) => {
  //         let userArr = [];
  //         snapshot.docs.forEach((user) => {
  //           userArr.push(user.data());
  //         });
  //         setUserList(userArr);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  // }, [uid]);

  return (
    <Router>
      <Header user={user} />
      <Logo />
      <Switch>
        <Route exact path="/">
          <Index uid={uid} />
        </Route>
        <Route exact path="/personal">
          <Personal
            uid={uid}
            userList={userList}
            myCalendarMovies={myCalendarMovies}
            calendarMoviesInfo={calendarMoviesInfo}
          />
        </Route>
        <Route exact path="/signin">
          <Signin uid={uid} />
        </Route>
        <Route exact path="/collection">
          <Collection />
        </Route>
        <Route exact path="/movie/:id">
          <Movie uid={uid} userList={userList} />
        </Route>
        <Route exact path="/movieList/:query">
          <MovieList />
        </Route>
        <Route exact path="/edit/:event_doc_id">
          <Edit
            uid={uid}
            userList={userList}
            myCalendarMovies={myCalendarMovies}
            calendarMoviesInfo={calendarMoviesInfo}
          />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
