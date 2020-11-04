import React, {useState} from 'react';
import Cookies from 'js-cookie';

const Post = ({username, text, like, id}) => {
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
    .then((data) => console.log(data))
    .catch((error) => console.error('lol: ' + error))

    setLikeStatus(!likeStatus);
  }

  return (
    <div className="post-card">
      <small>{username}</small>
      <p>{text}</p>
      <p>likes: {nbLikes}</p>
      <button onClick={() => editPost()}>Like</button>
    </div>
  )
}

export default Post;