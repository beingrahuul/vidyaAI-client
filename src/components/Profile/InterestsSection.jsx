import React, { useState } from 'react';
import styled from 'styled-components';

// components
import SectionContainer from './SectionContainer';

//service
import { updateInterests } from "../../services/userService";

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

const Tag = styled.span`
  background-color: #444;
  padding: 8px 16px;
  border-radius: 25px;
  color: #f5f5f5;
  display: flex;
  align-items: center;
  font-size: 16px;
  transition: background-color 0.3s ease;
  gap: 10px;

  &:hover {
    background-color: #555;
  }
`;

const RemoveButton = styled.div`
  border: none;
  background: none;
  color: transparent;
  cursor: pointer;
  color: #ff6b6b;

  &:hover {
    color: #e74c3c;
  }

  &:before {
    content: '×';
  }
`;

const AddInterestButton = styled.button`
  background-color: #1e90ff;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007bff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  gap: 10px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
`;

const ModalInput = styled.input`
  padding: 8px;
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const ModalButton = styled.button`
  background-color: #1e90ff;
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #007bff;
  }
`;

const InterestsSection = ({ interests }) => {
  const [interestList, setInterestList] = useState(interests);
  const [showModal, setShowModal] = useState(false);
  const [newInterest, setNewInterest] = useState('');

  const handleRemoveInterest = (interestToRemove) => {
    setInterestList((prevInterests) =>
      prevInterests.filter((interest) => interest !== interestToRemove)
    );
  };

  const handleAddInterest = () => {
    if (newInterest && !interestList.includes(newInterest)) {
      setInterestList((prevInterests) => [...prevInterests, newInterest]);
      setNewInterest(''); // Reset input after adding
      setShowModal(false); // Close modal
    }
  };

  const handleSaveInterest = () => {
    try{
      updateInterests(interestList);
      console.log('Interests updated successfully');
    }catch(error){
      console.error(error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewInterest(''); // Reset input when closing modal
  };

  return (
    <SectionContainer>
      <h2>Interests</h2>
      <Tags>
        {interestList.map((interest, index) => (
          <Tag key={index}>
            {interest}
            <RemoveButton onClick={() => handleRemoveInterest(interest)} />
          </Tag>
        ))}
      </Tags>

      <ButtonContainer>
        <AddInterestButton onClick={() => setShowModal(true)}>Add Interest</AddInterestButton>
        <AddInterestButton onClick={handleSaveInterest}>Save Interest</AddInterestButton>
      </ButtonContainer>

      {showModal && (
        <ModalOverlay>
          <ModalContainer>
            <h3
              style={{
                marginBottom: '20px',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              Add New Interest
            </h3>
            <ModalInput
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Enter new interest"
            />
            <div>
              <ModalButton onClick={handleAddInterest}>Add</ModalButton>
              <ModalButton onClick={handleModalClose} style={{ marginLeft: '10px' }}>Cancel</ModalButton>
            </div>
          </ModalContainer>
        </ModalOverlay>
      )}
    </SectionContainer>
  );
};

export default InterestsSection;
