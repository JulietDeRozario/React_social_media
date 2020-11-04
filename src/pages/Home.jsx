import React, {useEffect, useState} from 'react';
import Cookies from 'js-cookie';
import Post from '../components/Post'

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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
    }
  }, [])

  const createPost = () => {
    const data = {
      text: document.getElementById('post-content').value,
      user: 7 
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
    .then((response) => window.location.reload())
    .catch((error) => console.error("lol: " + error))
  }

  return (
    <div className='home-txt'>
      <h1>Home sweet home</h1>
      <p>Welcome on My Social Network. This website is a training to Redux and React. We use auth and routing to create a small social media website.</p>
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
          />
        ))}
      </section>
    </div >
  )
}

export default Home;