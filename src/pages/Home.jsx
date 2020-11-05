import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import {useSelector} from 'react-redux';
import Post from '../components/Post'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const currentUserId = useSelector(state => state.userId);

  const getPosts = () => {
    if(Cookies.get('token')){
      fetch('https://my-pasteque-space.herokuapp.com/posts', {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`, 
          'Content-Type': 'application/json'
        }
      })
      .then((response) => response.json())
      .then((data) => setPosts(data)) 
      .catch((error) => console.error("lol: " + error))
    }
  }

  useEffect(() => {
    getPosts();
  }, [])

  const createPost = () => {
    const data = {
      text: document.getElementById('post-content').value,
      user: currentUserId
    };
    
    fetch('https://my-pasteque-space.herokuapp.com/posts', {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then(() => {getPosts()})
    .catch((error) => console.error("lol: " + error))
  }

  return (
    <div className='home-txt'>
      <div className='main-text'>
        <h1>My Social Network</h1>
        <p>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
      </div>
      {
      Cookies.get('token') &&
      <form className="create-post" onSubmit={(e) => {e.preventDefault(); createPost()}}>
        <textarea id="post-content" placeholder="Add a new post" />
        <button type="submit">Post</button>
      </form>
      }
      <section className="posts">
        {posts && 
        posts.reverse().map((post) => (
          <Post
            username={post.user.username}
            text={post.text}
            like={post.like}
            userId={post.user.id}
            id={post.id}
            reloadPosts = {getPosts}
          />
        ))}
      </section>
    </div >
  )
}

export default Home;