import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AnotherProfile from './pages/AnotherProfile';
import Navbar from './components/Navbar';

const App = () => {
  const history = useHistory();

  const checkAuth = () => {
    if(Cookies.get('token')){
      return true;
    } else {
      return false;
    }
  }

  const UnAuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Redirect to={{ pathname: '/' }} />
      ) : (
          <Component {...props} />
        )
    )} />
  )

  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      checkAuth() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
    )} />
  )

  return (
    <div className="main">
      <Router>
        <Navbar />  
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/users/:username">
              <AnotherProfile />
            </Route>            
            <UnAuthRoute path="/login" component={Login} />
            <UnAuthRoute path="/register" component={Signup} />
            <AuthRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
