import axios from 'axios';

const API_URL = 'http://localhost:8080/api/user'; 

// Function to get user info
export const getUser = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, 
      },
    });
    return response.data; 
  } catch (error) {
    throw error;
  }
};
