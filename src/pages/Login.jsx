import React from 'react'; 
import Cookies from 'js-cookie'
import {useDispatch} from 'react-redux';
import { addUserId, addUsername } from '../actions';
import { useHistory } from "react-router-dom";


const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const login = () => {
    const data = {
      identifier: document.getElementById('identifier').value,
      password: document.getElementById('password').value
    };
    
    fetch('https://my-pasteque-space.herokuapp.com/auth/local', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
      dispatch(addUserId(response.user.id));
      dispatch(addUsername(response.user.username));
      createCookie(response.jwt);
    })
    .catch((error) => console.error("lol: " + error))
  }

  const createCookie = (token) => {
    Cookies.set('token', token);
    history.push("/");
  }

  return (
    <form className="register-form" onSubmit={(e) => {
      e.preventDefault();
      login();
    }}>
      <h1>Log in</h1>
      <input id="identifier" type='text' placeholder='Username or Email adress' />
      <input id="password" type='password' placeholder='password' />
      <button type='submit'>Log in</button>
    </form>
  )
}

export default Login;
