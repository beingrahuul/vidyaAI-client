import axios from 'axios';

const LOCAL_API_URL = 'http://localhost:8080'; 
const DEPLOYED_API_URL = 'https://vidyaai-server-production.up.railway.app';

export const generateAIResponse = async (prompt) => {
  try {
    const response = await axios.post(`${LOCAL_API_URL}/api/ai/generate-response`, 
      { prompt }, // Sending prompt as an object
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Including the token for authorization
        },
      }
    );

    return response.data; 
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw error.response ? error.response.data : { message: "An unexpected error occurred." }; 
  }
};


export const getChat = async () => {
  try {
    const response = await axios.get(`${DEPLOYED_API_URL}/api/chat`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching chat:", error);
    throw error.response ? error.response.data : { message: "An unexpected error occurred." };
  }
}