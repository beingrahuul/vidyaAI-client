import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

//components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #121212; 
  color: #e0e0e0;
  min-height: 100vh;
`;

const ContactContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px 20px;
  background: #121212;  // Dark background for the page
  box-sizing: border-box;
`;

const LeftSection = styled.div`
  width: 45%;
  color: #ffffff;  // White text color
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #ffffff;  // Ensure the title has light color
`;

const InfoList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const InfoItem = styled.li`
  margin-bottom: 15px;
  font-size: 1.1rem;
  color: #e0e0e0;  // Slightly lighter text color for list items
`;

const ContactFormSection = styled.div`
  width: 45%;
  background-color: inherit; // Background color inherited from the parent container
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: inherit;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #333;  // Dark border for input
  background-color: #1e1e1e;  // Dark input background
  color: #ffffff;  // Light text color in inputs
  width: 100%;
  box-sizing: border-box;

  &::placeholder {
    color: #e0e0e0;  // Lighter placeholder text
  }

  &:focus {
    outline: none;
    border-color: #4a90e2;  // Blue border on focus
  }
`;

const Textarea = styled.textarea`
  padding: 15px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #333;  // Dark border for textarea
  background-color: #1e1e1e;  // Dark background
  color: #ffffff;  // Light text color
  width: 100%;
  height: 150px;
  box-sizing: border-box;
  resize: none;

  &::placeholder {
    color: #e0e0e0;  // Lighter placeholder text
  }

  &:focus {
    outline: none;
    border-color: #4a90e2;  // Blue border on focus
  }
`;

const SubmitButton = styled.button`
  padding: 15px;
  font-size: 1.2rem;
  background-color: #4a90e2;  // Blue button
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ab7;  // Darker blue on hover
  }
`;

const SuccessMessage = styled.p`
  font-size: 1.2rem;
  color: #4caf50;  // Green success message
  margin-top: 20px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  font-size: 1.5rem;

  a {
    color: #4a90e2;
    transition: color 0.3s ease;
  }

  a:hover {
    color: #357ab7;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, we're just setting a success message
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    // In a real app, you'd send the form data to a backend or email service
  };

  return (
    <Container>
      <Navbar />
      <ContactContainer>
        <LeftSection>
          <ContactTitle>Contact Information</ContactTitle>
          <InfoList>
            <InfoItem>VidyaAi</InfoItem>
            <InfoItem>beingrahuul@gmail.com</InfoItem>
            <InfoItem>VidyaAI is an AI-powered learning platform for NEET Biology, offering personalized study plans, progress tracking, and doubt-solving features. In the future, it will expand to cover JEE, UPSC, and other exams, with AI-driven quizzes, adaptive learning, and intelligent tutoring. Our goal is to provide tailored learning experiences, continuously evolving with AI advancements to help students succeed across all subjects and exams.</InfoItem>
            <InfoItem>
              <SocialIcons>
                <a href="https://facebook.com/vidyaai" target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
                <a href="https://twitter.com/vidyaai" target="_blank" rel="noopener noreferrer">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com/vidyaai" target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              </SocialIcons>
            </InfoItem>
          </InfoList>
        </LeftSection>

        <ContactFormSection>
          <ContactTitle>Contact Us</ContactTitle>
          {submitted ? (
            <SuccessMessage>Thank you for reaching out! We will get back to you soon.</SuccessMessage>
          ) : (
            <ContactForm onSubmit={handleSubmit}>
              <Input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Your Name"
                onChange={handleChange}
                required
              />
              <Input
                type="email"
                name="email"
                value={formData.email}
                placeholder="Your Email"
                onChange={handleChange}
                required
              />
              <Input
                type="text"
                name="subject"
                value={formData.subject}
                placeholder="Subject"
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                value={formData.message}
                placeholder="Your Message"
                onChange={handleChange}
                required
              />
              <SubmitButton type="submit">Send Message</SubmitButton>
            </ContactForm>
          )}
        </ContactFormSection>
      </ContactContainer>
      <Footer />
    </Container>
  );
};

export default Contact;
