import styled from "styled-components";
import { FaUserPlus, FaQuestionCircle, FaChartBar } from 'react-icons/fa'; // Importing icons

// Container for the "How It Works" section
const HowItWorksContainer = styled.div`
  width: 100%;
  margin: 50px 0;
  padding: 40px 20px;
  text-align: center;
  background: #121212;  // Dark background for dark mode
  border-radius: 15px;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;  // Horizontal spacing between steps
  flex-wrap: wrap;  // Allows wrapping in smaller screens
`;

const Step = styled.div`
  color: #ffffff;  // White text for dark mode
  text-align: center;
  width: 300px;
  padding: 20px;
  background: transparent;
  position: relative;
`;

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #e6195e;  // Accent color for icons
  margin-bottom: 15px;
`;

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #e0e0e0;
  line-height: 1.6;
`;

const ArrowIcon = styled.div`
  position: absolute;
  top: 50%;
  right: -30px;  // Positioning the arrow to the right of the step
  transform: translateY(-50%);
  font-size: 3rem;
  color: #e6195e;  // Accent color for arrows
  margin-top: 20px;
`;

const HowItWorks = () => {
  return (
    <HowItWorksContainer>
      <h2 style={{ fontSize: '2.5rem', color: '#ffffff', marginBottom: '40px' }}>How It Works</h2>
      <StepsContainer>
        {/* Step 1 */}
        <Step>
          <IconWrapper>
            <FaUserPlus />
          </IconWrapper>
          <Title>Sign Up</Title>
          <Description>
            Create an account and select NEET as your focus.
          </Description>
          <ArrowIcon>→</ArrowIcon> {/* Right arrow connecting to next step */}
        </Step>

        {/* Step 2 */}
        <Step>
          <IconWrapper>
            <FaQuestionCircle />
          </IconWrapper>
          <Title>Ask Questions</Title>
          <Description>
            Interact with VidyaAI for your biology doubts.
          </Description>
          <ArrowIcon>→</ArrowIcon> {/* Right arrow connecting to next step */}
        </Step>

        {/* Step 3 */}
        <Step>
          <IconWrapper>
            <FaChartBar />
          </IconWrapper>
          <Title>Excel in Exams</Title>
          <Description>
            Improve with tailored quizzes and personalized guidance.
          </Description>
        </Step>
      </StepsContainer>
    </HowItWorksContainer>
  );
};

export default HowItWorks;
