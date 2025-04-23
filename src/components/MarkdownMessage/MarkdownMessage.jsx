// src/components/MarkdownMessage/MarkdownMessage.js
import React from 'react';
import { marked } from 'marked'; // Import marked for parsing Markdown

// Import the CSS file for styling
import './MarkdownMessage.css'; // Assuming you have a CSS file for basic markdown styling

/**
 * Renders a message containing Markdown text.
 * @param {object} props - Component props.
 * @param {string} props.content - The Markdown text content to render.
 * // Removed sendMessage prop as it's not needed here anymore
 */
const MarkdownMessage = ({ content }) => {

  // Use marked to parse the markdown content to HTML
  const htmlContent = marked.parse(content);

  return (
    <div
      className="markdownMessage" // Add a class for potential styling
      dangerouslySetInnerHTML={{
        __html: htmlContent, // Render the parsed HTML
      }}
    />
  );
};

export default MarkdownMessage;
