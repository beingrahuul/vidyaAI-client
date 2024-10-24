import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth'; 

// Function to register a user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};

// Optional: You can also create a function for user login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; 
  } catch (error) {
    throw error.response.data; 
  }
};
