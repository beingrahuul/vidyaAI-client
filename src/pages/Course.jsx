import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

// Service functions
import { fetchStudyGuideById } from '../services/learningService';

// Components
import UserNavbar from '../components/UserNavbar';
import CourseContent from '../components/Course/CourseContent/CourseContent'; 
import CourseSidebar from '../components/Course/CourseSidebar'; 

// Styled components for layout
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9fafb; 
  flex-direction: column;
  overflow: hidden; 
  font-family: 'Inter', sans-serif; 
`;

const MainContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden; 
`;

const LoadingContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1.2em;
  color: #6b7280;
`;

const ErrorContainer = styled(LoadingContainer)`
  color: #ef4444; /* Red color for errors */
`;

// Define Sidebar and Content area widths
const SidebarWrapper = styled.div`
  width: 300px; // Adjust width as needed
  flex-shrink: 0; // Prevent sidebar from shrinking
  border-right: 1px solid #e5e7eb; // Separator line
  overflow-y: auto; // Allow sidebar scrolling if content overflows
  background-color: #ffffff; // White background for sidebar
`;

const ContentWrapper = styled.div`
  flex: 1; // Take remaining space
  overflow-y: auto; // Allow content scrolling
  padding: 2rem; // Add padding around content
  background-color: #f9fafb; // Slightly different background for content area
`;


const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [selectedSubsection, setSelectedSubsection] = useState(null);

  const allSubsections = useMemo(() => {
    if (!courseData?.sections) return [];
    const flatList = [];
    courseData.sections.forEach((section, sectionIndex) => {
      section.subsections?.forEach((subsection, subsectionIndex) => {
        flatList.push({
            ...subsection,
            // Add indices for easier lookup if needed, though linear index is primary now
            _sectionIndex: sectionIndex,
            _subsectionIndex: subsectionIndex
        });
      });
    });
    return flatList;
  }, [courseData]);

  const currentLinearIndex = useMemo(() => {
    if (!selectedSubsection || allSubsections.length === 0) return -1;
    // Assuming subsection.heading is unique enough for finding. Use an ID if available.
    return allSubsections.findIndex(sub => sub.heading === selectedSubsection.heading);
  }, [selectedSubsection, allSubsections]);

  // --- Fetch Course Data on Component Mount ---
  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      setError(null);
      setSelectedSubsection(null); // Reset selection on new load

      const token = localStorage.getItem('token');
      if (!token) {
        console.error("[Course] No token found for fetching course data.");
        navigate('/login');
        return;
      }

      try {
        const data = await fetchStudyGuideById(courseId);
        setCourseData(data);

        // Optionally select the first subsection by default
        if (data && data.sections && data.sections.length > 0 && data.sections[0].subsections && data.sections[0].subsections.length > 0) {
          setSelectedSubsection(data.sections[0].subsections[0]); // Select the first subsection
        }

      } catch (error) {
        console.error("[Course] Error fetching course data:", error);
         if (error.response && (error.response.status === 401 || error.response.status === 403)) {
           localStorage.removeItem("token");
           navigate("/login");
         } else if (error.response && error.response.status === 404) {
            setError("Study guide not found.");
         } else {
           setError(error.message || "Failed to load study guide.");
         }
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
        fetchCourseData();
    } else {
        setError("No Course ID provided.");
        setLoading(false);
    }

  }, [courseId, navigate]);

  // --- Handler to update selected subsection ---
  const handleSelectSubsection = (subsection) => {
    console.log("Selected Subsection:", subsection); // For debugging
    setSelectedSubsection(subsection);
  };


  const handleNavigatePrev = () => {
    if (currentLinearIndex > 0) {
      const prevSubsection = allSubsections[currentLinearIndex - 1];
      setSelectedSubsection(prevSubsection);
    }
  };

  const handleNavigateNext = () => {
    if (currentLinearIndex >= 0 && currentLinearIndex < allSubsections.length - 1) {
      const nextSubsection = allSubsections[currentLinearIndex + 1];
      setSelectedSubsection(nextSubsection);
    }
  };

  // --- NEW: Determine if Prev/Next buttons should be enabled ---
  const hasPrev = currentLinearIndex > 0;
  const hasNext = currentLinearIndex >= 0 && currentLinearIndex < allSubsections.length - 1;


  // --- Render Logic ---
  if (loading) {
    return (
      <Container>
        <UserNavbar />
        <LoadingContainer>
          <p>Loading study guide content...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
      return (
          <Container>
              <UserNavbar />
              <ErrorContainer>
                  <p>{error}</p>
              </ErrorContainer>
          </Container>
      );
  }

  if (!courseData || !courseData.sections) {
    return (
      <Container>
        <UserNavbar />
        <LoadingContainer>
          <p>Study guide data is not available or has no sections.</p>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <UserNavbar courseTitle={courseData?.title} /> 
      <MainContainer>
         {/* Sidebar Area */}
        <SidebarWrapper>
            <CourseSidebar
                title={courseData.title} // Pass course title
                sections={courseData.sections}
                onSelectSubsection={handleSelectSubsection} // Pass the handler
                selectedSubsectionId={selectedSubsection?.heading} 
                selectedSectionIndex={selectedSubsection?._sectionIndex}
            />
        </SidebarWrapper>

        {/* Content Area */}
        <ContentWrapper>
            <CourseContent
                subsection={selectedSubsection} 
                onNavigatePrev={handleNavigatePrev}
                onNavigateNext={handleNavigateNext}
                hasPrev={hasPrev}
                hasNext={hasNext}
            />
        </ContentWrapper>
      </MainContainer>
    </Container>
  );
};

export default Course;