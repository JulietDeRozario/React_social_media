import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AnotherProfile from './pages/AnotherProfile';


const App = () => {
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
        <nav>
          <Link to='/' className="nav-link">Home</Link>
          <Link to='/login' className="nav-link">Sign in</Link>
          <Link to='/register' className="nav-link">Sign up</Link>
          <Link to='/profile' className="nav-link">My profile</Link>
          <button onClick={() => {
            Cookies.remove('token');
            window.location.href = "/";
          }}>Log out</button>
        </nav>
        
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
