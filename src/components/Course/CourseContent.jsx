import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled components for the content area
const MainContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
  background-color: #f9fafb;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  color: #4f46e5;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  border-radius: 4px;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const MaterialCounter = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #6b7280;
`;

const MaterialTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-left: 16px;
  color: #1f2937;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const MaterialTypeLabel = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  background-color: ${props => {
    switch (props.type) {
      case 'Video': return '#EFF6FF';
      case 'Article': return '#F0FDF4';
      case 'Interactive': return '#FEF3C7';
      case 'Quiz': return '#EEF2FF';
      case 'Assessment': return '#FEF2F2';
      default: return '#F3F4F6';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'Video': return '#2563EB';
      case 'Article': return '#16A34A';
      case 'Interactive': return '#D97706';
      case 'Quiz': return '#4F46E5';
      case 'Assessment': return '#DC2626';
      default: return '#4B5563';
    }
  }};
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 16px;
`;

const CompleteButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.completed ? '#16A34A' : '#4f46e5'};
  color: white;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${props => props.completed ? '#15803D' : '#4338ca'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #e0e7ff;
  }

  svg {
    margin-right: 8px;
  }
`;

const ContentCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 24px;
  min-height: 400px;

  h2 {
    font-size: 20px;
    font-weight: 600;
    color: #111827;
    margin-top: 0;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 16px;
    font-weight: 600;
    color: #374151;
    margin-top: 24px;
    margin-bottom: 12px;
  }

  p {
    color: #4B5563;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  ul {
    margin-bottom: 16px;
    padding-left: 24px;
  }

  li {
    margin-bottom: 8px;
    color: #4B5563;
  }

  .video-container,
  .article-image,
  .interactive-element,
  .quiz-container,
  .assessment-container {
    background-color: #F9FAFB;
    border: 1px dashed #D1D5DB;
    border-radius: 8px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    margin: 24px 0;
  }
`;

const NoContentMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
  color: #6b7280;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  align-items: center;
`;

const ProgressIndicator = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressText = styled.span`
  font-size: 14px;
  color: #6B7280;
  margin-right: 8px;
`;

const ProgressBar = styled.div`
  width: 100px;
  height: 8px;
  background-color: #E5E7EB;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${props => props.progress}%;
  background-color: #4F46E5;
  border-radius: 4px;
`;

const PrevButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background-color: white;
  color: #374151;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.5' : '1')};

  &:hover:not(:disabled) {
    background-color: #f9fafb;
  }
`;

const NextButton = styled.button`
  padding: 8px 16px;
  background-color: #4f46e5;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${props => (props.disabled ? '0.5' : '1')};

  &:hover:not(:disabled) {
    background-color: #4338ca;
  }
`;

const CourseContent = ({
  materialContent,
  activeMaterial,
  courseData,
  onPrev,
  onNext,
  isFirst = false,
  isLast = false,
  progress = 0
}) => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate('/courses');
  };

  const currentMaterial = courseData?.materials[activeMaterial];
  const isCompleted = currentMaterial?.completed;

  return (
    <MainContent>
      <ContentWrapper>
        <ContentHeader>
          <BackButton onClick={handleBackToDashboard}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </BackButton>
          <MaterialCounter>
            Material {activeMaterial + 1} of {courseData.materials.length}
          </MaterialCounter>
          <MaterialTitle>{currentMaterial?.title}</MaterialTitle>
          {currentMaterial && (
            <MaterialTypeLabel type={currentMaterial.type}>
              {currentMaterial.type}
            </MaterialTypeLabel>
          )}
          <CompleteButton completed={isCompleted} onClick={onNext}>
            {isCompleted ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Completed
              </>
            ) : (
              'Mark as Complete'
            )}
          </CompleteButton>
        </ContentHeader>

        <ContentCard>
          {materialContent || (
            <NoContentMessage>
              Select a material to view its content
            </NoContentMessage>
          )}
        </ContentCard>

        <NavigationButtons>
          <PrevButton disabled={isFirst} onClick={onPrev}>
            Previous
          </PrevButton>
          
          <ProgressIndicator>
            <ProgressText>{progress}% Complete</ProgressText>
            <ProgressBar>
              <ProgressFill progress={progress} />
            </ProgressBar>
          </ProgressIndicator>
          
          <NextButton disabled={isLast} onClick={onNext}>
            {isLast ? 'Finish Course' : 'Next'}
          </NextButton>
        </NavigationButtons>
      </ContentWrapper>
    </MainContent>
  );
};

export default CourseContent;
