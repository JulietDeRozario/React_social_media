import React from 'react';

const Post = ({username, text, like, id}) => {
  return (
    <div className="post-card">
      <small>{username}</small>
      <p>{text}</p>
      <p>likes: {like}</p>
    </div>
  )
}

export default Post;