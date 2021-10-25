import './pages/reset.css'
import './pages/base.css'
import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Index from './pages/Index/Index'
import Member from './pages/Member/Member'
import Signin from './pages/Signin/Signin'
import Header from './components/Header'
import Footer from './components/Footer'
import Logo from './components/Logo'


function App() {
  return (
    <Router>
      <Header />
      <Logo />
      <Switch>
        <Route exact path="/member">
          <Member />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/">
          <Index />
        </Route>
        {/* <Route path="/" exact compnent={Index} /> */}
        {/* <Route path="/member" compnent={Member} /> */}
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
