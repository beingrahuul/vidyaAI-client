import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserNavbar from '../components/UserNavbar';
import CourseSidebar from '../components/Course/CourseSidebar';
import CourseContent from '../components/Course/CourseContent';
import { useParams, useNavigate } from 'react-router-dom';

// Styled components for layout
const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: #f9fafb;
  flex-direction: column;
  overflow: hidden;
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
`;

const Course = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [lastVisited, setLastVisited] = useState(null);

  // Simulate API call to fetch course data
  useEffect(() => {
    const fetchCourseData = () => {
      setLoading(true);
      setTimeout(() => {
        const data = {
          id: courseId || '1',
          title: 'Foundations of NEET Biology: Cell Biology and Beyond',
          description: 'A comprehensive course covering essential NEET Biology concepts.',
          instructor: 'Dr. Sharma',
          materials: [
            { id: 1, title: 'Introduction to NEET Biology', type: 'Video', duration: '20 min', completed: true },
            { id: 2, title: 'Cell Structure and Function', type: 'Article', duration: '15 min', completed: true },
            { id: 3, title: 'Genetics: The Building Blocks of Life', type: 'Interactive', duration: '25 min', completed: false },
            { id: 4, title: 'Human Anatomy Overview', type: 'Video', duration: '18 min', completed: false },
            { id: 5, title: 'Exam Strategy and Tips', type: 'Article', duration: '12 min', completed: false },
            { id: 6, title: 'Practice Questions', type: 'Quiz', duration: '30 min', completed: false },
            { id: 7, title: 'Mock Test', type: 'Assessment', duration: '60 min', completed: false }
          ],
          completion: 40,
          deadline: '2 Days',
          totalDuration: '180 min',
          tags: ['NEET', 'Biology', 'Medical Entrance'],
          prerequisites: ['Basic understanding of high school biology'],
          resourceLinks: [
            { title: 'NCERT Biology Textbook', url: '#' },
            { title: 'Biology Diagrams Reference', url: '#' }
          ]
        };
        
        setCourseData(data);
        
        // Load last visited material from localStorage, if available
        const savedProgress = localStorage.getItem(`course_${data.id}_progress`);
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress);
          setActiveMaterial(parsedProgress.lastMaterial || 0);
          setProgress(parsedProgress.progress || data.completion);
          setLastVisited(parsedProgress.timestamp);
        } else {
          setProgress(data.completion);
        }
        
        setLoading(false);
      }, 800);
    };
    
    fetchCourseData();
  }, [courseId]);

  // Save progress to localStorage whenever activeMaterial or progress updates
  useEffect(() => {
    if (courseData) {
      const progressData = {
        lastMaterial: activeMaterial,
        progress: progress,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`course_${courseData.id}_progress`, JSON.stringify(progressData));
    }
  }, [activeMaterial, progress, courseData]);

  // Material content for each module
  const materialContent = [
    <div key="content1">
      <h2>Introduction to NEET Biology</h2>
      <p>
        Get an overview of NEET Biology, understand the exam structure, core subjects, and the significance of a strong biological foundation.
        This introduction sets the stage for the detailed topics ahead.
      </p>
      <h3>Key Points to Remember</h3>
      <ul>
        <li>NEET Biology comprises approximately 50% of the total questions.</li>
        <li>Focus on NCERT textbooks for core concepts.</li>
        <li>Understanding diagrams is crucial.</li>
        <li>Regular practice with previous years' questions is essential.</li>
      </ul>
      <div className="video-container">
        <p>Video player would be embedded here</p>
      </div>
    </div>,
    <div key="content2">
      <h2>Cell Structure and Function</h2>
      <p>
        Explore the fundamental building blocks of life by understanding cell structure and function.
        Interactive diagrams and clear explanations help you grasp complex cellular processes.
      </p>
      <h3>Cell Organelles</h3>
      <ul>
        <li><strong>Nucleus:</strong> Control center of the cell.</li>
        <li><strong>Mitochondria:</strong> Produces ATP through cellular respiration.</li>
        <li><strong>Endoplasmic Reticulum:</strong> Involved in protein synthesis.</li>
        <li><strong>Golgi Apparatus:</strong> Packages proteins for secretion.</li>
        <li><strong>Lysosomes:</strong> Contains digestive enzymes.</li>
      </ul>
      <div className="article-image">
        <p>Cell structure diagram would be displayed here</p>
      </div>
    </div>,
    <div key="content3">
      <h2>Genetics: The Building Blocks of Life</h2>
      <p>
        Dive into the world of genetics to learn about DNA, genes, and heredity.
        This interactive session covers key concepts essential for understanding modern biology.
      </p>
      <h3>DNA Structure and Replication</h3>
      <p>
        DNA is composed of nucleotides containing deoxyribose sugar, a phosphate group, and a nitrogenous base.
        The four nitrogenous bases are Adenine (A), Thymine (T), Guanine (G), and Cytosine (C).
      </p>
      <h3>Mendel's Laws of Inheritance</h3>
      <ul>
        <li>Law of Dominance</li>
        <li>Law of Segregation</li>
        <li>Law of Independent Assortment</li>
      </ul>
      <div className="interactive-element">
        <p>Interactive DNA model would be embedded here</p>
      </div>
    </div>,
    <div key="content4">
      <h2>Human Anatomy Overview</h2>
      <p>
        Understand the structure and functions of the human body through detailed video lectures and illustrations.
        This module is crucial for mastering human biology for NEET.
      </p>
      <h3>Major Organ Systems</h3>
      <ul>
        <li><strong>Circulatory System:</strong> Heart, blood vessels, blood.</li>
        <li><strong>Respiratory System:</strong> Lungs, trachea, bronchi.</li>
        <li><strong>Digestive System:</strong> Stomach, intestines, liver, pancreas.</li>
        <li><strong>Nervous System:</strong> Brain, spinal cord, nerves.</li>
        <li><strong>Endocrine System:</strong> Pituitary, thyroid, adrenal glands.</li>
      </ul>
      <div className="video-container">
        <p>Video player with anatomy visualization would be embedded here</p>
      </div>
    </div>,
    <div key="content5">
      <h2>Exam Strategy and Tips</h2>
      <p>
        Benefit from personalized exam strategies and study tips tailored for NEET Biology.
        Learn effective revision techniques and time management skills to excel in your exam.
      </p>
      <h3>Study Calendar</h3>
      <ul>
        <li>Allocate more time to complex topics.</li>
        <li>Regularly review previously studied materials.</li>
        <li>Reserve time for practice tests.</li>
      </ul>
      <h3>Revision Techniques</h3>
      <p>
        Use active recall, spaced repetition, and mind maps to enhance retention of biological concepts.
      </p>
    </div>,
    <div key="content6">
      <h2>Practice Questions</h2>
      <p>
        Test your understanding with practice questions covering the key concepts from previous modules.
      </p>
      <div className="quiz-container">
        <p>Interactive quiz would be embedded here with multiple-choice questions</p>
      </div>
    </div>,
    <div key="content7">
      <h2>Mock Test</h2>
      <p>
        Take a comprehensive mock test to assess your overall preparation and identify areas for improvement.
      </p>
      <div className="assessment-container">
        <p>Timed assessment module would be embedded here</p>
      </div>
    </div>
  ];

  // Navigation handlers
  const handlePrev = () => {
    setActiveMaterial(prev => Math.max(0, prev - 1));
  };
  
  const handleNext = () => {
    if (courseData && activeMaterial < courseData.materials.length - 1) {
      // Mark current material as completed
      const updatedCourseData = { ...courseData };
      updatedCourseData.materials[activeMaterial].completed = true;
      setCourseData(updatedCourseData);
      
      // Update progress
      const completedCount = updatedCourseData.materials.filter(m => m.completed).length;
      const newProgress = Math.round((completedCount / updatedCourseData.materials.length) * 100);
      setProgress(newProgress);
      
      // Move to next material
      setActiveMaterial(prev => prev + 1);
    }
  };
  
  const handleMaterialClick = (index) => {
    setActiveMaterial(index);
  };
  
  const handleCourseExit = () => {
    // Save final progress before exiting
    if (courseData) {
      const progressData = {
        lastMaterial: activeMaterial,
        progress: progress,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(`course_${courseData.id}_progress`, JSON.stringify(progressData));
    }
    navigate('/courses');
  };

  if (loading) {
    return (
      <Container>
        <UserNavbar />
        <LoadingContainer>
          <p>Loading course content...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (!courseData) {
    return (
      <Container>
        <UserNavbar />
        <LoadingContainer>
          <p>Course not found. Please try another course.</p>
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <UserNavbar />
      <MainContainer>
        <CourseSidebar
          courseData={courseData}
          activeMaterial={activeMaterial}
          progress={progress}
          onMaterialClick={handleMaterialClick}
          onExit={handleCourseExit}
          lastVisited={lastVisited}
        />
        <CourseContent
          materialContent={materialContent[activeMaterial]}
          activeMaterial={activeMaterial}
          courseData={courseData}
          onPrev={handlePrev}
          onNext={handleNext}
          isFirst={activeMaterial === 0}
          isLast={activeMaterial === courseData.materials.length - 1}
          progress={progress}
        />
      </MainContainer>
    </Container>
  );
};

export default Course;
