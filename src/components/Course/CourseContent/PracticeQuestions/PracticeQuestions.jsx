import React, { useState, useEffect } from 'react';
import { FaQuestionCircle, FaRegCheckCircle, FaRegCircle, FaTimesCircle, FaCheck } from 'react-icons/fa';
import { PlaceholderText } from '../CourseContent.styled';

import {
  PracticeQuestionsContainer,
  QuestionBlock,
  QuestionText,
  OptionsList,
  OptionItem,
  OptionLetter,
  FeedbackArea,
  ExplanationText,
  CheckAnswerButton,
  ResetButton
} from './PracticeQuestions.styled';

const PracticeQuestions = ({ questions }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState({});
  // quizAttempted state might need to live higher if it affects parent component logic,
  // but keeping it here for now if its scope is just within this component.
  // const [quizAttempted, setQuizAttempted] = useState(false);

  useEffect(() => {
    // Reset state when the questions data changes (e.g., navigating to a different quiz section)
    setSelectedAnswers({});
    setShowAnswer({});
    // setQuizAttempted(false);
  }, [questions]);

  const handleOptionSelect = (questionIndex, optionKey) => {
    // Prevent changing selection after checking answer
    if (!showAnswer[questionIndex]) {
      setSelectedAnswers(prev => ({
        ...prev,
        [questionIndex]: optionKey
      }));
    }
  };

  const handleCheckAnswer = (questionIndex, correctAnswerKey) => {
    if (selectedAnswers[questionIndex]) {
      setShowAnswer(prev => ({
        ...prev,
        [questionIndex]: true
      }));
      // setQuizAttempted(true); // Uncomment if needed
    }
  };

  const handleResetQuestion = (questionIndex) => {
    setSelectedAnswers(prev => {
      const newState = { ...prev };
      delete newState[questionIndex];
      return newState;
    });
    setShowAnswer(prev => {
      const newState = { ...prev };
      delete newState[questionIndex];
      return newState;
    });
  };

  const questionsArray = Array.isArray(questions) ? questions : [];

  if (questionsArray.length === 0) {
    return <PlaceholderText>No practice questions available for this topic.</PlaceholderText>;
  }

  return (
    <PracticeQuestionsContainer>
      {questionsArray.map((q, index) => {
        const isAnswerShown = showAnswer[index];
        const selected = selectedAnswers[index];
        const isCorrect = isAnswerShown && selected === q.answer;
        const isIncorrect = isAnswerShown && selected !== q.answer && selected !== undefined;

        return (
          <QuestionBlock key={index}>
            <QuestionText><FaQuestionCircle />{`Question ${index + 1}: ${q.question}`}</QuestionText>
            <OptionsList>
              {Object.keys(q.options).map(optionKey => (
                <OptionItem
                  key={optionKey}
                  onClick={() => handleOptionSelect(index, optionKey)}
                  isSelected={selected === optionKey}
                  isCorrect={isAnswerShown && optionKey === q.answer}
                  isIncorrect={isAnswerShown && selected === optionKey && selected !== q.answer}
                >
                  <OptionLetter
                    isCorrect={isAnswerShown && optionKey === q.answer}
                    isIncorrect={isAnswerShown && selected === optionKey && selected !== q.answer}
                  >
                    {optionKey.toUpperCase()}.
                  </OptionLetter>
                  {q.options[optionKey]}
                  {/* Display feedback icons */}
                  {isAnswerShown && (
                      optionKey === q.answer ? (
                          <FaRegCheckCircle size="1.1em" color="#059669" style={{ marginLeft: 'auto' }} />
                      ) : (
                          selected === optionKey && <FaTimesCircle size="1.1em" color="#dc2626" style={{ marginLeft: 'auto' }} />
                      )
                  )}
                   {/* Show selected circle if answer not shown */}
                   {!isAnswerShown && selected === optionKey && (
                      <FaRegCircle size="1.1em" color="#4f46e5" style={{ marginLeft: 'auto' }} />
                   )}

                </OptionItem>
              ))}
            </OptionsList>

            {isAnswerShown && (
              <FeedbackArea isCorrect={isCorrect} isIncorrect={isIncorrect}>
                <strong>{isCorrect ? 'Correct!' : (isIncorrect ? 'Incorrect.' : 'Answer:')}</strong>
                <ExplanationText>{q.explanation}</ExplanationText>
              </FeedbackArea>
            )}

            {!isAnswerShown ? (
              <CheckAnswerButton onClick={() => handleCheckAnswer(index, q.answer)} disabled={selected === undefined}>
                Check Answer
              </CheckAnswerButton>
            ) : (
              <ResetButton onClick={() => handleResetQuestion(index)}>
                <FaCheck /> Try Again
              </ResetButton>
            )}
          </QuestionBlock>
        );
      })}
    </PracticeQuestionsContainer>
  );
};

export default PracticeQuestions;