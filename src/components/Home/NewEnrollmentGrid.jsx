import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { fetchAllStudyGuides } from '../../services/learningService.js';
import { Link } from 'react-router-dom';

// Components
import CourseCard from '../CourseCard.jsx';

const NewEnrollmentGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 20px;
  margin-top: 20px;
`;

const NewEnrollmentGrid = () => {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllStudyGuides();
        setEnrollmentData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '300px' 
    }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '4px solid #e5e7eb', 
          borderTopColor: '#6366f1', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }} />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <p style={{ marginTop: '12px', color: '#6b7280' }}>Loading enrollments...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#fee2e2', 
      color: '#b91c1c', 
      borderRadius: '8px', 
      margin: '20px',
      textAlign: 'center' 
    }}>
      <p style={{ fontWeight: 'bold' }}>Error loading enrollments</p>
      <p>{error}</p>
      <button 
        style={{ 
          marginTop: '10px', 
          padding: '8px 16px', 
          backgroundColor: '#ef4444', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer' 
        }}
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
    </div>
  );

  // Limit to showing only 3 enrollments
  const limitedEnrollments = enrollmentData.slice(0, 3);

  return (
    <>
      <NewEnrollmentGridContainer>
        {limitedEnrollments.length > 0 ? (
          limitedEnrollments.map((enrollment) => (
            <CourseCard
              key={enrollment._id || enrollment.topic}
              enrollment={enrollment}
            />
          ))
        ) : (
          <div style={{ 
            gridColumn: '1 / -1', 
            textAlign: 'center', 
            padding: '40px', 
            backgroundColor: '#f9fafb', 
            borderRadius: '12px', 
            color: '#6b7280' 
          }}>
            <p style={{ fontSize: '18px', marginBottom: '16px' }}>No enrollments available.</p>
            <p>Start your learning journey by exploring our courses.</p>
          </div>
        )}
      </NewEnrollmentGridContainer>
    </>
  );
};

export default NewEnrollmentGrid;