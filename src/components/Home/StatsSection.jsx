import React from 'react';
import styled from 'styled-components';
import { InfoIcon } from '../icons';

const StatsSectionContainer = styled.div`
  display: flex;
  margin: 40px 0;
  gap: 20px;
`;

const StatsContainer = styled.div`
  flex: 1;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 20px;
`;

const StatsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const StatsTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatCards = styled.div`
  display: flex;
  gap: 15px;
`;

const StatCard = styled.div`
  flex: 1;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.color || '#333'};
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #666;
`;

const GoalProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
`;

const GoalText = styled.div`
  font-size: 14px;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
`;

const ProgressFill = styled.div`
  position: absolute;
  height: 100%;
  width: ${props => props.percentage}%;
  background-color: #22c55e;
  border-radius: 4px;
`;

const StreakInfo = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: #666;
`;

const DetailLink = styled.a`
  color: #6366f1;
  text-decoration: none;
  font-size: 14px;
  display: block;
  text-align: right;
  margin-top: 10px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const StatsSection = () => {
  return (
    <StatsSectionContainer>
      <StatsContainer>
        <StatsHeader>
          <StatsTitle>
            <InfoIcon />
            Learning content
          </StatsTitle>
        </StatsHeader>
        <StatCards>
          <StatCard>
            <StatValue color="#6366f1">120</StatValue>
            <StatLabel>Learning content</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="#6366f1">44</StatValue>
            <StatLabel>Learning time</StatLabel>
          </StatCard>
        </StatCards>
      </StatsContainer>

      <StatsContainer>
        <StatsHeader>
          <StatsTitle>
            <InfoIcon />
            Goals
          </StatsTitle>
        </StatsHeader>
        <GoalProgress>
          <GoalText>Daily Goal: 6/30 learning mins</GoalText>
          <ProgressBar>
            <ProgressFill percentage={20} />
          </ProgressBar>
        </GoalProgress>
        <StreakInfo>
          Your Longest streak: 1 Day
          <br />
          (28 MAR 2025 - 4 JUN 2025)
        </StreakInfo>
        <DetailLink href="#">
          See Detail
        </DetailLink>
      </StatsContainer>

      <StatsContainer>
        <StatsHeader>
          <StatsTitle>
            <InfoIcon />
            Leaderboard
          </StatsTitle>
        </StatsHeader>
        <StatCards>
          <StatCard>
            <StatValue color="#f59e0b">100</StatValue>
            <StatLabel>Point</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="#6366f1">32</StatValue>
            <StatLabel>Badges</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue color="#f59e0b">12</StatValue>
            <StatLabel>Cer</StatLabel>
          </StatCard>
        </StatCards>
      </StatsContainer>
    </StatsSectionContainer>
  );
};

export default StatsSection;
