import React, {useState} from 'react';
import Cookies from 'js-cookie';


const Post = ({username, text, like, userId, id}) => {
  const [nbLikes, setNbLikes] = useState(like);
  const [likeStatus, setLikeStatus] = useState(false);

  const editPost = () => {
    const data = {
      like: nbLikes
    }

    if(likeStatus === false){
      data.like = nbLikes + 1;
      setNbLikes(nbLikes + 1);
    }else {
      data.like = nbLikes - 1;
      setNbLikes(nbLikes - 1);
    }

    fetch(`https://my-pasteque-space.herokuapp.com/posts/${id}`, {
      method: 'put',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .catch((error) => console.error('lol: ' + error))

    setLikeStatus(!likeStatus);
  }

  const deletePost = () => {
    fetch(`https://my-pasteque-space.herokuapp.com/posts/${id}`, {
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${Cookies.get('token')}`, 
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then((data) => window.location.reload())
    .catch((error) => console.error('lol: ' + error))
  }

  return (
    <div className="post-card">
      <a onClick={() => localStorage.setItem('userId', userId)} href={`/users/${username}`}>{username}</a>
      <p>{text}</p>
      <p>likes: {nbLikes}</p>
      <button onClick={() => editPost()}>Like</button>
      {userId === 7 &&
        <button onClick={() => deletePost()}>Delete my post</button>
      }
    </div>
  )
}

export default Post;