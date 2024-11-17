import React from 'react';
import './MarkdownMessage.css';

const MarkdownMessage = ({ content }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default MarkdownMessage;
