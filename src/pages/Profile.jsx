import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Post from '../components/Post';
import {useDispatch} from 'react-redux';
import { addUserId } from '../actions';


const Profile = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('No description yet, add one !');
  const [id, setId] = useState('');
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  const loadInformations = (data) => {
    console.log(data.id);
    setEmail(data.email);
    setUsername(data.username);
    setDescription(data.description);
    setId(data.id);
    dispatch(addUserId(data.id));
  }

  const getInformations = () => {
    console.log("coucou");
    fetch('https://my-pasteque-space.herokuapp.com/users/me', {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => loadInformations(data))
  }
  
  useEffect(() => {
    getInformations();
  }, [])

  useEffect(() => {
    console.log("coucouu")
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
  .then((data) => loadInformations(data))
  .catch((error) => console.error('lol: ' + error))
  }

  return (
    <div className="profile-page">
      <h1>My profile</h1>
      <div className="main-infos">
        <h2>email: {email}</h2>
        <h2>username: {username}</h2>
      </div>
      <div className="description">
        <h2>description</h2>
        <p>{description}</p>
      </div>
      <div className="edit-profile-form">
        <h2>Update my profile</h2>
        <input id="username" type="text" placeholder="New username" />
        <input id="email" type="email" placeholder="New email" />
        <textarea id="description" placeholder="Update description" />
        <button onClick={()=> editProfile()}>Edit informations</button>
      </div>
      <div className="display-posts">
        <h2>My posts</h2>
        <section className="posts">
          {posts &&
            posts.reverse().map(post => (
              <Post
                username={post.user.username}
                text={post.text}
                like={post.like}
                userId={post.user.id}
                id={post.id}
                reloadPosts={getInformations}
              />
            ))
          }
        </section>
      </div>
    </ div>
  )
}

export default Profile;