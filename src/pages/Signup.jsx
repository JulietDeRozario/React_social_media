import React from 'react';
import Cookies from 'js-cookie'

const Signup =() => {
  const createAccount = () => {
    const data = {
      username: document.getElementById('username').value,
      email: document.getElementById('mail').value,
      password: document.getElementById('password').value
    };
    
    fetch('https://api-minireseausocial.mathis-dyk.fr/auth/local/register', {
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
  }

  return (
    <form onSubmit={(e) => {
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