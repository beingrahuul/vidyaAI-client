import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EnrollmentCardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 260px;
  border: 1px solid #e4e4e4;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
    border-color: rgba(99, 102, 241, 0.3);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #6366f1, #8b5cf6);
    transform: ${props => props.completed ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: left;
    transition: transform 0.6s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const MaterialsBadge = styled.div`
  background-color: #eef2ff;
  color: #6366f1;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '📚';
    font-size: 14px;
  }
`;

const StatusBadge = styled.div`
  background-color: ${props => {
    if (props.completed) return '#ecfdf5'; // light green bg
    if (props.inProgress) return '#fffbeb'; // light yellow bg
    return '#f3f4f6'; // light gray bg
  }};
  color: ${props => {
    if (props.completed) return '#10b981'; // green text
    if (props.inProgress) return '#d97706'; // dark yellow text
    return '#6b7280'; // gray text
  }};
  border: 1px solid ${props => {
    if (props.completed) return '#d1fae5'; // green border
    if (props.inProgress) return '#fef3c7'; // yellow border
    return '#e5e7eb'; // gray border
  }};
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: ${props => {
      if (props.completed) return '"✅"';
      if (props.inProgress) return '"⏳"';
      return '"🔘"';
    }};
    font-size: 14px;
  }
`;

const EnrollmentContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CourseBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #eef2ff;
  color: #6366f1;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 14px;
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.1);
`;

const CourseTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 16px;
  color: #111827;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const TagLabel = styled.span`
  background-color: #f3f4f6;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 12px;
  color: #4b5563;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e5e7eb;
  }
`;

const ProgressSection = styled.div`
  margin-top: auto;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-top: 12px;
`;

const ProgressBar = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background: ${props => 
    props.percentage === 100 
      ? '#10b981' // green for completed
      : props.percentage > 70 
        ? 'linear-gradient(90deg, #6366f1, #10b981)' // blue to green gradient for almost done
        : props.percentage > 30 
          ? '#6366f1' // blue for good progress
          : props.percentage > 0 
            ? '#fbbf24' // yellow for just started
            : '#9ca3af' // gray for not started
  };
  transition: width 0.6s ease-in-out;
`;

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const ProgressText = styled.span`
  font-size: 13px;
  color: ${props => 
    props.percentage === 100 ? '#10b981' : // green
    props.percentage > 0 ? '#6366f1' : // blue
    '#6b7280' // gray
  };
  font-weight: 600;
`;

const SectionsInfo = styled.span`
  font-size: 13px;
  color: #6b7280;
`;

const DeadlineText = styled.div`
  font-size: 13px;
  color: ${props => props.urgent ? '#ef4444' : '#6b7280'};
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &::before {
    content: ${props => props.urgent ? '"⚠️"' : '"🗓️"'};
    font-size: 14px;
  }
`;



const CourseCard = ({ enrollment }) => {
  const navigate = useNavigate();

  const totalSections = enrollment.sections?.length || 0;
  const totalMaterials = enrollment.sections?.reduce(
    (sum, sec) => sum + (sec.subsections?.length || 0),
    0
  );
  const completedPerc = enrollment.completionPercentage || 0;
  
  // Calculate if deadline is close (within 3 days)
  const isDeadlineUrgent = () => {
    if (!enrollment.deadline) return false;
    const deadlineDate = new Date(enrollment.deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  // Format deadline nicely
  const formatDeadline = () => {
    if (!enrollment.deadline) return null;
    const deadlineDate = new Date(enrollment.deadline);
    
    // Options for formatting
    const options = { month: 'short', day: 'numeric' };
    if (deadlineDate.getFullYear() !== new Date().getFullYear()) {
      options.year = 'numeric';
    }
    
    return deadlineDate.toLocaleDateString(undefined, options);
  };

  const handleClick = () => {
      navigate(`/course/${enrollment._id}`);
  }

  return (
    <EnrollmentCardContainer onClick={handleClick} completed={completedPerc === 100}>
      <HeaderRow>
        <MaterialsBadge>{totalMaterials} materials</MaterialsBadge>
        <StatusBadge
          completed={completedPerc === 100}
          inProgress={enrollment.hasStarted && completedPerc < 100}
        >
          {completedPerc === 100
            ? 'Completed'
            : enrollment.hasStarted
            ? 'In Progress'
            : 'Not Started'}
        </StatusBadge>
      </HeaderRow>

      <EnrollmentContent>
        <div>
          <CourseBadge>
            <span style={{ marginRight: '5px' }}>⚡</span>
            NEET
          </CourseBadge>
          <CourseTitle>{enrollment.topic}</CourseTitle>
          <TagsContainer>
            {/* Example dynamic tag list */}
            <TagLabel>NEET</TagLabel>
            {enrollment.subject && <TagLabel>{enrollment.subject}</TagLabel>}
            {enrollment.level && <TagLabel>Level: {enrollment.level}</TagLabel>}
          </TagsContainer>
        </div>

        <ProgressSection>
          <ProgressBarContainer>
            <ProgressBar percentage={completedPerc} />
          </ProgressBarContainer>
          <ProgressInfo>
            <ProgressText percentage={completedPerc}>
              {completedPerc}% complete
            </ProgressText>
            <SectionsInfo>
              {totalSections} {totalSections === 1 ? 'section' : 'sections'}
            </SectionsInfo>
          </ProgressInfo>
          
          {enrollment.deadline && (
            <DeadlineText urgent={isDeadlineUrgent()}>
              Due: {formatDeadline()}
            </DeadlineText>
          )}
        </ProgressSection>
      </EnrollmentContent>
    </EnrollmentCardContainer>
  );
};

export default CourseCard;