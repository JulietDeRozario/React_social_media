import React, {useState} from 'react';
import Cookies from 'js-cookie';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';


const Post = ({username, text, like, userId, id, reloadPosts}) => {
  const [nbLikes, setNbLikes] = useState(like);
  const [likeStatus, setLikeStatus] = useState(false);
  const currentUserId = useSelector(state => state.userId);

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
    .then(() => reloadPosts())
    .catch((error) => console.error('lol: ' + error))
  }

  return (
    <div className="post-card">
      <Link className="profile-link" onClick={() => localStorage.setItem('userId', userId)} to={`/users/${username}`}>
        <i className="fa fa-user" aria-hidden="true"/>
        {"  " + username}
      </Link>
      <p>{text}</p>
      <hr/>
      <small>likes: {nbLikes}</small><br />
      {!likeStatus &&
        <button className="like-btn" onClick={() => editPost()}>
          <i className="far fa-heart" aria-hidden="true"/>
        </button>
      }
      {likeStatus &&
        <button className="like-btn" onClick={() => editPost()}>
          <i className="fas fa-heart" aria-hidden="true"/>
        </button>
      }
      
      {userId && (userId === currentUserId) &&
        <button className="delete-btn" title="delete post" onClick={() => deletePost()}>
          <i className="fas fa-trash" />
        </button>
      }
    </div>
  )
}

export default Post;