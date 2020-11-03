import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('https://api-minireseausocial.mathis-dyk.fr/users/me', {
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
  }

  return (
    <>
    <h1>Profile page</h1>
    <h2>email: {email}</h2>
    <h2>username: {username}</h2>
    </>
  )
}

export default Profile;