import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//services
import { getUser } from '../services/userService'; 

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUser();
        console.log('User info:', user);
        setUserInfo(user); 
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  return (
    <div>
      {userInfo ? (
        <h1>Welcome, {userInfo.name}!</h1> // Render user info
      ) : (
        <h1>Loading user info...</h1>
      )}
    </div>
  );
};

export default Home;
