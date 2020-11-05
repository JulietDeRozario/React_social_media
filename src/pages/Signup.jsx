import React from 'react';
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { addUserId, addUsername } from '../actions';
import { useHistory } from "react-router-dom";



const Signup =() => {
  const dispatch = useDispatch();
  const history = useHistory();

  const createAccount = () => {
    const data = {
      username: document.getElementById('username').value,
      email: document.getElementById('mail').value,
      password: document.getElementById('password').value
    };
    
    fetch('https://my-pasteque-space.herokuapp.com/auth/local/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
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
      createAccount()
    }}>
      <h1>Sign up</h1>
      <input id="username" type="text" placeholder="Username"/>
      <input id="mail" type="email" placeholder="Email adress" />
      <input id="password" type="password" placeholder="Password" />
      <button type="submit">Sign up</button>
    </form>
  )
}

export default Signup;