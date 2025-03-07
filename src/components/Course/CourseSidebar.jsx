import React, { useMemo } from 'react';
import styled, { css } from 'styled-components';

// Theme & mixins
const theme = {
  colors: {
    primary: '#4f46e5',
    primaryLight: '#eff6ff',
    primaryHover: '#4338ca',
    danger: '#ef4444',
    textPrimary: '#374151',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    background: '#ffffff',
    backgroundHover: '#f3f4f6'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    pill: '9999px'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px'
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px'
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  transitions: {
    default: 'all 0.2s ease-in-out'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)'
  }
};

const flexCenter = css`
  display: flex;
  align-items: center;
`;

// Styled components for the sidebar
const Sidebar = styled.aside`
  width: 320px;
  background-color: ${theme.colors.background};
  border-right: 1px solid ${theme.colors.border};
  height: 100%;
  overflow-y: auto;
  box-shadow: ${theme.shadows.sm};
`;

const SidebarHeader = styled.header`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
  background-color: rgba(255, 255, 255, 0.8);
  position: sticky;
  top: 0;
  z-index: 2;
`;

const CourseTitle = styled.h1`
  font-weight: ${theme.fontWeight.bold};
  font-size: ${theme.fontSize.lg};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProgressContainer = styled.div`
  ${flexCenter};
  margin-top: ${theme.spacing.md};
`;

const ProgressBar = styled.div`
  flex-grow: 1;
  height: 8px;
  background-color: ${theme.colors.border};
  border-radius: ${theme.borderRadius.pill};
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  border-radius: ${theme.borderRadius.pill};
  background-color: ${theme.colors.primary};
  width: ${props => props.percentage}%;
  transition: width 0.5s ease-in-out;
`;

const ProgressText = styled.span`
  margin-left: ${theme.spacing.sm};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.fontWeight.medium};
  min-width: 40px;
  text-align: right;
`;

const DeadlineContainer = styled.div`
  ${flexCenter};
  margin-top: ${theme.spacing.md};
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacing.sm};
  background-color: ${props =>
    props.isUrgent ? 'rgba(239, 68, 68, 0.1)' : 'transparent'};
  border-radius: ${theme.borderRadius.md};
`;

const ClockIcon = styled.svg`
  width: 16px;
  height: 16px;
  margin-right: ${theme.spacing.xs};
  color: ${props =>
    props.isUrgent ? theme.colors.danger : theme.colors.textSecondary};
`;

const DeadlineText = styled.span`
  font-weight: ${props =>
    props.isUrgent ? theme.fontWeight.medium : theme.fontWeight.normal};
  color: ${props => (props.isUrgent ? theme.colors.danger : 'inherit')};
`;

const MaterialsContainer = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.sm} ${theme.spacing.xl};
`;

const MaterialsHeader = styled.h2`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
  color: ${theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: ${theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MaterialCount = styled.span`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.fontWeight.normal};
  background-color: ${theme.colors.backgroundHover};
  padding: 2px 8px;
  border-radius: ${theme.borderRadius.pill};
`;

const MaterialsList = styled.ul`
  margin-top: ${theme.spacing.sm};
  list-style: none;
  padding: 0;
`;

const MaterialItem = styled.li`
  margin-bottom: ${theme.spacing.xs};
  position: relative;
  
  ${props =>
    props.completed &&
    css`
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: ${theme.spacing.sm};
        width: 14px;
        height: 14px;
        margin-top: -7px;
        background-color: ${theme.colors.primary};
        border-radius: 50%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7'%3E%3C/path%3E%3C/svg%3E");
        background-size: 10px;
        background-position: center;
        background-repeat: no-repeat;
      }
    `}
`;

const MaterialButton = styled.button`
  width: 100%;
  ${flexCenter};
  padding: ${theme.spacing.md} ${theme.spacing.sm};
  text-align: left;
  border-radius: ${theme.borderRadius.md};
  border: none;
  background-color: ${props =>
    props.active ? theme.colors.primaryLight : 'transparent'};
  color: ${props =>
    props.active ? theme.colors.primary : theme.colors.textPrimary};
  cursor: pointer;
  transition: ${theme.transitions.default};
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: ${props =>
      props.active ? theme.colors.primaryLight : theme.colors.backgroundHover};
  }

  &:active {
    transform: scale(0.98);
  }
  
  ${props =>
    props.completed &&
    !props.active &&
    css`
      color: ${theme.colors.textSecondary};
    `}
`;

const MaterialButtonContent = styled.div`
  ${flexCenter};
  width: 100%;
  position: relative;
  z-index: 1;
`;

const MaterialIcon = styled.svg`
  width: 20px;
  height: 20px;
  margin-right: ${theme.spacing.md};
  flex-shrink: 0;
  color: ${props =>
    props.active
      ? theme.colors.primary
      : props.completed
      ? theme.colors.textSecondary
      : theme.colors.primary};
  transition: ${theme.transitions.default};
`;

const MaterialInfo = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const MaterialTitle = styled.p`
  font-weight: ${theme.fontWeight.medium};
  font-size: ${theme.fontSize.sm};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MaterialMeta = styled.p`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.textSecondary};
  margin: ${theme.spacing.xs} 0 0;
  display: flex;
  align-items: center;
`;

const MaterialType = styled.span`
  padding: 0 ${theme.spacing.sm};
  position: relative;
  
  &:not(:last-child)::after {
    content: '•';
    position: absolute;
    right: -2px;
  }
`;

const ActiveIndicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: ${theme.borderRadius.pill};
  background-color: ${theme.colors.primary};
  margin-left: ${theme.spacing.sm};
`;

const CourseSidebar = ({
  courseData,
  activeMaterial,
  setActiveMaterial,
  onMaterialClick, // optional additional handler
  onExit,          // optional exit handler
  lastVisited
}) => {
  // Determine if the deadline is urgent
  const isDeadlineUrgent = useMemo(() => {
    if (!courseData.deadline) return false;
    return courseData.deadline.includes('1 Day') ||
      courseData.deadline.includes('hours') ||
      courseData.deadline.includes('min');
  }, [courseData.deadline]);

  // Helper function to render icons based on material type
  const renderMaterialIcon = (type, isActive, isCompleted) => {
    if (type === 'Video') {
      return (
        <MaterialIcon viewBox="0 0 24 24" active={isActive} completed={isCompleted}>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </MaterialIcon>
      );
    } else if (type === 'Article') {
      return (
        <MaterialIcon viewBox="0 0 24 24" active={isActive} completed={isCompleted}>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </MaterialIcon>
      );
    } else if (type === 'Quiz') {
      return (
        <MaterialIcon viewBox="0 0 24 24" active={isActive} completed={isCompleted}>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </MaterialIcon>
      );
    } else {
      return (
        <MaterialIcon viewBox="0 0 24 24" active={isActive} completed={isCompleted}>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </MaterialIcon>
      );
    }
  };

  // Calculate the number of completed materials
  const completedMaterials = courseData.materials.filter(m => m.completed).length;

  return (
    <Sidebar>
      <SidebarHeader>
        <CourseTitle>{courseData.title}</CourseTitle>
        <ProgressContainer>
          <ProgressBar>
            <Progress percentage={courseData.completion} />
          </ProgressBar>
          <ProgressText>{courseData.completion}%</ProgressText>
        </ProgressContainer>
        <DeadlineContainer isUrgent={isDeadlineUrgent}>
          <ClockIcon viewBox="0 0 24 24" isUrgent={isDeadlineUrgent}>
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </ClockIcon>
          <DeadlineText isUrgent={isDeadlineUrgent}>
            Deadline: {courseData.deadline}
          </DeadlineText>
        </DeadlineContainer>
      </SidebarHeader>

      <MaterialsContainer>
        <MaterialsHeader>
          Course Materials
          <MaterialCount>
            {completedMaterials}/{courseData.materials.length}
          </MaterialCount>
        </MaterialsHeader>
        <MaterialsList>
          {courseData.materials.map((material, index) => (
            <MaterialItem 
              key={material.id} 
              completed={material.completed}
            >
              <MaterialButton
                active={activeMaterial === index}
                completed={material.completed}
                onClick={() =>
                  onMaterialClick ? onMaterialClick(index) : setActiveMaterial(index)
                }
                aria-label={`View ${material.title}`}
              >
                <MaterialButtonContent>
                  {renderMaterialIcon(material.type, activeMaterial === index, material.completed)}
                  <MaterialInfo>
                    <MaterialTitle>{material.title}</MaterialTitle>
                    <MaterialMeta>
                      <MaterialType>{material.type}</MaterialType>
                      <MaterialType>{material.duration}</MaterialType>
                    </MaterialMeta>
                  </MaterialInfo>
                  {activeMaterial === index && <ActiveIndicator />}
                </MaterialButtonContent>
              </MaterialButton>
            </MaterialItem>
          ))}
        </MaterialsList>
      </MaterialsContainer>
    </Sidebar>
  );
};

CourseSidebar.defaultProps = {
  courseData: {
    title: 'Course Title',
    completion: 0,
    deadline: 'Not set',
    materials: []
  },
  activeMaterial: 0,
  setActiveMaterial: () => {}
};

export default CourseSidebar;
