import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';


const App = () => {
  useEffect(() => {
    
    
  }, [])

  return (
    <div className="main">
      <Router>
        <nav>
          <Link to='/'className="nav-link">Home</Link>
          <Link to='/log_in'className="nav-link">Sign in</Link>
          <Link to='/sign_up'className="nav-link">Sign up</Link>
        </nav>
        
        <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/log_in">
              <Login />
            </Route>
            <Route exact path="/sign_up">
              <Signup />
            </Route>
          </Switch>
      </Router>
    </div>

  )
}

export default App;
