import styled from "styled-components";

// Components for icons (use actual icon library or images as needed)
import { FaBrain, FaClipboardList, FaChartLine } from 'react-icons/fa';

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 50px;
  width: 100%;
  margin: 50px 0;
  justify-items: center; /* Centers the cards horizontally */
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack cards on small screens */
  }
`;

const FeatureCard = styled.div`
  background: #1e1e1e;
  color: #ffffff;
  border-radius: 15px;
  padding: 40px 30px;
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  transition: background-color 0.3s ease, color 0.3s ease;
  border: 4px solid transparent;
  border-radius: 15px;
  border-image: linear-gradient(to top, #37ecba 0%, #72afd3 100%) 1;
  cursor: pointer;
  
  &:hover {
    background-color: #090909; 
    color: #121212;
  }

  /* Responsive card sizing */
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const IconWrapper = styled.div`
  font-size: 4rem;
  color: #e6195e;
  margin-bottom: 25px;
`;

const Title = styled.h3`
  font-size: 1.9rem;
  font-weight: bold;
  margin-bottom: 15px;
  color: #ffffff;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 30px;
  color: #e0e0e0;
`;

const Features = () => {
  return (
    <FeaturesContainer>
      <FeatureCard>
        <IconWrapper>
          <FaBrain />
        </IconWrapper>
        <Title>AI-Powered Doubt Solving</Title>
        <Description>
          Get instant answers to your toughest biology questions.
        </Description>
      </FeatureCard>
      <FeatureCard>
        <IconWrapper>
          <FaClipboardList />
        </IconWrapper>
        <Title>Custom Quizzes</Title>
        <Description>
          Practice tailored quizzes for every topic in NEET Biology.
        </Description>
      </FeatureCard>
      <FeatureCard>
        <IconWrapper>
          <FaChartLine />
        </IconWrapper>
        <Title>Progress Tracking</Title>
        <Description>
          Track your strengths and weaknesses with ease.
        </Description>
      </FeatureCard>
    </FeaturesContainer>
  );
};

export default Features;
