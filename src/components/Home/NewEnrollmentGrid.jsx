import React from 'react';
import styled from 'styled-components';

const NewEnrollmentGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const EnrollmentCardContainer = styled.div`
  background-color: ${props => props.bgColor || '#e0e7ff'};
  border-radius: 10px;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 180px;
  border: 1px solid #e4e4e4;
`;

const MaterialsBadge = styled.div`
  align-self: flex-start;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 5px;
  padding: 3px 8px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const EnrollmentContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: flex-end;
  margin-top: auto;
`;

const CourseBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #e0e7ff;
  color: #6366f1;
  border-radius: 5px;
  padding: 3px 8px;
  font-size: 12px;
  width: fit-content;
  margin-bottom: 10px;
`;

const CourseTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const TagLabel = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  padding: 4px 10px;
  font-size: 12px;
  color: #333;
`;

const EnrollmentCard = ({ enrollment }) => {
  return (
    <EnrollmentCardContainer bgColor={enrollment.bgColor}>
      {enrollment.materials && (
        <MaterialsBadge>{enrollment.materials} materials</MaterialsBadge>
      )}
      <EnrollmentContent>
        <CourseBadge>
          <span style={{ marginRight: '5px' }}>⚡</span>
          {enrollment.badge}
        </CourseBadge>
        <CourseTitle>{enrollment.title}</CourseTitle>
        <TagsContainer>
          {enrollment.tags.map((tag, idx) => (
            <TagLabel key={idx}>{tag}</TagLabel>
          ))}
        </TagsContainer>
      </EnrollmentContent>
    </EnrollmentCardContainer>
  );
};

const NewEnrollmentGrid = () => {
  
  const enrollments = [
    {
      bgColor: '#e9d5ff',
      materials: 12,
      badge: 'NEET Biology',
      title: 'Cell Biology: Structure and Function',
      tags: ['Fundamentals', 'Interactive']
    },
    {
      bgColor: '#fef9c3',
      materials: 15,
      badge: 'NEET Biology',
      title: 'Genetics and Evolution',
      tags: ['Intermediate', 'Adaptive Learning']
    },
    {
      bgColor: '#bae6fd',
      materials: 18,
      badge: 'NEET Biology',
      title: 'Human Physiology and Anatomy',
      tags: ['Advanced', 'Exam Focused']
    }
  ];
  
  return (
    <NewEnrollmentGridContainer>
      {enrollments.map((enrollment, index) => (
        <EnrollmentCard key={index} enrollment={enrollment} />
      ))}
    </NewEnrollmentGridContainer>
  );
};

export default NewEnrollmentGrid;