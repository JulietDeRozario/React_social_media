import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Navbar = () => {
  const currentUserId = useSelector(state => state.userId);

  return (
    <nav>
      <Link to='/' className="nav-link" title="home">
        <i className="fa fa-home" aria-hidden="true"/>
      </Link>
      { (!Cookies.get('token') && currentUserId === '') &&
        <>
          <Link to='/register' className="signup-btn">Sign up</Link>
          <Link to='/login' className="signin-btn">Sign in</Link>
        </>
      }
      { (Cookies.get('token') || currentUserId !== '') &&
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
  )
}

export default Navbar;