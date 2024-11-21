import styled from 'styled-components';

// About Us Container
const AboutContainer = styled.div`
  width: 100%;
  margin: 20px 0;
  text-align: center;
  background: #1e1e1e;
  padding: 60px 20px;
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const AboutTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px; /* Reduced space between title and text */
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  color: #e0e0e0;
  line-height: 1.8; /* Increased line height for better readability */
  max-width: 90%;
  margin: 0 auto;
  margin-bottom: 30px; /* Increased space between paragraphs */
`;

const AboutSection = () => {
  return (
    <AboutContainer>
      <AboutTitle>About VidyaAI</AboutTitle>
      <AboutText>
        VidyaAI is dedicated to helping NEET aspirants succeed with personalized learning and expert guidance. Our AI-driven platform is designed to assist students in mastering Biology concepts, solving doubts instantly, and providing tailored quizzes to track progress.
      </AboutText>
      <AboutTitle>What We Are Doing Now</AboutTitle>
      <AboutText>
        Currently, we are focusing on building a comprehensive learning tool for NEET Biology students. VidyaAI provides instant answers to your doubts, interactive quizzes to test your knowledge, and personalized recommendations to improve weak areas. We're fine-tuning our AI model to make the learning experience even more efficient and intuitive.
      </AboutText>
      <AboutTitle>Our Future Plans</AboutTitle>
      <AboutText>
        In the future, we plan to expand VidyaAI's capabilities to cover additional subjects for NEET preparation, including Physics and Chemistry. We will also add more personalized features such as progress tracking, tailored study plans, and a community-driven discussion forum. Furthermore, we aim to integrate VidyaAI with other popular educational platforms to provide a seamless learning experience for students across India. Our goal is to create an all-in-one, AI-powered learning companion that helps students excel in NEET and beyond.
      </AboutText>
    </AboutContainer>
  );
};

export default AboutSection;
