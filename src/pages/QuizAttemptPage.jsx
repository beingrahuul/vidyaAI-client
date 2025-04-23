// src/pages/QuizAttemptPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Components
import UserNavbar from '../components/UserNavbar';
import QuizQuestion from '../components/QuizQuestion';

// Services
import { getUser } from '../services/userService';
import { getQuizById, submitQuizAnswers } from '../services/quizServices';

// Styled Components - Modern UI Enhancement
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f7fafc;
  color: #2d3748;
  font-family: 'Inter', sans-serif;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 40px;
  max-width: 1000px;
  margin: 40px auto;
  width: 100%;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
`;

const Header = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

const PageTitle = styled.h1`
  font-size: 2.2em;
  color: #1a202c;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 12px;
`;

const QuizDescription = styled.p`
  color: #718096;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #edf2f7;
  border-radius: 4px;
  margin: 40px 0 20px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #4f7ef3;
  border-radius: 4px;
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

const QuizStats = styled.div`
  display: flex;
  justify-content: space-between;
  color: #718096;
  margin-bottom: 40px;
  font-size: 0.95rem;
`;

const QuizForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
`;

const Button = styled.button`
  flex: ${props => props.secondary ? '0 0 auto' : '1'};
  padding: 16px;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #4f7ef3;
  
  &:hover:not(:disabled) {
    background-color: #3b62c1;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(79, 126, 243, 0.25);
  }
`;

const BackButton = styled(Button)`
  background-color: ${props => props.secondary ? '#e2e8f0' : '#4f7ef3'};
  color: ${props => props.secondary ? '#4a5568' : 'white'};
  
  &:hover:not(:disabled) {
    background-color: ${props => props.secondary ? '#cbd5e0' : '#3b62c1'};
    transform: translateY(-2px);
    box-shadow: ${props => props.secondary ? 
      '0 6px 16px rgba(203, 213, 224, 0.3)' : 
      '0 6px 16px rgba(79, 126, 243, 0.25)'};
  }
`;

const LoadingScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
`;

const LoadingIndicator = styled.div`
  border: 4px solid #edf2f7;
  border-top: 4px solid #4f7ef3;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.div`
  color: #718096;
  font-size: 1.2em;
`;

const ErrorMessage = styled.div`
  background-color: #fff5f5;
  color: #e53e3e;
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid #e53e3e;
  margin: 20px 0;
  font-size: 1.1em;
`;

const NoQuizzesMessage = styled.div`
  text-align: center;
  color: #718096;
  padding: 40px;
  font-size: 1.2em;
`;

// Result Section Styles
const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px 20px;
`;

const ResultCircle = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  /* Conic gradient for progress visualization */
  background: conic-gradient(
    #4f7ef3 ${props => props.percentage}%,
    #e2e8f0 0%
  );
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* Subtle shadow */

  &::before {
    content: '';
    position: absolute;
    width: 160px; /* Inner circle size */
    height: 160px; /* Inner circle size */
    border-radius: 50%;
    background: white; /* White inner circle */
  }
`;

const ScoreText = styled.div`
  position: relative;
  z-index: 2; /* Ensure text is above inner circle */
  font-size: 2.5rem; /* Larger score text */
  font-weight: 700; /* Bold */
  color: #2d3748; /* Dark text */
`;

const ResultTitle = styled.h2`
  color: #2d3748; /* Dark text */
  font-size: 1.8rem; /* Adjusted font size */
  margin-bottom: 20px;
  font-weight: 700; /* Bold */
`;

const ResultDetails = styled.div`
  display: flex;
  gap: 30px; /* Space between detail items */
  margin-bottom: 40px;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailValue = styled.div`
  font-size: 1.8rem; /* Adjusted font size */
  font-weight: 600; /* Semibold */
  color: #4f7ef3; /* Primary Blue */
  margin-bottom: 5px;
`;

const DetailLabel = styled.div`
  color: #718096; /* Medium gray text */
  font-size: 0.95rem; /* Adjusted font size */
`;


const QuizAttemptPage = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = await getUser();
        setUserInfo(user);

        const fetchedQuiz = await getQuizById(quizId);
        setQuiz(fetchedQuiz);

        if (fetchedQuiz.attempted) {
          setIsSubmitted(true);
          setSubmissionResult({
            score: fetchedQuiz.score,
            totalQuestions: fetchedQuiz.questions.length,
            totalAnswered: fetchedQuiz.totalQuestionsAnswered
          });
        }
      } catch (error) {
        console.error(`Error fetching quiz ${quizId}:`, error);
        if (error.message === "Unauthorized or Forbidden. Please log in." || error.message === "Authentication token missing.") {
          localStorage.removeItem("token");
          navigate("/login");
        } else if (error.message === "Quiz not found.") {
          setError("Quiz not found or you do not have access.");
        } else {
          setError(error.message || "Failed to load quiz.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [quizId, navigate]);

  const handleAnswerChange = (questionId, selectedValue) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: selectedValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < quiz.questions.length) {
      const confirmSubmit = window.confirm(`You have answered ${answeredCount} out of ${quiz.questions.length} questions. Do you want to submit?`);
      if (!confirmSubmit) {
        return;
      }
    }

    setLoading(true); 
    setError(null);

    try {
      const answersToSend = Object.entries(selectedAnswers).reduce((acc, [qId, answer]) => {
        if (answer !== undefined && answer !== null) {
          acc[qId] = answer;
        }
        return acc;
      }, {});

      const result = await submitQuizAnswers(quizId, answersToSend);
      setSubmissionResult(result);
      setIsSubmitted(true);
    } catch (error) {
      console.error(`Error submitting quiz ${quizId}:`, error);
      if (error.message === "Unauthorized or Forbidden. Please log in." || error.message === "Authentication token missing.") {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        setError(error.message || "Failed to submit quiz.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getAnsweredQuestionsCount = () => {
    return Object.keys(selectedAnswers).length;
  };

  const getProgressPercentage = () => {
    if (!quiz) return 0;
    return (getAnsweredQuestionsCount() / quiz.questions.length) * 100;
  };

  if (loading) {
    return (
      <PageWrapper>
        <UserNavbar userInfo={userInfo} />
        <ContentContainer>
          <LoadingScreen>
            <LoadingIndicator />
            <LoadingText>Loading quiz...</LoadingText>
          </LoadingScreen>
        </ContentContainer>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <UserNavbar userInfo={userInfo} />
        <ContentContainer>
          <Header>
            <PageTitle>Oops! Something went wrong</PageTitle>
          </Header>
          <ErrorMessage>{error}</ErrorMessage>
          <BackButton secondary onClick={() => navigate('/quizzes')}>
            Return to Quizzes
          </BackButton>
        </ContentContainer>
      </PageWrapper>
    );
  }

  if (!quiz) {
    return (
      <PageWrapper>
        <UserNavbar userInfo={userInfo} />
        <ContentContainer>
          <NoQuizzesMessage>Quiz data is not available.</NoQuizzesMessage>
          <BackButton secondary onClick={() => navigate('/quizzes')}>
            Return to Quizzes
          </BackButton>
        </ContentContainer>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <UserNavbar userInfo={userInfo} />
      <ContentContainer>
        {isSubmitted ? (
          // Results view
          <ResultsContainer>
            <ResultCircle 
              percentage={(submissionResult?.score / quiz.questions.length) * 100}
            >
              <ScoreText>
                {submissionResult?.score !== undefined ? submissionResult.score : 'N/A'}/{quiz.questions.length}
              </ScoreText>
            </ResultCircle>
            
            <ResultTitle>{submissionResult?.score >= quiz.questions.length / 2 ? "Great job!" : "Nice attempt!"}</ResultTitle>
            
            <ResultDetails>
              <DetailItem>
                <DetailValue>{submissionResult?.totalAnswered || 0}</DetailValue>
                <DetailLabel>Questions Answered</DetailLabel>
              </DetailItem>
              <DetailItem>
                <DetailValue>{(submissionResult?.score / quiz.questions.length * 100).toFixed(0)}%</DetailValue>
                <DetailLabel>Accuracy</DetailLabel>
              </DetailItem>
            </ResultDetails>
            
            <BackButton secondary onClick={() => navigate('/quiz')}>
              Return to Quizzes
            </BackButton>
          </ResultsContainer>
        ) : (
          // Quiz attempt view
          <>
            <Header>
              <PageTitle>{quiz.title || 'Quiz'}</PageTitle>
              {quiz.description && <QuizDescription>{quiz.description}</QuizDescription>}
            </Header>
            
            <ProgressBar>
              <ProgressFill progress={getProgressPercentage()} />
            </ProgressBar>
            
            <QuizStats>
              <span>Questions Answered: {getAnsweredQuestionsCount()} of {quiz.questions.length}</span>
              <span>Progress: {getProgressPercentage().toFixed(0)}%</span>
            </QuizStats>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <QuizForm onSubmit={handleSubmit}>
              {quiz.questions.map((question, index) => (
                <QuizQuestion
                  key={question.id || index}
                  question={question}
                  questionNumber={index + 1}
                  selectedAnswer={selectedAnswers[question.id]}
                  onAnswerChange={handleAnswerChange}
                  disabled={isSubmitted}
                />
              ))}
              
              <ButtonsContainer>
                <BackButton 
                  type="button" 
                  secondary
                  onClick={() => navigate('/quizzes')}
                >
                  Cancel
                </BackButton>
                <SubmitButton 
                  type="submit" 
                  disabled={loading || isSubmitted || getAnsweredQuestionsCount() === 0}
                >
                  Submit Quiz
                </SubmitButton>
              </ButtonsContainer>
            </QuizForm>
          </>
        )}
      </ContentContainer>
    </PageWrapper>
  );
};

export default QuizAttemptPage;