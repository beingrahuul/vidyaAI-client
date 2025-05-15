import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

//images
import aiBrain from "../assets/Landing/ai-brain.png";
import lightBulb from "../assets/Landing/lightbulb.png";
import graph from "../assets/Landing/graph.png";
import modules from "../assets/Landing/modules.png";
import planner from "../assets/Landing/planner.png";
import youtube from "../assets/Landing/youtube.svg";

//components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

const Button = styled.button`
  background-color: ${(props) => (props.variant === "outline" ? "#ffeb3b" : "#1e88e5")};
  color: ${(props) => (props.variant === "outline" ? "#000" : "#fff")};
  border: 1px solid transparent;
  padding: 0.625rem 1.25rem;
  border-radius: 0.375rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease-in-out;
  font-size: 1rem;
  
  &:hover {
    background-color: ${(props) => (props.variant === "outline" ? "#fde047" : "#1565c0")};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
    padding: 0.75rem 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

// Hero Section
const HeroSection = styled.section`
  position: relative;
  background: linear-gradient(135deg, #003366 0%, #00254d 100%);
  padding: 3rem 0;
  color: #fff;
  
  @media (min-width: 768px) {
    padding: 5rem 0;
  }
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  order: 2;
  
  @media (min-width: 768px) {
    order: 1;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  background: linear-gradient(90deg, #ffffff, #bbdefb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
  
`;

const HeroSubtitle = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #e3f2fd;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  order: 1;
  
  @media (min-width: 768px) {
    order: 2;
  }
`;

const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Features Section
const FeaturesSection = styled.section`
  padding: 3rem 0;
  background-color: #f5f9ff;
  
  @media (min-width: 768px) {
    padding: 5rem 0;
  }
`;

const FeaturesSectionTitle = styled(SectionTitle)`
  color: #003366;
`;

const FeaturesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
`;

const FeatureCard = styled.div`
  background-color: ${(props) => (props.highlight ? "#0288d1" : "#fff")};
  color: ${(props) => (props.highlight ? "#fff" : "#333")};
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  }
`;

const FeatureIcon = styled.img`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1.5rem;
  
  @media (min-width: 768px) {
    width: 5rem;
    height: 5rem;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  font-weight: 700;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FeatureText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
`;

// FAQs Section
const FAQsSection = styled.section`
  position: relative;
  background: linear-gradient(135deg, #003366 0%, #001a33 100%);
  padding: 3rem 0;
  color: #fff;
  
  @media (min-width: 768px) {
    padding: 5rem 0;
  }
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: 1.5rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1.25rem;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
`;

const FAQQuestion = styled.h3`
  font-size: 1.125rem;
  color: #fff;
  margin: 0 0 0.75rem 0;
  font-weight: 600;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const FAQAnswer = styled.p`
  margin: 0;
  color: #bbdefb;
  font-size: 0.9375rem;
  line-height: 1.6;
  
  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

// Call to Action Section
const CTASection = styled.section`
  background-color: #f5f9ff;
  padding: 3rem 0;
  text-align: center;
  
  @media (min-width: 768px) {
    padding: 5rem 0;
  }
`;

const CTATitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #003366;
  font-weight: 700;
  
  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.125rem;
  color: #555;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  
  @media (min-width: 640px) {
    flex-direction: row;
  }
`;


// Modal Styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  width: 90%;
  max-width: 800px;
  border-radius: 12px;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;


const Landing = () => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const handleClick = () => navigate("/signup");
  //const openModal = () => setShowModal(true);

const openModal = async () => {
 setShowModal(true);
};


  const closeModal = () => setShowModal(false);

  return (
    <PageWrapper>
      <Navbar />
      
      <HeroSection>
        <Container>
          <HeroGrid>
            <HeroText>
              <HeroTitle>Ace NEET with VidyaAI: Your Personalised Study Companion</HeroTitle>
              <HeroSubtitle>
                Unlock your full potential with VidyaAI. Understand complex concepts, solve doubts instantly, and
                measure your growth with our adaptive learning tools.
              </HeroSubtitle>
              <Button>Get Started →</Button>
            </HeroText>
            <VideoWrapper>
              <StyledVideo controls>
                <source
                  src="https://res.cloudinary.com/dxybawl7g/video/upload/v1732175604/vidyaAi.mov"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </StyledVideo>
            </VideoWrapper>
          </HeroGrid>
        </Container>
      </HeroSection>

      <FeaturesSection>
        <Container>
          <FeaturesSectionTitle>Features That Empower Your Learning</FeaturesSectionTitle>
          <FeaturesGrid>
            {[
              { img: aiBrain, title: 'AI Powered Doubt Solving', text: 'Get instant, accurate answers to your questions with our advanced AI that understands your specific learning needs.', highlight: false },
              { img: lightBulb, title: 'Custom Quizzes', text: 'Create personalized quizzes tailored to your chosen topics and difficulty levels for a targeted learning experience.', highlight: true },
              { img: graph, title: 'Progress Tracking', text: 'Monitor your learning journey with detailed analytics that help identify strengths and areas for improvement.', highlight: false },
              { img: youtube, title: 'YouTube Video Summarization', text: 'Save time by turning lengthy educational videos into concise summaries and key points for efficient revision.', highlight: false },
              { img: modules, title: 'Subject Modules', text: 'Access comprehensive modules for all subjects with organized notes, videos, and interactive lab experiments.', highlight: true },
              { img: planner, title: 'AI-Powered Study Planner', text: 'Get personalized study schedules and smart recommendations that adapt to your learning pace and goals.', highlight: false },
            ].map((feature) => (
              <FeatureCard key={feature.title} highlight={feature.highlight}>
                <div>
                  <FeatureIcon src={feature.img} alt={feature.title} />
                  <FeatureTitle>{feature.title}</FeatureTitle>
                </div>
                <FeatureText>{feature.text}</FeatureText>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Container>
      </FeaturesSection>
      
      <CTASection>
        <Container>
          <CTATitle>Ready to Transform Your NEET Preparation?</CTATitle>
          <CTAText>Join thousands of successful students who have improved their scores with VidyaAI's personalized learning approach.</CTAText>
          <ButtonGroup>
            <Button onClick={handleClick}>Get Started Free</Button>
            <Button variant="outline" onClick={openModal}>Watch Demo</Button>
          </ButtonGroup>
        </Container>
      </CTASection>

      <FAQsSection>
        <Container>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <FAQContainer>
            {[
              { q: 'What is VidyaAI?', a: 'VidyaAI is a personalized study companion designed specifically for NEET aspirants. It uses artificial intelligence to help students understand complex concepts, solve doubts instantly, and track their progress effectively.' },
              { q: 'How does the AI-powered doubt solving work?', a: 'Our AI-powered doubt solving system uses advanced natural language processing to understand your questions and provide accurate, instant answers. It\'s trained on a vast database of NEET-specific content to ensure relevance and accuracy.' },
              { q: 'Can I create my own custom quizzes?', a: 'Yes! VidyaAI allows you to create personalized quizzes tailored to specific topics you want to focus on. This helps you target your weak areas and strengthen your understanding of complex concepts.' },
              { q: 'How does the progress tracking feature help me?', a: 'Our progress tracking feature monitors your learning journey, assesses your achievements, and helps you stay on top of your goals. It provides detailed analytics and insights to help you understand your strengths and areas for improvement.' },
              { q: 'Is VidyaAI available on mobile devices?', a: 'Yes, VidyaAI is fully responsive and works on all devices including smartphones and tablets. You can access all features on the go, making it convenient to study anytime, anywhere.' },
            ].map((faq) => (
              <FAQItem key={faq.q}>
                <FAQQuestion>{faq.q}</FAQQuestion>
                <FAQAnswer>{faq.a}</FAQAnswer>
              </FAQItem>
            ))}
          </FAQContainer>
        </Container>
      </FAQsSection>

      <Footer />

            {showModal && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <VideoWrapper>
              <StyledVideo controls autoPlay>
                <source
                  src="https://res.cloudinary.com/dxybawl7g/video/upload/v1732175604/vidyaAi.mov"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </StyledVideo>
            </VideoWrapper>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

export default Landing;