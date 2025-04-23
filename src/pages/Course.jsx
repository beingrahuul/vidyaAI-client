import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

// Service functions
import { fetchStudyGuideById } from '../services/learningService'; // Assuming updateStudyGuide is also in learningService

// Components
import UserNavbar from '../components/UserNavbar';


// Styled components for layout (Keeping your existing styles)
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9fafb; /* Light background */
  flex-direction: column;
  overflow: hidden; /* Prevent overflow from main container */
  font-family: 'Inter', sans-serif; /* Apply theme font */
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden; /* Ensure main content and sidebar handle their own scrolling */
`;

const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2em;
  color: #6b7280;
`;

const ErrorContainer = styled(LoadingContainer)`
  color: #ef4444; /* Red color for errors */
`;


const Course = () => {
  const { courseId } = useParams(); // Get the study guide ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null); // Stores the raw API response
  const [activeMaterialIndex, setActiveMaterialIndex] = useState(0); // Index in the flattened materials array
  const [completionPercentage, setCompletionPercentage] = useState(0);



  // --- Fetch Course Data on Component Mount ---
  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        console.error("[Course] No token found for fetching course data.");
        navigate('/login'); // Redirect to login if no token
        return;
      }

      try {
        const data = await fetchStudyGuideById(courseId); // Fetch the study guide by ID
        setCourseData(data); // Store the raw fetched data

      

      } catch (error) {
        console.error("[Course] Error fetching course data:", error);
         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
           localStorage.removeItem("token");
           navigate("/login"); // Redirect to login on auth error
         } else if (error.response && error.response.status === 404) {
            setError("Study guide not found."); // Specific error for 404
         }
        else {
           setError(error.message || "Failed to load study guide.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
        fetchCourseData();
    }

  }, [courseId, navigate]); // Depend on courseId and navigate




  // --- Render Logic ---
  if (loading) {
    return (
      <Container>
        <UserNavbar /> {/* Assuming UserNavbar doesn't need courseData */}
        <LoadingContainer>
          <p>Loading study guide content...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
      return (
          <Container>
              <UserNavbar />
              <ErrorContainer>
                  <p>{error}</p>
              </ErrorContainer>
          </Container>
      );
  }

  if (!courseData) {
    return (
      <Container>
        <UserNavbar />
        <LoadingContainer>
          <p>Study guide data is not available or empty.</p>
        </LoadingContainer>
      </Container>
    );
  }




  return (
    <Container>
      <UserNavbar /> {/* Assuming UserNavbar doesn't need courseData */}
      <MainContainer>
        
      </MainContainer>
    </Container>
  );
};

export default Course;
