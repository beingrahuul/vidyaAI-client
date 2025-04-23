import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaChevronDown, FaChevronRight } from 'react-icons/fa';

const SidebarContainer = styled.div`
  padding: 1rem;
  background-color: #fff;
  height: 100%;
  color: #374151;
`;

const CourseTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #111827;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const SectionItem = styled.div`
  margin-bottom: 0.75rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  font-weight: 500;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const SectionHeaderText = styled.span`
  flex-grow: 1;
  margin-left: 0.5rem;
`;

const SubsectionList = styled.ul`
  list-style: none;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  max-height: 500px;
  overflow-y: auto;
`;

const SubsectionItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0.4rem 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 0.25rem;
  transition: background-color 0.2s ease, color 0.2s ease;
  font-size: 0.9rem;
  color: ${props => props.isActive ? '#ffffff' : '#4b5563'};
  background-color: ${props => props.isActive ? '#3b82f6' : 'transparent'};

  &:hover {
    background-color: ${props => props.isActive ? '#2563eb' : '#f3f4f6'};
  }

  svg {
    margin-right: 0.5rem;
    color: ${props => props.isCompleted ? '#10b981' : '#d1d5db'};
    flex-shrink: 0;
  }
`;

const SubsectionText = styled.span`
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CourseSidebar = ({ title, sections = [], onSelectSubsection, selectedSubsectionId, selectedSectionIndex }) => {
  const [expandedSections, setExpandedSections] = useState(() => {
    const initialState = {};
    if (sections.length > 0) {
      initialState[0] = true;
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof selectedSectionIndex === 'number') {
      setExpandedSections({ [selectedSectionIndex]: true });
    }
  }, [selectedSectionIndex]);

  const toggleSection = (index) => {
    setExpandedSections(prev => {
      const isCurrentlyExpanded = !!prev[index];
      return isCurrentlyExpanded ? {} : { [index]: true };
    });
  };

  return (
    <SidebarContainer>
      {title && <CourseTitle>{title}</CourseTitle>}
      {sections.map((section, sectionIndex) => {
        const isActiveSection = section.subsections?.some(
          sub => sub.heading === selectedSubsectionId
        );

        return (
          <SectionItem key={section.heading || sectionIndex}>
            <SectionHeader
              onClick={() => toggleSection(sectionIndex)}
              style={{ backgroundColor: isActiveSection ? '#e0f2fe' : 'transparent' }}
            >
              {expandedSections[sectionIndex]
                ? <FaChevronDown size="0.8em" color="#6b7280" />
                : <FaChevronRight size="0.8em" color="#6b7280" />
              }
              <SectionHeaderText>{section.heading}</SectionHeaderText>
            </SectionHeader>

            {expandedSections[sectionIndex] && (
              <SubsectionList>
                {section.subsections?.map((subsection, subIndex) => (
                  <SubsectionItem
                    key={subsection.heading || subIndex}
                    onClick={() => onSelectSubsection(subsection)}
                    isActive={selectedSubsectionId === subsection.heading}
                    isCompleted={subsection.completed}
                  >
                    <FaCheckCircle size="1em" />
                    <SubsectionText>{subsection.heading}</SubsectionText>
                  </SubsectionItem>
                ))}
              </SubsectionList>
            )}
          </SectionItem>
        );
      })}
    </SidebarContainer>
  );
};

export default CourseSidebar;
