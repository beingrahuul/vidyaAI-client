// src/services/quizService.js

import axios from 'axios';

// Use environment variables for API URLs
const LOCAL_API_URL = import.meta.env.VITE_LOCAL_API_URL || 'http://localhost:8080';
const DEPLOYED_API_URL = import.meta.env.VITE_DEPLOYED_API_URL || 'https://vidyaai-server.onrender.com';

// Determine which URL to use (you might have logic here based on environment)
const API_BASE_URL = DEPLOYED_API_URL; // Or DEPLOYED_API_URL based on your needs


/**
 * Fetches all quizzes generated for the current user.
 * @returns {Promise<Array<object>>} An array of quiz objects.
 * @throws {Error} If the request fails.
 */
export const getAllQuizzes = async () => {
  try {
      const token = localStorage.getItem('token');
      if (!token) {
          console.error("No token found for fetching quizzes.");
          throw new Error("Authentication token missing.");
      }

      // This endpoint should be implemented in your backend (e.g., GET /api/quizzes)
      const response = await axios.get(`${API_BASE_URL}/api/quizzes`, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

      // Assuming the backend returns an array of quiz objects directly
      const quizzes = response.data;

      if (!Array.isArray(quizzes)) {
           console.error("Backend did not return an array for quizzes:", quizzes);
           throw new Error("Invalid response format for quizzes.");
      }

      return quizzes; // Return the array of quiz objects

  } catch (error) {
      console.error("Error fetching quizzes:", error);
       if (error.response) {
          if (error.response.status === 401 || error.response.status === 403) {
               throw new Error("Unauthorized or Forbidden. Please log in.");
          }
          throw new Error(error.response.data.error || error.response.data.message || `Backend error: ${error.response.status}`);
      } else if (error.message === "Authentication token missing.") {
           throw error;
      } else {
          throw new Error("An unexpected error occurred while fetching quizzes.");
      }
  }
};


// --- NEW: Function to fetch a specific quiz by ID ---
/**
 * Fetches a specific quiz by its ID.
 * @param {string} quizId - The ID of the quiz to fetch.
 * @returns {Promise<object>} The quiz data.
 * @throws {Error} If the quiz is not found or fetching fails.
 */
export const getQuizById = async (quizId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found for fetching quiz by ID.");
            throw new Error("Authentication token missing.");
        }

        // This endpoint should be implemented in your backend (e.g., GET /api/quizzes/:quizId)
        const response = await axios.get(`${API_BASE_URL}/api/quizzes/quiz/${quizId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        // Assuming the backend returns a single quiz object directly
        const quiz = response.data;

        if (!quiz || typeof quiz !== 'object') {
             console.error("Backend did not return a valid quiz object:", quiz);
             throw new Error("Invalid response format for quiz data.");
        }
         // Basic check for questions array
        if (!Array.isArray(quiz.questions)) {
             console.error("Quiz data is missing questions array:", quiz);
             throw new Error("Invalid quiz data structure: missing questions.");
        }


        return quiz; // Return the quiz object

    } catch (error) {
        console.error(`Error fetching quiz ${quizId}:`, error);
         if (error.response) {
            if (error.response.status === 404) {
                 throw new Error("Quiz not found.");
            }
            if (error.response.status === 401 || error.response.status === 403) {
                 throw new Error("Unauthorized or Forbidden. Please log in.");
            }
            throw new Error(error.response.data.error || error.response.data.message || `Backend error: ${error.response.status}`);
        } else if (error.message === "Authentication token missing.") {
             throw error;
        } else {
            throw new Error("An unexpected error occurred while fetching the quiz.");
        }
    }
};


// --- NEW: Function to submit quiz answers ---
/**
 * Submits user answers for a quiz for evaluation.
 * @param {string} quizId - The ID of the quiz.
 * @param {object} answers - The user's answers ({ questionId: answerValue }).
 * @returns {Promise<object>} The evaluation result from the backend.
 * @throws {Error} If submission or evaluation fails.
 */
export const submitQuizAnswers = async (quizId, answers) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found for submitting quiz.");
            throw new Error("Authentication token missing.");
        }

        // This endpoint should be implemented in your backend (e.g., POST /api/quizzes/:quizId/submit)
        const response = await axios.post(`${API_BASE_URL}/api/quizzes/submit/quiz/${quizId}`, {
            answers: answers // Send answers in the request body
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        // Assuming the backend returns an evaluation result object
        const evaluationResult = response.data;

         if (!evaluationResult || typeof evaluationResult !== 'object') {
             console.error("Backend did not return a valid evaluation result object:", evaluationResult);
             throw new Error("Invalid response format for quiz submission result.");
        }


        return evaluationResult; // Return the evaluation result (e.g., score, feedback)

    } catch (error) {
        console.error(`Error submitting quiz ${quizId}:`, error);
         if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                 throw new Error("Unauthorized or Forbidden. Please log in.");
            }
            if (error.response.status === 400) { // e.g., invalid answers format, quiz already submitted
                 // Backend should provide a specific error message here
                throw new Error(error.response.data.error || error.response.data.message || "Invalid submission data or quiz issue.");
            }
            throw new Error(error.response.data.error || error.response.data.message || `Backend error: ${error.response.status}`);
        } else if (error.message === "Authentication token missing.") {
             throw error;
        } else {
            throw new Error("An unexpected error occurred while submitting the quiz.");
        }
    }
};

