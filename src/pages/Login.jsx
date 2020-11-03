import React from 'react'; 
import Cookies from 'js-cookie'

const Login = () => {
  const login = () => {
    const data = {
      identifier: document.getElementById('identifier').value,
      password: document.getElementById('password').value
    };
    
    fetch('https://api-minireseausocial.mathis-dyk.fr/auth/local/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((response) => createCookie(response.jwt))
    .catch((error) => console.error("lol: " + error))
  }

  const createCookie = (token) => {
    Cookies.set('token', token);
    window.location.href = "/";
  }

  return (
    <form onSubmit={(e) => {
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
