import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Post from '../components/Post';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [id, setId] = useState('');
  const [posts, setPosts] = useState([]);

  const loadInformations = (data) => {
    setEmail(data.email);
    setUsername(data.username);
    setDescription(data.description);
    setId(data.id);
  }
  
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

  useEffect(() => {
    if(!id) return
    
    fetch(`https://my-pasteque-space.herokuapp.com/posts?user.id=${id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => setPosts(data))
    .catch((error) => console.error('lol: ' + error))
  }, [id])

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
    <div className="profile-page">
      <h1>Profile page</h1>
      <h2>email: {email}</h2>
      <h2>username: {username}</h2>
      <h2>description: </h2>
      <p>{description}</p>
      <input id="username" type="text" placeholder="New username" />
      <input id="email" type="email" placeholder="New email" />
      <textarea id="description" placeholder="Update description" />
      <button onClick={()=> editProfile()}>Edit informations</button>
      <h1>My posts</h1>
      {posts &&
        posts.reverse().map(post => (
          <Post
            username={post.user.username}
            text={post.text}
            like={post.like}
            userId={post.user.id}
            id={post.id}
          />
        ))
      }
    </ div>
  )
}

export default Profile;