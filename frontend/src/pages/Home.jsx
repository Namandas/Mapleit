import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const onclickHandler = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/files/create-user-directory');
      const { token } = response.data;
      console.log(token);

      if (token) {
        localStorage.setItem('token', token);
        navigate('/allfiles');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating user directory:', error);
      navigate('/');
    }
  };

  return (
    <>
      <button onClick={onclickHandler}>START</button>
    </>
  );
};

export default Home;
