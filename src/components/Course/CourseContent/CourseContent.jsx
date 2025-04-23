// src/components/CourseContent/CourseContent.jsx
import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa'; // Only general icons needed here

// Import styled components
import {
  Container,
  ContentContainer,
  ContentHeader,
  ContentTitle,
  CompletionButton,
  PlaceholderText,
  NavigationFooter,
  NavButton,
} from './CourseContent.styled';

// Import specialized content components
import CourseContentBody from './CourseContentBody';
import SpecialContentDisplay from './SpecialContentDisplay';
import PracticeQuestions from './PracticeQuestions/PracticeQuestions';


// Component
const CourseContent = ({ subsection, onNavigatePrev, onNavigateNext, hasPrev, hasNext }) => {
  const [completed, setCompleted] = useState(subsection?.completed || false);

  useEffect(() => {
    // Reset completed state when subsection changes
    setCompleted(subsection?.completed || false);
    // Note: Quiz state (selected answers, etc.) is now handled within PracticeQuestions.jsx
  }, [subsection]);

  const handleMarkAsCompleted = () => {
    const newCompletedStatus = !completed;
    setCompleted(newCompletedStatus);
    // You might want to call a prop function here to persist the completion status
    // onMarkComplete(subsection.id, newCompletedStatus); // Example
    console.log(`Subsection "${subsection.heading}" mark status toggled to ${newCompletedStatus}`);
  };

  if (!subsection) {
    return (
      <Container>
        <ContentContainer>
          <PlaceholderText>
            Select a topic from the sidebar to view its content.
          </PlaceholderText>
        </ContentContainer>
         {/* Navigation footer still appears if subsection is null, might want to hide it */}
        <NavigationFooter>
          <NavButton
            onClick={onNavigatePrev}
            disabled={!hasPrev}
            iconPosition="left"
          >
            <FaArrowLeft size="0.9em" />
            Previous
          </NavButton>

          <NavButton
            onClick={onNavigateNext}
            disabled={!hasNext}
            iconPosition="right"
          >
            Next
            <FaArrowRight size="0.9em" />
          </NavButton>
        </NavigationFooter>
      </Container>
    );
  }

  // Determine which content component to render
  const renderContent = () => {
    switch (subsection.contentType) {
      case 'practice_questions':
        // Pass the questions data to the PracticeQuestions component
        return <PracticeQuestions questions={subsection.content} />;
      case 'diagram':
      case 'image':
        // Pass content and title to SpecialContentDisplay
        return (
          <SpecialContentDisplay
            contentType={subsection.contentType}
            content={subsection.content}
            title={subsection.contentTitle}
          />
        );
      default:
        // Default case renders standard markdown body
        return <CourseContentBody content={subsection.content} />;
    }
  };

  return (
    <Container>
      <ContentContainer>
        <ContentHeader>
          <ContentTitle>{subsection.heading || 'Untitled Section'}</ContentTitle>
          <CompletionButton
            onClick={handleMarkAsCompleted}
            completed={completed}
            // Assuming subsection object has a flag if completion is applicable
            disabled={subsection.completionEnabled === false}
          >
            {completed ? (
              <>Completed <FaCheck size="0.9em" /></>
            ) : (
              <>Mark as Completed</>
            )}
          </CompletionButton>
        </ContentHeader>

        {/* Render the appropriate content component */}
        {renderContent()}

      </ContentContainer>

      <NavigationFooter>
        <NavButton
          onClick={onNavigatePrev}
          disabled={!hasPrev}
          iconPosition="left"
        >
          <FaArrowLeft size="0.9em" />
          Previous
        </NavButton>

        <NavButton
          onClick={onNavigateNext}
          disabled={!hasNext}
          iconPosition="right"
        >
          Next
          <FaArrowRight size="0.9em" />
        </NavButton>
      </NavigationFooter>
    </Container>
  );
};

export default CourseContent;