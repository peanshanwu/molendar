import './pages/reset.css'
import './pages/base.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Index from './pages/Index/Index'
import Personal from './pages/Personal/Personal'
import Signin from './pages/Signin/Signin'
import Movie from './pages/Movie/Movie'
import Search from './components/layout/Search'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Logo from './components/layout/Logo'


function App() {
  return (
    <Router>
      {/* <Search /> */}
      <Header />
      <Logo />
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route exact path="/personal">
          <Personal />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/movie/:id">
          <Movie />
        </Route>
        {/* <Route path="/" exact compnent={Index} /> */}
        {/* <Route path="/movie/" compnent={Movie} /> */}
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
