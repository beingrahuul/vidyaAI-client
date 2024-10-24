import styled from "styled-components";
import FeatureCard from "./FeatureCard";

//images
import BOOK from "../assets/book.jpeg";
import QUIZ from "../assets/Quizzes.png";
import GROWTH from "../assets/growth.png";
import FLASH from "../assets/flash.jpeg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  margin: 20px 0;
  gap: 16px;
  box-sizing: border-box; /* Include padding in the width */
`;

const Heading = styled.h1`
  font-size: 36px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 28px; /* Smaller font size for mobile */
  }
`;

const Subheading = styled.p`
  font-size: 16px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 14px; /* Smaller font size for mobile */
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column; 
    align-items: center; 
  }
`;

const Features = () => {
  return (
    <Container>
      <Heading>Find the right study tools for you</Heading>
      <Subheading>
        Whether you're preparing for UPSC, NEET, or JEE, we provide the tools
        you need for success.
      </Subheading>

      <CardContainer>
        <FeatureCard
          title="Flashcards"
          description="Study with flashcards to memorize key concepts."
          img={FLASH}
        />
        <FeatureCard
          title="Quizzes"
          description="Test your knowledge with quizzes and track your progress."
          img={QUIZ}
        />
        <FeatureCard
          title="Textbook Solutions"
          description="Step-by-step solutions for 9,000 textbooks."
          img={BOOK}
        />
        <FeatureCard
          title="Study Guides"
          description="Find the perfect study guide for your course."
          img={GROWTH}
        />
      </CardContainer>
    </Container>
  );
};

export default Features;
