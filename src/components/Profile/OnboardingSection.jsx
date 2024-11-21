import React from 'react';
import SectionContainer from './SectionContainer';  // Import the SectionContainer styled component
import styled from 'styled-components';

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #f5f5f5;
  }

  input, textarea {
    padding: 10px;
    border: 1px solid #444;
    border-radius: 5px;
    background-color: #333;
    color: #f5f5f5;
    width: 100%;
  }

  textarea {
    resize: none;
    height: 100px;
  }
`;

const OnboardingSection = ({ onboardingResponses, setOnboardingResponses, handleSubmitOnboarding }) => {
  return (
    <SectionContainer>  {/* Wrap the section content in the SectionContainer */}
      <h2>Onboarding Responses</h2>
      <InfoGroup>
        <label>Confidence Level</label>
        <input
          type="text"
          value={onboardingResponses.confidenceLevel}
          onChange={(e) => setOnboardingResponses({ ...onboardingResponses, confidenceLevel: e.target.value })}
        />
      </InfoGroup>
      <InfoGroup>
        <label>Untouched Topics</label>
        <textarea
          value={onboardingResponses.untouchedTopics.join(', ')}
          onChange={(e) => setOnboardingResponses({ ...onboardingResponses, untouchedTopics: e.target.value.split(', ') })}
        />
      </InfoGroup>
      <InfoGroup>
        <label>Challenging Topic</label>
        <input
          type="text"
          value={onboardingResponses.challengingTopic}
          onChange={(e) => setOnboardingResponses({ ...onboardingResponses, challengingTopic: e.target.value })}
        />
      </InfoGroup>
      <InfoGroup>
        <label>Daily Study Time (hours)</label>
        <input
          type="number"
          value={onboardingResponses.dailyStudyTime}
          onChange={(e) => setOnboardingResponses({ ...onboardingResponses, dailyStudyTime: e.target.value })}
        />
      </InfoGroup>
      <InfoGroup>
        <label>Preferred Learning Method</label>
        <input
          type="text"
          value={onboardingResponses.preferredLearningMethod}
          onChange={(e) => setOnboardingResponses({ ...onboardingResponses, preferredLearningMethod: e.target.value })}
        />
      </InfoGroup>
      <button onClick={handleSubmitOnboarding}>Save Onboarding Responses</button>
    </SectionContainer>
  );
};

export default OnboardingSection;
