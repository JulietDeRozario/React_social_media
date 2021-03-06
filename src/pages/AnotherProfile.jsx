import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import Post from '../components/Post';

const AnotherProfile = () => {
  const [id, setId] = useState(localStorage.getItem('userId'));
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('No description');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`https://my-pasteque-space.herokuapp.com/users/${id}`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => loadInformations(data))

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
  }, [])

  const loadInformations = (data) => {
    setEmail(data.email);
    setUsername(data.username);
    setDescription(data.description);
  }
  
  return (
    <div className="profile-page">
      <h1>Profile page</h1>
      <div className="main-infos">
        <h2>email: {email}</h2>
        <h2>username: {username}</h2>
      </div>
      <div className="description" >
        <h2>description:</h2>
        <p>{description}</p>
      </div>
      <div className="display-posts">
        <h1>Posts</h1>
        <section className="posts">
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
        </section>
      </div>
    </ div>
  )
}

export default AnotherProfile;