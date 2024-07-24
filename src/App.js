import "./pages/reset.css";
import "./pages/base.css";
import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Index from "./pages/Index/Index";
import Personal from "./pages/Personal/Personal";
import Signin from "./pages/Signin/Signin";
import Movie from "./pages/Movie/Movie";
import SearchList from "./pages/SearchList/SearchList";
import Edit from "./pages/Personal/Edit";
import Collection from "./pages/Collection/Collection";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Logo from "./components/layout/Logo";
import firebase from "./utils/firebase";
import { fetchMultiMovies } from "./utils/api";
import NoMatch from "./pages/Others/NoMatch";
import SigninAlert from "./components/common/SigninAlert";
import Loading from "./components/layout/Loading";


// redux
import { useDispatch } from "react-redux";
import { getCurrentUserInfo } from "./redux/action";
import { getIsLogin } from "./redux/action"


function App() {
  const dispatch = useDispatch();
  const db = firebase.firestore();
  const userRef = db.collection("users");
  const [uid, setUid] = useState(); //儲存uid，要改成redux
  const [user, setUser] = useState(); //儲存uid，要改成redux
  const [userList, setUserList] = useState([]); // 所有user的資料
  const [myCalendarMovies, setMyCalendarMovies] = useState([]); // user_calendar底下所有電影
  const [calendarMoviesInfo, setCalendarMovieInfo] = useState([]); // 根據user_calendar打TMDB回來的電影資料
  const [isLogin, setIsLogin] = useState()

  useEffect(() => {
    // 取得使用者資料為非同步
    firebase.auth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        setUid(currentUser.uid);
        setIsLogin(true)
        dispatch(getIsLogin(true));
      } else {
        setIsLogin(false)
        dispatch(getIsLogin(false));
      }
      
    });
  }, []);

  useEffect(() => {
    uid &&
      userRef.doc(uid).onSnapshot((doc) => {
        // setCurrentUserInfo(doc.data());
        dispatch(getCurrentUserInfo(doc.data()));
      });
  }, [uid, userRef, dispatch]);

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
          userArr.push(user.data());
        });
        setUserList(userArr);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);


  return (
    <>
      <Header user={user} />
      <Logo />
      {isLogin === undefined
        ? <Loading />
        :
        <Switch>
          <Route exact path="/">
            <Index uid={uid} />
          </Route>
          <Route exact path="/personal">
            {isLogin
              ? <Personal
                uid={uid}
                userList={userList}
                myCalendarMovies={myCalendarMovies}
                calendarMoviesInfo={calendarMoviesInfo}
                />
              : <>
                  <SigninAlert />
                  <Redirect to="/signin" />
                </>
            }
          </Route>
          
          <Route exact path="/signin">
            {isLogin !== undefined && isLogin ? <Redirect to="/" /> : <Signin />}
          </Route>

          <Route exact path="/collection">
            {isLogin
              ? <Collection uid={uid} />
              : <>
                  <SigninAlert />
                  <Redirect to="/signin" />
                </>
            }      
          </Route>

          <Route exact path="/movie/:id">
            <Movie uid={uid} userList={userList} isLogin={isLogin}/>
          </Route>
          <Route exact path="/search/:query">
            <SearchList />
          </Route>
          <Route exact path="/edit/:event_doc_id">
            <Edit
              uid={uid}
              userList={userList}
              myCalendarMovies={myCalendarMovies}
              calendarMoviesInfo={calendarMoviesInfo}
            />
          </Route>
          <Route path="*"> {/* path裡面是寫正則表達式 */}
            <NoMatch />
          </Route>
        </Switch>
      }
      <Footer />
    </>
  );
}
export default App;
