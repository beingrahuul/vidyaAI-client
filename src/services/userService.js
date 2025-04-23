import axios from 'axios';

const LOCAL_API_URL = 'http://localhost:8080/api/user'; 
const DEPLOYED_API_URL = 'https://vidyaai-server.onrender.com/api/user';

// Function to get user info
export const getUser = async () => {
  try {
    const response = await axios.get(LOCAL_API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};


export const updateInterests = async (data) => {
  try {
    const response = await axios.put(`${LOCAL_API_URL}/updateTargetTopics`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
  catch (error) {
    throw error;
  }
}



