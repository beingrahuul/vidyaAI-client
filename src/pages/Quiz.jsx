import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Components
import UserNavbar from '../components/UserNavbar';
import Navigation from '../components/Home/Navigation';
import QuizCard from '../components/QuizCard'; 

//services
import { getUser } from '../services/userService'; 
import { getAllQuizzes } from '../services/quizServices'; 

const AppContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  box-sizing: border-box;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

const QuizContainer = styled.div`
  margin: 0 auto;
  font-family: 'Inter', sans-serif;
  background: white;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 20px;
  margin: 0; // Left-aligned instead of centered
  width: 100%;
  box-sizing: border-box;
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

const QuizList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); // Exactly 4 cards per row
  gap: 20px; // Space between cards
  padding: 0;
  margin: 0;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr); // 3 cards per row on medium screens
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr); // 2 cards per row on smaller screens
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr; // 1 card per row on mobile
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

const NoQuizzesMessage = styled.div`
  color: #666;
  text-align: left;
  padding: 20px 0;
  font-size: 1.2em;
`;

const Quiz = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Quiz');
  const [userInfo, setUserInfo] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user info and quizzes on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = await getUser();
        setUserInfo(user);

        const fetchedQuizzes = await getAllQuizzes();
        setQuizzes(fetchedQuizzes);

      } catch (error) {
        console.error("Error fetching data for QuizListPage:", error);
         if (error.message === "Unauthorized or Forbidden. Please log in." || error.message === "Authentication token missing.") {
           localStorage.removeItem("token");
           navigate("/login");
        } else {
           setError(error.message || "Failed to load quizzes.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]); // Depend on navigate for effect cleanup

  // Handle clicking on a quiz card
  const handleQuizCardClick = (quizId) => {
    // Navigate to the individual quiz attempt page
    navigate(`/quiz/${quizId}`);
  };

  if (loading) {
    return (
      <QuizContainer>
        <UserNavbar userInfo={userInfo} />
        <AppContainer>
          <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
          <LoadingIndicator>Loading quizzes...</LoadingIndicator>
        </AppContainer>
      </QuizContainer>
    );
  }

  if (error) {
    return (
      <QuizContainer>
        <UserNavbar userInfo={userInfo} />
        <AppContainer>
          <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
          <ErrorMessage>{error}</ErrorMessage>
        </AppContainer>
      </QuizContainer>
    );
  }

  // Group quizzes by category if needed
  const newQuizzes = quizzes.filter(quiz => !quiz.attempted);
  const attemptedQuizzes = quizzes.filter(quiz => quiz.attempted);

  return (
    <QuizContainer>
      <UserNavbar userInfo={userInfo} />
      <AppContainer> 
        <Navigation activeNav={activeNav} setActiveNav={setActiveNav} />
        <ContentContainer>
          <PageTitle>My Quizzes</PageTitle>
          
          {/* New Quizzes Section */}
          <SectionTitle>New Quizzes</SectionTitle>
          {newQuizzes.length === 0 ? (
            <NoQuizzesMessage>No new quizzes available.</NoQuizzesMessage>
          ) : (
            <QuizList>
              {newQuizzes.map((quiz, index) => (
                <QuizCard
                  key={quiz._id}
                  quiz={quiz}
                  onClick={() => handleQuizCardClick(quiz._id)}
                  index={index}
                />
              ))}
            </QuizList>
          )}
          
          {/* Attempted Quizzes Section */}
          {attemptedQuizzes.length > 0 && (
            <>
              <SectionTitle>Attempted Quizzes</SectionTitle>
              <QuizList>
                {attemptedQuizzes.map((quiz, index) => (
                  <QuizCard
                    key={quiz._id}
                    quiz={quiz}
                    onClick={() => handleQuizCardClick(quiz._id)}
                    index={index}
                  />
                ))}
              </QuizList>
            </>
          )}
        </ContentContainer>
      </AppContainer>
    </QuizContainer>
  );
};

export default Quiz;