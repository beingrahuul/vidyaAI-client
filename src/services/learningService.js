import axios from 'axios';

const LOCAL_API_URL = import.meta.env.VITE_LOCAL_API_URL || 'http://localhost:8080';
const DEPLOYED_API_URL = import.meta.env.VITE_DEPLOYED_API_URL || 'https://vidyaai-server-production.up.railway.app';

const API_BASE_URL = DEPLOYED_API_URL; // Or DEPLOYED_API_URL based on your needs


/**
 * Calls the backend to generate a study guide for a given topic.
 * @param {string} topic - The topic for which to generate the study guide.
 * @returns {Promise<object>} The generated study guide data object.
 * @throws {Error} If the request fails or the response format is invalid.
 */
export const generateStudyGuide = async (topic) => {
  try {
    const token = localStorage.getItem('token');
     if (!token) {
       console.error("[LearningService] No token found for generating study guide.");
       // Throw an error that the component can catch to redirect to login
       throw new Error("Authentication token missing.");
     }

    console.log(`[LearningService] Calling backend to generate study guide for topic: "${topic}"`);

    // Make the POST request to your backend endpoint
    const response = await axios.post(`${API_BASE_URL}/api/study-guide/generate`,
      { topic }, // Send the topic in the request body
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authorization
          'Content-Type': 'application/json', // Explicitly set Content-Type
        },
      }
    );

    // Assuming the backend returns the study guide data directly in the response body
    const studyGuideData = response.data;
    console.log("[LearningService] Received study guide data from backend:", studyGuideData);

    // Basic validation of the response structure (optional but recommended)
    if (!studyGuideData || typeof studyGuideData !== 'object' || !Array.isArray(studyGuideData.sections)) {
         console.error("[LearningService] Backend did not return a valid study guide object:", studyGuideData);
         throw new Error("Invalid response format for study guide data.");
    }

    return studyGuideData; // Return the generated study guide data

  } catch (error) {
    console.error("[LearningService] Error generating study guide:", error);
    // Throw a consistent Error object for the calling component to handle
    if (error.response) {
        // Handle specific HTTP errors (e.g., 400, 401, 403, 404, 500)
        if (error.response.status === 401 || error.response.status === 403) {
             throw new Error("Unauthorized or Forbidden. Please log in.");
        }
         if (error.response.status === 400) {
             throw new Error(error.response.data.message || "Bad request: Invalid topic provided.");
         }
         if (error.response.status === 404) {
             throw new Error(error.response.data.message || "Resource not found on backend.");
         }
        // Throw an error with the backend's message if available
        throw new Error(error.response.data.error || error.response.data.message || `Backend error: ${error.response.status}`);
    } else if (error.message === "Authentication token missing.") {
         // Re-throw the specific auth error
         throw error;
    } else {
        throw new Error("An unexpected error occurred while generating the study guide.");
    }
  }
};


/**
 * Fetches all study guides for the authenticated user.
 * @returns {Promise<object[]>} An array of study guide objects.
 * @throws {Error} If the request fails or the response format is invalid.
 */

export const fetchAllStudyGuides = async () => {
  try {
    const token = localStorage.getItem('token');
     if (!token) {
       console.error("[LearningService] No token found for fetching study guides.");
       // Throw an error that the component can catch to redirect to login
       throw new Error("Authentication token missing.");
     }

    console.log("[LearningService] Fetching all study guides from backend...");

    // Make the GET request to your backend endpoint
    const response = await axios.get(`${API_BASE_URL}/api/study-guide/`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authorization
        'Content-Type': 'application/json', // Explicitly set Content-Type
      },
    });

    // Assuming the backend returns an array of study guide data directly in the response body
    const studyGuides = response.data;
    console.log("[LearningService] Received study guides from backend:", studyGuides);

    // Basic validation of the response structure (optional but recommended)
    if (!Array.isArray(studyGuides)) {
         console.error("[LearningService] Backend did not return a valid array of study guides:", studyGuides);
         throw new Error("Invalid response format for study guides.");
    }

    return studyGuides; // Return the array of study guide data

  } catch (error) {
    console.error("[LearningService] Error fetching all study guides:", error);
    // Throw a consistent Error object for the calling component to handle
    if (error.response) {
        // Handle specific HTTP errors (e.g., 400, 401, 403, 404, 500)
        if (error.response.status === 401 || error.response.status === 403) {
             throw new Error("Unauthorized or Forbidden. Please log in.");
        }
         if (error.response.status === 400) {
             throw new Error(error.response.data.message || "Bad request: Invalid request.");
         }
         if (error.response.status === 404) {
             throw new Error(error.response.data.message || "Resource not found on backend.");
         }
        // Throw an error with the backend's message if available
        throw new Error(error.response.data.error || error.response.data.message || `Backend error: ${error.response.status}`);
    } else if (error.message === "Authentication token missing.") {
         // Re-throw the specific auth error
         throw error
    }
    else {
        throw new Error("An unexpected error occurred while fetching study guides.");
    }
  }
}

/**
 * Fetches a specific study guide by its ID.
 * @param {string} studyGuideId - The ID of the study guide to fetch.
 * @returns {Promise<object>} The study guide object.
 * @throws {Error} If the request fails or the response format is invalid.
 */

export const fetchStudyGuideById = async (studyGuideId) => {
  try {
    const token = localStorage.getItem('token');
     if (!token) {
       console.error("[LearningService] No token found for fetching study guide by ID.");
       // Throw an error that the component can catch to redirect to login
       throw new Error("Authentication token missing.");
     }

    console.log(`[LearningService] Fetching study guide with ID: ${studyGuideId} from backend...`);

    // Make the GET request to your backend endpoint
    const response = await axios.get(`${API_BASE_URL}/api/study-guide/${studyGuideId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authorization
        'Content-Type': 'application/json', // Explicitly set Content-Type
      },
    });

    // Assuming the backend returns the study guide data directly in the response body
    const studyGuide = response.data;
    console.log("[LearningService] Received study guide from backend:", studyGuide);

    // Basic validation of the response structure (optional but recommended)
    if (!studyGuide || typeof studyGuide !== 'object') {
         console.error("[LearningService] Backend did not return a valid study guide object:", studyGuide);
         throw new Error("Invalid response format for study guide.");
    }

    return studyGuide; // Return the fetched study guide data

  } catch (error) {
    console.error("[LearningService] Error fetching study guide by ID:", error);
    // Throw a consistent Error object for the calling component to handle
    if (error.response) {
        // Handle specific HTTP errors (e.g., 400, 401, 403, 404, 500)
        if (error.response.status === 401 || error.response.status === 403) {
             throw new Error("Unauthorized or Forbidden. Please log in.");
        }
         if (error.response.status === 400) {
             throw new Error(error.response.data.message || "Bad request: Invalid request.");
         }
         if (error.response.status === 404) {
             throw new Error(error.response.data.message || "Resource not found on backend.");
         }
        // Throw an error with the backend's message if available
        throw new Error(error.response.data.error || error.response.data.message || `Backend error: ${error.response.status}`);
    } else if (error.message === "Authentication token missing.") {
        throw error
    }
    else {
        throw new Error("An unexpected error occurred while fetching the study guide.");
    }
  }
}