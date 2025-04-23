// src/pages/Learning.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Components
import UserNavbar from '../components/UserNavbar';
import Navigation from '../components/Home/Navigation';
import CourseCard from '../components/CourseCard';

// Services
import { getUser } from '../services/userService';
import { generateStudyGuide, fetchAllStudyGuides } from '../services/learningService'; // Assuming you name the service learningService.js


// Styled Components (Keeping your existing styles and adding new ones)
const AppContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  background-color: #ffffff; /* Ensure AppContainer has a background */
`;

const Container = styled.div`
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  background: #f7fafc; /* Use a light background for the main container */
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensure it takes at least full viewport height */
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  max-width: 1200px; // Limit content width on large screens
  margin: 0 auto; // Center the content
  width: 100%;
  box-sizing: border-box; // Include padding in width
`;

const PageTitle = styled.h1`
  font-size: 2em;
  color: #4f7ef3;
  margin-bottom: 20px;
  text-align: left; // Left-aligned title
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  color: #333;
  margin: 30px 0 15px 0;
  text-align: left;
`;

const StudyGuideInputContainer = styled.div`
  display: flex;
  gap: 15px; /* Space between input and button */
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #edf2f7; /* Light background for the input section */
  align-items: center;
`;

const TopicInput = styled.input`
  flex: 1; /* Allow input to take available space */
  padding: 10px 15px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  font-size: 1rem;
  color: #2d3748;
  background-color: #ffffff; /* White background for input field */
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: #4f7ef3;
    box-shadow: 0 0 0 0.2rem rgba(79, 126, 243, 0.25);
  }

  &::placeholder {
    color: #a0a0b2;
  }
`;

const GenerateButton = styled.button`
  padding: 10px 20px;
  background-color: #4f7ef3; /* Primary Blue */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease, opacity 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #3b62c1; /* Darker blue on hover */
  }

  &:disabled {
    background-color: #cccccc; /* Light gray when disabled */
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const LoadingIndicator = styled.div`
  color: #666;
  text-align: left;
  padding: 20px 0;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: left;
  padding: 20px 0;
`;

const StudyGuideLoading = styled(LoadingIndicator)`
    color: #4f7ef3; /* Blue color for study guide loading */
    font-weight: 600;
`;

const StudyGuideError = styled(ErrorMessage)`
    color: #e53e3e; /* Red color for study guide error */
    font-weight: 600;
`;

// New styled component for the course cards grid layout
const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const Learning = () => {

  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Learning');
  const [userInfo, setUserInfo] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState(null);

  const [topic, setTopic] = useState('');
  const [loadingStudyGuide, setLoadingStudyGuide] = useState(false);
  const [errorStudyGuide, setErrorStudyGuide] = useState(null);

  const [studyGuides, setStudyGuides] = useState([]);

  // Fetch user info on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoadingUser(true); // Use user loading state
      setErrorUser(null); // Use user error state
      try {
        const user = await getUser();
        setUserInfo(user);
      } catch (error) {
        console.error("Error fetching user info for Learning page:", error);
        if (error.message === "Unauthorized or Forbidden. Please log in." || error.message === "Authentication token missing.") {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setErrorUser(error.message || "Failed to load user information."); // Use user error state
        }
      } finally {
        setLoadingUser(false); // Use user loading state
      }
    };

    fetchData();
  }, [navigate]);


  const handleGenerateStudyGuide = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic to generate a study guide.");
      return;
    }

    setLoadingStudyGuide(true);
    setErrorStudyGuide(null);

    try {
      const studyGuideData = await generateStudyGuide(topic);
      console.log("Generated Study Guide Data:", studyGuideData);
    } catch (error) {
      console.error("Error generating study guide:", error);
      if (error.message === "Unauthorized or Forbidden. Please log in." || error.message === "Authentication token missing.") {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setErrorStudyGuide(error.message || "Failed to generate study guide.");
      }
    } finally {
      setLoadingStudyGuide(false);
    }
  };

  useEffect(() => {
    const fetchGuides = async () => {
      setLoadingStudyGuide(true);
      setErrorStudyGuide(null);
      try {
        const guides = await fetchAllStudyGuides();
        setStudyGuides(guides);
      } catch (error) {
        console.error("Error fetching study guides:", error);
        if (
          error.message === "Unauthorized or Forbidden. Please log in." ||
          error.message === "Authentication token missing."
        ) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setErrorStudyGuide(error.message || "Failed to fetch study guides.");
        }
      } finally {
        setLoadingStudyGuide(false);
      }
    };

    fetchGuides();
  }, [navigate]);

  if (loadingUser) { // Use user loading state
    return (
      <Container>
        <UserNavbar userInfo={userInfo} />
        <AppContainer>
          <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
          <LoadingIndicator>Loading user information...</LoadingIndicator> {/* Specific loading message */}
        </AppContainer>
      </Container>
    );
  }

  if (errorUser) { // Use user error state
    return (
      <Container>
        <UserNavbar userInfo={userInfo} />
        <AppContainer>
          <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
          <ErrorMessage>{errorUser}</ErrorMessage> {/* Specific error message */}
        </AppContainer>
      </Container>
    );
  }

  return (
    <Container>
      <UserNavbar userInfo={userInfo} />
      <AppContainer>
        <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
        <ContentContainer>
          <PageTitle>My Courses</PageTitle>

          <SectionTitle>Generate Study Guide</SectionTitle>
          <StudyGuideInputContainer>
            <TopicInput
              type="text"
              placeholder="Enter topic (e.g., Photosynthesis, Thermodynamics)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loadingStudyGuide}
            />
            <GenerateButton
              onClick={handleGenerateStudyGuide}
              disabled={loadingStudyGuide || !topic.trim()} // Disable while loading or if input is empty
            >
              {loadingStudyGuide ? 'Generating...' : 'Generate'}
            </GenerateButton>
          </StudyGuideInputContainer>

          {loadingStudyGuide && <StudyGuideLoading>Generating study guide...</StudyGuideLoading>}
          {errorStudyGuide && <StudyGuideError>{errorStudyGuide}</StudyGuideError>}

          <SectionTitle>My Existing Courses</SectionTitle>
          {studyGuides.length === 0 ? (
            <p>No study guides available yet.</p>
          ) : (
            <CourseGrid>
              {studyGuides.map((guide, index) => (
                <CourseCard
                  key={index}
                  enrollment={guide}
                />
              ))}
            </CourseGrid>
          )}
        </ContentContainer>
      </AppContainer>
    </Container>
  );
}

export default Learning;