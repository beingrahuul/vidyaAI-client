import axios from 'axios';

const LOCAL_API_URL = 'http://localhost:8080/api/auth'; 
const DEPLOYED_API_URL = 'https://vidyaai-server.onrender.com/api/auth';

// Function to register a user
export const registerUser = async (userData) => {
  console.log(userData)
  try {
    const response = await axios.post(`${DEPLOYED_API_URL}/register`, userData);
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};

// Optional: You can also create a function for user login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${DEPLOYED_API_URL}/login`, credentials);
    return response.data; 
  } catch (error) {
    console.log(error)
    throw error.response.data; 
  }
};
