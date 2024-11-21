import React, { useState } from 'react';
import styled from 'styled-components';

// components
import SectionContainer from './SectionContainer';

// service
import { updateBio } from "../../services/aiService";

const BioTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #333;
  color: #f5f5f5;
  resize: none;
  font-size: 16px;
`;

const UpdateButton = styled.button`
  margin-top: 10px;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #555;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  margin-top: 10px;
`;

const BioSection = ({ bio }) => {
  const [newBio, setNewBio] = useState(bio || ""); // Initialize with current bio
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUpdateBio = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      console.log('Updating bio:', newBio);

      // Call the API to update the bio
      const data = await updateBio(newBio);

      console.log('Updated bio:', data);
      alert('Bio updated successfully!'); // Notify the user of success
    } catch (error) {
      console.error('Error updating bio:', error);
      setError("Failed to update bio. Please try again."); // Display error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <SectionContainer>
      <h2>Bio</h2>
      <BioTextarea
        value={newBio}
        onChange={(e) => setNewBio(e.target.value)} // Update local state on change
        placeholder="Write or update your bio here..."
      />
      <UpdateButton onClick={handleUpdateBio} disabled={isLoading || !newBio.trim()}>
        {isLoading ? "Updating..." : "Update Bio"}
      </UpdateButton>
      {error && <ErrorText>{error}</ErrorText>} {/* Display error message */}
    </SectionContainer>
  );
};

export default BioSection;
