import React from 'react';
import styled from 'styled-components';

const WelcomeSectionContainer = styled.section`
  margin: 30px 0;
`;

const Greeting = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WelcomeText = styled.p`
  color: #666;
  margin: 0;
`;

const WelcomeSection = ({ userName }) => {
  return (
    <WelcomeSectionContainer>
      <Greeting>
        Good morning, {userName} <span role="img" aria-label="waving hand">👋</span>
      </Greeting>
      <WelcomeText>Welcome to VidyaAi, check your priority learning.</WelcomeText>
    </WelcomeSectionContainer>
  );
};

export default WelcomeSection;
