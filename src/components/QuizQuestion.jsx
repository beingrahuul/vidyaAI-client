import React from 'react';
import styled from 'styled-components';

const QuestionContainer = styled.div`
  background-color: #ffffff; 
  border-radius: 12px; 
  padding: 30px; 
  border: 1px solid #eaedf2; 
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05); /* Subtle shadow */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* Hover transition */

  &:hover {
    transform: translateY(-2px); /* Slight lift on hover */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08); /* Enhanced shadow on hover */
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px; /* Space below header */
`;

const QuestionNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4f7ef3; /* Primary Blue */
  color: white;
  border-radius: 50%; /* Circle shape */
  width: 32px; /* Size */
  height: 32px; /* Size */
  font-weight: 600; /* Semibold */
  font-size: 0.95rem; /* Slightly smaller number */
  margin-right: 16px; /* Space after number */
  flex-shrink: 0; /* Prevent shrinking */
`;

const QuestionText = styled.span`
  font-size: 1.2rem; /* Adjusted font size */
  color: #2c3e50; /* Darker text for question */
  font-weight: 600; /* Semibold */
  line-height: 1.6; /* Improved readability */
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px; /* Space between options */
  margin-left: 8px; /* Slight indent for options */
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center; /* Align items vertically */
  font-size: 1.05rem; /* Adjusted font size */
  color: #4a5568; /* Medium gray text */
  cursor: pointer;
  transition: all 0.2s ease; /* Smooth transitions */
  padding: 12px 16px; /* Padding within option */
  border-radius: 8px; /* Rounded corners for option */
  border: 1px solid #edf2f7; /* Light border */
  background-color: ${props => props.checked ? "#f0f5ff" : "#f8fafc"}; /* Light blue/gray background on checked/hover */
  box-shadow: ${props => props.checked ? '0 2px 6px rgba(79, 126, 243, 0.1)' : 'none'}; /* Subtle shadow on checked */

  &:hover {
    background-color: ${props => props.checked ? "#e6f0ff" : "#f1f5f9"}; /* Darker background on hover */
    border-color: #cbd5e0; /* Darker border on hover */
  }

  ${props => props.disabled && `
    opacity: 0.7;
    cursor: not-allowed;
    background-color: #f8fafc !important; /* Keep light background when disabled */
    border-color: #edf2f7 !important;
  `}
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* Size of custom radio circle */
  height: 24px; /* Size of custom radio circle */
  border-radius: 50%; /* Circle shape */
  border: 2px solid ${props => props.checked ? "#4f7ef3" : "#cbd5e0"}; /* Border color based on checked state */
  margin-right: 14px; /* Space after radio */
  padding: 2px; /* Inner padding */
  transition: all 0.2s ease; /* Smooth transitions */
  flex-shrink: 0; /* Prevent shrinking */
`;

const RadioInner = styled.div`
  width: 12px; /* Size of inner dot */
  height: 12px; /* Size of inner dot */
  border-radius: 50%; /* Circle shape */
  background-color: ${props => props.checked ? "#4f7ef3" : "transparent"}; /* Background based on checked state */
  transition: all 0.2s ease; /* Smooth transitions */
`;

const OptionText = styled.span`
  line-height: 1.5; /* Improved readability */
  color: ${props => props.disabled ? '#718096' : 'inherit'}; /* Dim text when disabled */
`;

// Hide the default radio button visually but keep it for accessibility
const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  pointer-events: none; /* Prevent interaction with hidden input */
`;

const QuizQuestion = ({ question, questionNumber, selectedAnswer, onAnswerChange, disabled }) => {
  if (!question) return null;

  return (
    <QuestionContainer>
      <QuestionHeader>
        <QuestionNumber>{questionNumber}</QuestionNumber>
        <QuestionText>{question.text}</QuestionText>
      </QuestionHeader>

      <OptionContainer>
        {Array.isArray(question.options) && question.options.map((option, optionIndex) => {
          const isChecked = selectedAnswer === option.value;

          return (
            <OptionLabel
              key={optionIndex}
              checked={isChecked}
              disabled={disabled}
              // Attach onClick to the label for easier clicking
              onClick={!disabled ? () => onAnswerChange(question.id, option.value) : undefined}
            >
              {/* Hidden radio input for accessibility */}
              <HiddenRadio
                name={`question-${question.id}`}
                value={option.value}
                checked={isChecked}
                // onChange is not needed here because click is handled by label
                disabled={disabled}
              />
              {/* Custom styled radio button */}
              <RadioContainer checked={isChecked}>
                <RadioInner checked={isChecked} />
              </RadioContainer>
              <OptionText disabled={disabled}>{option.text}</OptionText>
            </OptionLabel>
          );
        })}
      </OptionContainer>
    </QuestionContainer>
  );
};

export default QuizQuestion;
