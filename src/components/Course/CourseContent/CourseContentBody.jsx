// src/components/CourseContent/CourseContentBody.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styled from 'styled-components';
import remarkMath from 'remark-math'; // For parsing LaTeX math
import rehypeKatex from 'rehype-katex'; // For rendering math with KaTeX
import rehypeHighlight from 'rehype-highlight'; // For syntax highlighting
import rehypeRaw from 'rehype-raw'; // To parse raw HTML (use with caution!)
import rehypeSanitize from 'rehype-sanitize';


const StyledContentBody = styled.div` /* Renamed to avoid conflict if ContentBody component is used directly */
  line-height: 1.8;
  font-size: 1.05rem;

  /* Apply styles directly to markdown-generated elements */
  & h1, & h2, & h3, & h4, & h5, & h6 {
    margin-top: 1.8em;
    margin-bottom: 0.8em;
    font-weight: 600;
    color: #1f2937;
  }

  & h2 {
    font-size: 1.5rem;
    border-bottom: 1px solid #f3f4f6;
    padding-bottom: 0.5rem;
  }

  & h3 {
    font-size: 1.25rem;
  }

  & p {
    margin-bottom: 1.2em;
    font-size: 16.8px; /* Or whatever size you want, 1.05rem is 16.8px if base is 16px */
  }

  & ul, & ol {
    margin-left: 1.5em;
    margin-bottom: 1.2em;
    padding-left: 1em;
  }

  & li {
    margin-bottom: 0.5em;
  }

  & code:not(pre code) { /* Inline code */
    background-color: #f3f4f6;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.9em;
  }

  & pre { /* Block code container */
    background-color: #f3f4f6; /* This background might be overridden by highlight.js theme */
    padding: 1em; /* This padding might be overridden by highlight.js theme */
    border-radius: 5px;
    overflow-x: auto;
    margin: 1.5em 0;

    & code { /* Code inside pre */
        background: none; /* Ensure highlight.js background shows */
        padding: 0; /* Ensure highlight.js padding applies if needed */
        font-size: 1em;
    }
  }

  & blockquote {
    border-left: 4px solid #4f46e5;
    padding-left: 1rem;
    font-style: italic;
    color: #4b5563;
    margin: 1.5em 0;
  }

  & img {
    max-width: 100%;
    border-radius: 6px;
    margin: 1em auto;
    height: auto;
    display: block;
  }

  & table {
    border-collapse: collapse;
    margin: 1.5em 0;
    width: 100%;
    overflow-x: auto;
    display: block;
  }

  & th, & td {
    border: 1px solid #e5e7eb;
    padding: 0.75rem;
    text-align: left;
  }

  & th {
    background-color: #f9fafb;
    font-weight: 600;
  }

  & tr:nth-child(even) {
    background-color: #f3f4f6;
  }

  /* Assuming .highlight and .note are custom classes you want to support via HTML */
  & .highlight {
    background-color: #fef3c7;
    padding: 1rem;
    border-radius: 6px;
    border-left: 4px solid #f59e0b;
    margin: 1.5em 0;
  }

  & .note {
    background-color: #eff6ff;
    padding: 1rem;
    border-radius: 6px;
    border-left: 4px solid #3b82f6;
    margin: 1.5em 0;
  }

  /* Styles added by KaTeX */
  & .katex {
    font-size: 1.05em; /* Match paragraph font size */
  }
  & .katex-display {
    margin-top: 1em;
    margin-bottom: 1em;
    overflow-x: auto; /* Prevent display math from overflowing */
    overflow-y: hidden;
  }

`;


const CourseContentBody = ({ content }) => {
  return (
    <StyledContentBody> {/* Wrap the markdown output with your main styled div */}
      <ReactMarkdown
        children={content}
        remarkPlugins={[
          remarkGfm,      // Enables GitHub flavored markdown
          remarkMath      // Enables parsing of math blocks/inline math
        ]}
        rehypePlugins={[
          rehypeRaw,      // Parses raw HTML (necessary for rehype-sanitize to work on HTML)
          rehypeSanitize, // Sanitize HTML to prevent XSS (uses a default schema)
          rehypeHighlight, // Adds syntax highlighting to code blocks
          rehypeKatex     // Renders math blocks parsed by remarkMath
        ]}
        // components={customComponents} // Uncomment this line to enable custom component rendering
      />
    </StyledContentBody>
  );
};


export default CourseContentBody;