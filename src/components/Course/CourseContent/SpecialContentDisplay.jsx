// src/components/CourseContent/SpecialContentDisplay.jsx
import React from 'react';
import styled from 'styled-components';
import { FaImage, FaCode, FaChartBar } from 'react-icons/fa'; // Keep relevant icons here
import { PlaceholderText } from './CourseContent.styled'; // Use general placeholder text

// New components for example, diagram, and image content types
const ContentTypeContainer = styled.div`
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9fafb;
`;

const ContentTypeIcon = styled.div`
  font-size: 2.5rem;
  color: #4f46e5;
  margin-bottom: 1rem;
`;

const ContentTypeTitle = styled.h3`
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const ContentTypeDescription = styled.p`
  color: #6b7280;
  text-align: center;
  margin-bottom: 1rem;
`;

const ContentTypeDisplay = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 6px;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  margin-top: 1rem;

  /* Style for images within this display */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    border-radius: 4px; /* Slightly smaller border-radius for internal images */
  }
`;

// Component for specialized content types
const SpecialContentDisplay = ({ contentType, content, title }) => {
  let icon, description;

  switch(contentType) {
    case 'examples':
      icon = <FaCode />;
      description = "Code example demonstrating the concept";
      break;
    case 'diagram':
      icon = <FaChartBar />;
      description = "Diagram illustrating the concept";
      break;
    case 'image':
      icon = <FaImage />;
      description = "Visual representation";
      break;
    default:
      icon = null; // Or a default icon
      description = "Special content display";
  }

  // Render content based on type
  const renderContentDisplay = () => {
      if (!content) {
          return <PlaceholderText>No {contentType} content available</PlaceholderText>;
      }
      switch(contentType) {
          case 'image':
              // Assuming content is a URL or base64 string for image
              return <img src={content} alt={`${title || contentType}`} />;
          case 'examples':
              // Assuming content is a string for code block
              return <pre><code>{content}</code></pre>;
          case 'diagram':
              // This might need a specific library or rendering logic for diagram formats
              // For now, just display as text or placeholder
              return <p>{content}</p>; // Or render a diagram component if you have one
          default:
              return <p>{content}</p>;
      }
  };


  return (
    <ContentTypeContainer>
      <ContentTypeIcon>{icon}</ContentTypeIcon>
      <ContentTypeTitle>{title || contentType.charAt(0).toUpperCase() + contentType.slice(1)}</ContentTypeTitle>
      <ContentTypeDescription>{description}</ContentTypeDescription>
      <ContentTypeDisplay>
        {renderContentDisplay()}
      </ContentTypeDisplay>
    </ContentTypeContainer>
  );
};

export default SpecialContentDisplay;