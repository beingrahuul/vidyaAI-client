import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

// Helper function to pick a color based on quiz subject
const getColorBySubject = (subject) => {
  const colorMap = {
    'NEET': '#8B5CF6', // Purple shade for Biology
    'Physics': '#3B82F6',      // Blue for Physics
    'Chemistry': '#10B981',    // Green for Chemistry
    'Mathematics': '#F59E0B',  // Amber for Mathematics
    'default': '#4f7ef3'       // Default blue matching your title color
  };
  
  return subject && colorMap[subject] ? colorMap[subject] : colorMap.default;
};

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  min-height: 180px;
  color: #333333;
  position: relative;
  border: 1px solid #f0f0f0;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardContent = styled.div`
  padding: 16px 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h4`
  font-size: 1.125rem;
  font-weight: 600;
  color: #333333;
  margin-top: 0;
  margin-bottom: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
`;

const Details = styled.div`
  font-size: 0.875rem;
  color: #666666;
  margin-top: 12px;
  text-align: left;
`;

const DetailItem = styled.p`
  margin: 6px 0;
  display: flex;
  align-items: center;
  gap: 6px;
  text-align: left;
`;

const SubjectTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: ${({ color }) => color || '#4f7ef3'};
  color: white;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-bottom: 12px;
  
  &:before {
    content: '⚡';
    margin-right: 4px;
  }
`;

const ActionButton = styled.button`
  background-color: ${({ color }) => color || '#4f7ef3'};
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  margin-top: 16px;
  width: 100%;
  text-align: center;

  &:hover {
    filter: brightness(1.1);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  width: 100%;
`;

const ProgressBar = styled.div`
  flex-grow: 1;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => `${progress}%`};
    background-color: ${({ color }) => color || '#4f7ef3'};
    border-radius: 3px;
  }
`;

const ProgressText = styled.span`
  font-size: 0.75rem;
  margin-left: 8px;
  color: #666666;
  min-width: 40px;
  text-align: right;
`;

const MaterialCount = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #f5f5f5;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  color: #666666;
  
  &:before {
    content: '📄';
    margin-right: 4px;
  }
`;

const QuizCard = ({ quiz, onClick }) => {
  if (!quiz) return null;

  const numberOfQuestions = quiz.questions ? quiz.questions.length : 0;
  const progress = quiz.attempted ? (quiz.score / numberOfQuestions) * 100 : 0;
  const generatedDate = quiz.generatedAt ? new Date(quiz.generatedAt).toLocaleDateString() : 'Unknown Date';
  const subject = quiz.subject || 'NEET'; // Fallback subject
  const themeColor = getColorBySubject(subject);

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (onClick) {
      onClick(quiz);
    } else {
      navigate(`/quiz/${quiz._id}`);
    }
  }

  
  return (
    <Card onClick={onClick}>
      <CardContent>
        <div>
          <SubjectTag color={themeColor}>{subject}</SubjectTag>
          <Title>{quiz.title || 'Untitled Quiz'}</Title>
          <Details>
            <DetailItem>
              <MaterialCount>{numberOfQuestions} Questions</MaterialCount>
            </DetailItem>
            <DetailItem>Created: {generatedDate}</DetailItem>
          </Details>
        </div>
        
        <div>
          <ProgressIndicator>
            <ProgressBar progress={progress} color={themeColor} />
            <ProgressText>{progress.toFixed(0)}%</ProgressText>
          </ProgressIndicator>
          
          {!quiz.attempted ? (
            <ActionButton color={themeColor} >
              Attempt Quiz
            </ActionButton>
          ) : (
            <ActionButton color={themeColor}>
              View Results
            </ActionButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuizCard;