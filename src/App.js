import './pages/reset.css'
import './pages/base.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Index from './pages/Index/Index'
import Personal from './pages/Personal/Personal'
import Signin from './pages/Signin/Signin'
import Movie from './pages/Movie/Movie'
import Edit from './pages/Personal/Edit'
import Collection from './pages/Collection/Collection'
import Search from './components/layout/Search'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Logo from './components/layout/Logo'
import firebase from './utils/firebase'
import { fetchMultiMovies } from './utils/api'


function App() {

  const db = firebase.firestore();
  const userRef = db.collection('users');
  const [uid, setUid] = useState(null) //儲存uid，要改成redux
  const [user, setUser] = useState(null) //儲存uid，要改成redux
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  const [userList, setUserList] = useState([]) // 所有user的資料
  const [myCalendarMovies, setMyCalendarMovies] = useState([])    // user_calendar底下所有電影
	const [calendarMoviesInfo, setCalendarMovieInfo] = useState([])  // 根據user_calendar打TMDB回來的電影資料
  
  
  useEffect(() => {
    // 取得使用者資料為非同步
    firebase.auth().onAuthStateChanged((currentUser) => {
      // console.log('onAuthStateChanged 回傳', currentUser);
      setUser(currentUser)
      setUid(currentUser.uid)
    })
  }, []);


  useEffect(() => {
    uid && (
      userRef.doc(uid).get()
      .then((doc) => {
        return doc.data()
      })
      .then((data) => {
        setCurrentUserInfo(data)
      })
      .catch(err => {
        console.log(err);
      })
    )
  }, [uid])


  useEffect(() => {
    uid && (
			userRef.doc(uid).collection('user_calendar').get()
			.then((snapshot) => {
				let myMoviesArr = [];
				snapshot.docs.forEach(doc => {
					myMoviesArr.push(doc.data())
        })
        setMyCalendarMovies(myMoviesArr)
        return myMoviesArr
			})
			.then((myMoviesArr) => {
				fetchMultiMovies(myMoviesArr)
        .then((movieInfo) => {
					setCalendarMovieInfo(movieInfo)
				})
			})
      .catch(err => {
        console.log(err);
      })
		)
  }, [uid])
  

  useEffect(() => {
    uid && (
      userRef.get()
      .then((snapshot) => {
        let userArr = [];
        snapshot.docs.forEach(user => {
          userArr.push(user.data())
        })
        setUserList(userArr)
      })
      .catch(err => {
        console.log(err);
      })
   )
  }, [uid])





  return (
    <Router>
      {/* <Search /> */}
      <Header user={user}/>
      <Logo />
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/personal">
          <Personal
            uid={uid}
            currentUserInfo={currentUserInfo}
            userList={userList}
            myCalendarMovies={myCalendarMovies}
            calendarMoviesInfo={calendarMoviesInfo}
          />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/collection">
          <Collection />
        </Route>
        <Route exact path="/movie/:id">
          <Movie />
        </Route>
        <Route exact path="/edit/:id">
          <Edit
            uid={uid}
            currentUserInfo={currentUserInfo}
            userList={userList}
            myCalendarMovies={myCalendarMovies}
            calendarMoviesInfo={calendarMoviesInfo}
          />
        </Route>
        {/* <Route path="/" exact compnent={Index} /> */}
        {/* <Route path="/movie/" compnent={Movie} /> */}
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
