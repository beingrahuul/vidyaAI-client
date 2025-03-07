import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Icons
import { DocumentIcon, ClockIcon } from '../icons';

const CoursesGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const CourseCardContainer = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
`;

const CourseImage = styled.div`
  width: 120px;
  background-color: ${props => props.bgColor || '#e0e7ff'};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CourseContent = styled.div`
  flex: 1;
  padding: 15px;
`;

const CourseBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #e0e7ff;
  color: #6366f1;
  border-radius: 5px;
  padding: 3px 8px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const CourseTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 10px 0;
`;

const CourseInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const ContentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: #666;
  font-size: 13px;
`;

const CourseProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Progress = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
`;

const ProgressCircle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(
    #22c55e ${props => props.percentage}%, 
    #f0f0f0 ${props => props.percentage}% 100%
  );
  position: relative;
`;

const Deadline = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${props => (props.urgent ? '#ef4444' : '#666')};
  font-size: 13px;
`;

const ActionButton = styled.button`
  background-color: #f9f9f9;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  color: #333;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

const CourseCard = ({ course }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <CourseCardContainer>
      <CourseImage bgColor={course.bgColor}>
        <img src={course.image} alt={course.title} />
      </CourseImage>
      <CourseContent>
        <CourseBadge>
          <span style={{ marginRight: '5px' }}>⚡</span>
          {course.badge}
        </CourseBadge>
        <CourseTitle>{course.title}</CourseTitle>
        <CourseInfo>
          <ContentInfo>
            <DocumentIcon />
            {course.materials} Material{course.materials > 1 ? 's' : ''}
          </ContentInfo>
          {course.progress ? (
            <CourseProgress>
              <Progress>
                <ProgressCircle percentage={course.progress} />
              </Progress>
              <span>{course.progress}%</span>
            </CourseProgress>
          ) : (
            <Deadline urgent={course.urgent}>
              <ClockIcon />
              {course.deadline}
            </Deadline>
          )}
        </CourseInfo>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <ActionButton onClick={handleClick}>{course.actionLabel}</ActionButton>
        </div>
      </CourseContent>
    </CourseCardContainer>
  );
};

const CoursesGrid = () => {
  // For simplicity, hard-code two courses here.
  const courses = [
    {
      id: 1,
      image: 'https://i.imgur.com/yd01iL2.jpeg',
      bgColor: '#e0e7ff',
      badge: 'NEET Biology',
      title: 'Biology Fundamentals for NEET',
      description: 'Master the basics of Biology—from cell structure to genetics—with interactive lessons, adaptive quizzes, and real-time doubt resolution tailored to your learning style.',
      materials: 10,
      deadline: '3 Weeks',
      urgent: false,
      progress: 1,
      actionLabel: 'Start Learning',
    },
    {
      id: 2,
      image: 'https://i.imgur.com/yd01iL2.jpeg',
      bgColor: '#f0f9ff',
      badge: 'NEET Biology',
      title: 'Advanced Concepts in NEET Biology',
      description: 'Delve into complex topics such as human physiology, biochemistry, and molecular biology. Benefit from personalized content, adaptive assessments, and 24/7 support to overcome learning challenges.',
      materials: 15,
      deadline: '1 Month',
      urgent: true,
      progress: 64,
      actionLabel: 'Continue Course',
    }
  ];

  return (
    <CoursesGridContainer>
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </CoursesGridContainer>
  );
};

export default CoursesGrid;
