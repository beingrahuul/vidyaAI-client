import axios from 'axios'; // Keep axios import

// Use environment variables for API URLs
const LOCAL_API_URL = import.meta.env.VITE_LOCAL_API_URL || 'http://localhost:8080';
const DEPLOYED_API_URL = import.meta.env.VITE_DEPLOYED_API_URL || 'https://vidyaai-server.onrender.com';

// Determine which URL to use (you might have logic here based on environment)
const API_BASE_URL = LOCAL_API_URL; // Or DEPLOYED_API_URL based on your needs

/**
 * Sends a user prompt to the AI backend and receives response parts.
 * @param {string} prompt - The user's message.
 * @returns {Promise<Array<object>>} An array of response parts ({ type, content, ... }).
 * @throws {Error} If the request fails or the response format is invalid.
 */
export const generateAIResponse = async (prompt) => {
  try {
    const token = localStorage.getItem('token');
     if (!token) {
       console.error("No token found for generating AI response.");
       // Throw an error that the component can catch to redirect to login
       throw new Error("Authentication token missing.");
     }

    const response = await axios.post(`${API_BASE_URL}/api/ai/generate-response`,
      { prompt }, // Sending prompt as an object
      {
        headers: {
          Authorization: `Bearer ${token}`, // Including the token for authorization
          'Content-Type': 'application/json', // Explicitly set Content-Type
        },
      }
    );

    // --- CORRECTED: Access data from response.data.responseParts ---
    // The backend is sending { responseParts: [...] }, so access the array here
    const responseData = response.data.responseParts; // <--- Access the array from the property

    // Ensure responseData is indeed an array as expected from the backend handler
    if (!Array.isArray(responseData)) {
         console.error("Backend did not return an array in responseParts:", responseData);
         // Throw a specific error for invalid format
         throw new Error("Invalid response format from AI backend: responseParts is not an array.");
    }

    return responseData; // Return the array of response parts

  } catch (error) {
    console.error("Error generating AI response:", error);
    // Throw a consistent Error object
    if (error.response) {
        // Handle specific HTTP errors if needed (e.g., 401, 403)
        if (error.response.status === 401 || error.response.status === 403) {
             throw new Error("Unauthorized or Forbidden. Please log in.");
        }
        // Throw an error with the backend's message if available
        throw new Error(error.response.data.error || error.response.data.message || `Backend error: ${error.response.status}`);
    } else if (error.message === "Authentication token missing.") {
         // Re-throw the specific auth error
         throw error;
    } else {
        // Throw a generic network or unexpected error
        throw new Error("An unexpected error occurred while communicating with the AI backend.");
    }
  }
};


/**
 * Fetches user chat history from the backend.
 * @returns {Promise<object|null>} Chat history object or null if none exists.
 * @throws {Error} If the request fails.
 */
export const getChat = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found for fetching chat.");
       // Throw an error that the component can catch to redirect to login
      throw new Error("Authentication token missing.");
    }

    const response = await axios.get(`${API_BASE_URL}/api/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // axios provides parsed data in .data
    return response.data;

  } catch (error) {
    console.error("Error fetching chat:", error);
    // Throw a consistent Error object
     if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
             throw new Error("Unauthorized or Forbidden. Please log in.");
        }
        throw new Error(error.response.data.error || error.response.data.message || `Backend error: ${error.response.status}`);
    } else if (error.message === "Authentication token missing.") {
         throw error;
    } else {
        throw new Error("An unexpected error occurred while fetching chat history.");
    }
  }
};

/**
 * Triggers bio update/generation on the backend.
 * @returns {Promise<object>} The updated bio data.
 * @throws {Error} If the request fails.
 */
export const updateBio = async () => {
  try {
    const token = localStorage.getItem('token');
     if (!token) {
       console.error("No token found for updating bio.");
        // Throw an error that the component can catch to redirect to login
       throw new Error("Authentication token missing.");
     }

    const response = await axios.get(`${API_BASE_URL}/api/ai/updateBio`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // axios provides parsed data in .data
    return response.data;

  } catch (error) {
    console.error("Error updating bio:", error);
     // Throw a consistent Error object
     if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
             throw new Error("Unauthorized or Forbidden. Please log in.");
        }
        throw new Error(error.response.data.error || error.response.data.message || `Backend error: ${error.response.status}`);
    } else if (error.message === "Authentication token missing.") {
         throw error;
    } else {
        throw new Error("An unexpected error occurred while updating bio.");
    }
  }
}
