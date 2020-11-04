import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    fetch('https://my-pasteque-space.herokuapp.com/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => loadInformations(data))
  }, [])

  const loadInformations = (data) => {
    setEmail(data.email);
    setUsername(data.username);
    setDescription(data.description);
    setId(data.id);
  }

  const editProfile = () => {
    const data = {
      username: document.getElementById('username').value,
      email: document.getElementById('email').value,
      description: document.getElementById('description').value
    };

    if(data.username === ''){
      data.username = username;
    }
    if(data.email === ''){
      data.email = email;
    }
    if(data.description === ''){
      data.description = description;
    }
    
    fetch(`https://my-pasteque-space.herokuapp.com/users/${id}`, {
    method: 'put',
    headers: {
      'Authorization': `Bearer ${Cookies.get('token')}`, 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('lol: ' + error))
  }

  return (
    <>
    <h1>Profile page</h1>
    <h2>email: {email}</h2>
    <h2>username: {username}</h2>
    <h2>description: </h2>
    <p>{description}</p>
    <input id="username" type="text" placeholder="New username" />
    <input id="email" type="email" placeholder="New email" />
    <textarea id="description" placeholder="Update description" />
    <button onClick={()=> editProfile()}>Edit informations</button>
    </>
  )
}

export default Profile;