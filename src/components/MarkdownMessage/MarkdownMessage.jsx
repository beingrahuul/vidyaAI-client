import React, { useState, useEffect } from 'react';
import {marked} from 'marked'; 

//style
import './MarkdownMessage.css';

const MarkdownMessage = ({ content, sendMessage }) => {
  const [submitted, setSubmitted] = useState(false); 
  const [selectedAnswers, setSelectedAnswers] = useState({}); 

  const handleOptionChange = (event) => {
    const { value, name} = event.target; 
    setSelectedAnswers((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    setSubmitted(true); 

    console.log('User answers on submission:', selectedAnswers);

    const submitButton = document.getElementById('submitQuiz');
    if (submitButton) {
      submitButton.style.display = 'none';
    }

    const formattedAnswers = Object.entries(selectedAnswers)
      .map(([name, answer]) => `${name}: ${answer}`)
      .join(', ');

    sendMessage(formattedAnswers);
  };

  useEffect(() => {
    const inputs = document.querySelectorAll('input[type="radio"]');

    inputs.forEach((input, idx) => {
      input.setAttribute('data-index', idx + 1); 
      input.addEventListener('change', handleOptionChange);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('change', handleOptionChange);
      });
    };
  }, [content]); 

  return (
    <form onSubmit={handleSubmit}>
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(content), 
        }}
      />
    </form>
  );
};

export default MarkdownMessage;
