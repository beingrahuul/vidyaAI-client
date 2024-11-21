import React, { useState } from 'react';
import styled from 'styled-components';

// FAQ Section Container
const FAQContainer = styled.div`
  width: 100%;
  margin: 50px 0;
  background: #121212;
  padding: 50px 20px;
  box-sizing: border-box;
  border-radius: 15px;
`;

const FAQTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 30px;
  text-align: left;  // Align the title to the left
`;

const FAQItem = styled.div`
  background: #1e1e1e;
  color: #ffffff;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
  cursor: pointer;
  text-align: left;  // Align the question and answer to the left

  &:hover {
    background-color: #090909;
  }
`;

const Question = styled.h4`
  font-size: 1.3rem;  // Slightly decreased font size
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;  // Ensure the question is aligned to the left
`;

const Answer = styled.p`
  font-size: 1.05rem;  // Slightly decreased font size
  line-height: 1.6;
  color: #e0e0e0;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #333;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  text-align: left;  // Ensure the answer is aligned to the left
`;

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle visibility of answer
  };

  return (
    <FAQContainer>
      <FAQTitle>Got Questions? We’ve Got Answers</FAQTitle>
      {[
        {
          question: 'What is VidyaAI?',
          answer:
            'VidyaAI is an AI-powered platform designed to help NEET aspirants with Biology, offering personalized learning, doubt-solving, and quiz generation.',
        },
        {
          question: 'How can I use VidyaAI?',
          answer:
            'Simply sign up, select NEET as your exam focus, and start interacting with VidyaAI for personalized learning and guidance.',
        },
        {
          question: 'Is VidyaAI free?',
          answer:
            'Yes, VidyaAI is free to use! We offer both free and premium plans. The basic features are available for free, and you can upgrade to access advanced features and personalized content.',
        },
        {
          question: 'How does VidyaAI help me prepare for NEET Biology?',
          answer:
            'VidyaAI provides tailored quizzes, instant answers to your doubts, and progress tracking to help you master NEET Biology concepts efficiently.',
        },
        {
          question: 'Can I track my progress with VidyaAI?',
          answer:
            'Yes! VidyaAI tracks your learning progress over time and provides personalized recommendations to help you improve your weak areas.',
        },
        {
          question: 'Is there a mobile app for VidyaAI?',
          answer:
            'Currently, VidyaAI is available as a web-based platform. We are working on a mobile app for a more convenient experience on the go.',
        },
        {
          question: 'How do I get personalized study recommendations?',
          answer:
            'VidyaAI analyzes your interactions and performance, then offers tailored study recommendations based on your strengths and weaknesses.',
        },
      ].map((item, index) => (
        <FAQItem key={index} onClick={() => toggleAnswer(index)}>
          <Question>{item.question}</Question>
          <Answer isVisible={activeIndex === index}>{item.answer}</Answer>
        </FAQItem>
      ))}
    </FAQContainer>
  );
};

export default FAQSection;
