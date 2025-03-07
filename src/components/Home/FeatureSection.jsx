import React from 'react';
import styled from 'styled-components';
import { ArrowRightIcon } from '../icons';

const FeatureSectionContainer = styled.div`
  background-color: #f0fff4;
  border-radius: 10px;
  padding: 20px;
  margin: 30px 0;
  position: relative;
`;

const NewBadge = styled.span`
  background-color: #10b981;
  color: white;
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 500;
  margin-right: 10px;
`;

const FeatureTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
`;

const FeatureDescription = styled.p`
  color: #666;
  margin: 0;
  font-size: 14px;
`;

const SectionLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  margin-top: 5px;
  margin-left: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FeatureSection = () => {
  return (
    <FeatureSectionContainer>
      <FeatureTitle>
        <NewBadge>New</NewBadge>
        Feature Discussion
      </FeatureTitle>
      <FeatureDescription>
        The learning content are a new feature in "Feature Discussion" can be explain the material problem chat.
        <SectionLink href="#">
          Go to detail <ArrowRightIcon />
        </SectionLink>
      </FeatureDescription>
    </FeatureSectionContainer>
  );
};

export default FeatureSection;
