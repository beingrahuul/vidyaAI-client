import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: #f9fafb;
  font-family: 'Inter', sans-serif;
  height: 100%;
  overflow-y: auto;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 80px; /* Space for fixed footer */
`;

export const ContentContainer = styled.div`
  color: #374151;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1rem;
  /* padding-bottom: 80px; Remove or adjust if quiz/special content has its own padding */
  position: relative;
`;

export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

export const ContentTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

export const CompletionButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: ${props => props.completed ? '#059669' : '#4f46e5'};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${props => props.completed ? '#047857' : '#4338ca'};
  }
   &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    margin-right: ${props => props.completed ? '0' : '0.5rem'};
    margin-left: ${props => props.completed ? '0.5rem' : '0'};
  }
`;

export const PlaceholderText = styled.p`
  font-size: 1.1rem;
  color: #6b7280;
  text-align: center;
  margin-top: 3rem;
`;

// Navigation Footer - fixed to the bottom
export const NavigationFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  width: 1150px; /* Adjust width as needed */
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  right: 0; /* Or adjust to center/left depending on overall layout */
  z-index: 10;
  background-color: #ffffff; /* Add background for visibility */
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05); /* Add shadow */
`;

export const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.3rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;
  box-shadow: 0 2px 4px rgba(79, 70, 229, 0.2);

  &:hover:not(:disabled) {
    background-color: #4338ca;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(79, 70, 229, 0.3);
  }

  &:disabled {
    background-color: #a5b4fc;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  svg {
    margin-right: ${props => (props.iconPosition === 'left' ? '0.5rem' : '0')};
    margin-left: ${props => (props.iconPosition === 'right' ? '0.5rem' : '0')};
  }
`;