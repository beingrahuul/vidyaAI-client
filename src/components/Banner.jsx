import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//assets
import BANNER from "../assets/banner-back.jpg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 0.4), 
      rgba(34, 193, 195, 0.4),
      rgba(0, 0, 0, 0.4)  
    ), 
    url(${BANNER});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 85vh;
  color: #ffffff;
  padding: 40px 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Tagline = styled.h1`
  font-size: 2.8rem; /* Reduced size for better layout */
  font-weight: bold;
  margin: 0;
  line-height: 1.2;
  color: #ffffff; /* Explicitly set to white */
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Subtext = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  color: #ffffff; /* Explicitly set to white */
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InfoList = styled.ul`
  text-align: left;
  list-style: none;
  margin: 20px 0 30px;
  padding: 0;
  color: #ffffff; /* Explicitly set to white */
  font-size: 1rem;
  line-height: 1.8;

  li {
    display: flex;
    align-items: center;
    gap: 10px;

    &::before {
      content: "✔";
      color: #e6195e;
      font-size: 1.2rem;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.div`
  background: ${(props) => (props.primary ? "#e6195e" : "transparent")};
  color: #ffffff; /* Explicitly set to white */
  padding: 15px 30px;
  border: ${(props) => (props.primary ? "none" : "2px solid #ffffff")};
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? "#c5164f" : "#ffffff")};
    color: ${(props) => (props.primary ? "#ffffff" : "#121212")};
  }
`;

const Banner = ({handleLearnMore}) => {

  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  }

  return (
    <Container>
      <ContentWrapper>
        <Tagline>
          Ace NEET Biology with VidyaAI – Your Personalized Study Companion!
        </Tagline>
        <Subtext>
          Unlock your full potential with VidyaAI. Understand complex concepts,
          solve doubts instantly, and measure your growth with our adaptive tools.
        </Subtext>
        <InfoList>
          <li>Interactive quizzes and topic-wise tests</li>
          <li>Personalized progress tracking</li>
          <li>24/7 doubt resolution support</li>
        </InfoList>
        <ButtonContainer>
          <Button primary onClick={handleGetStarted}>Get Started</Button>
          <Button onClick={handleLearnMore}>Learn More</Button>
        </ButtonContainer>
      </ContentWrapper>
    </Container>
  );
};

export default Banner;
