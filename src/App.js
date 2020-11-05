import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams, Redirect } from "react-router-dom";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AnotherProfile from './pages/AnotherProfile';

const App = () => {
  const [auth, setAuth] = useState(false);
  const history = useHistory();

  const checkAuth = () => {
    if(Cookies.get('token')){
      return true;
      setAuth(true);
    } else {
      return false;
    }
  }

  useEffect(() => {
    
  }, [auth])

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
          <Link to='/' className="nav-link" title="home">
            <i className="fa fa-home" aria-hidden="true"/>
          </Link>
          { !Cookies.get("token") &&
            <>
              <Link to='/login' className="nav-link">Sign in</Link>
              <Link to='/register' className="nav-link">Sign up</Link>
            </>
          }
          { Cookies.get("token") &&
            <>
              <Link to='/profile' className="nav-link" title="my profile">
                <i className="fa fa-user" aria-hidden="true"/>
              </Link>
              <button className="log-out-btn" onClick={() => {
                Cookies.remove('token');
                window.location.reload();
              }}>Log out</button>
            </>
          }
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
