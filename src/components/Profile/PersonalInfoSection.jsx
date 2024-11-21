import React from 'react';
import SectionContainer from './SectionContainer';  // Import the new SectionContainer styled component
import styled from 'styled-components';

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #f5f5f5;
  }

  input {
    padding: 10px;
    border: 1px solid #444;
    border-radius: 5px;
    background-color: #333;
    color: #f5f5f5;
    width: 100%;
  }
`;

const PersonalInfoSection = ({ name, setName, email, setEmail, mobile, setMobile, role, setRole, handleSubmitPersonalInfo }) => {
  return (
    <SectionContainer>
      <h2>Personal Information</h2>
      <InfoGroup>
        <label>Full Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </InfoGroup>
      <InfoGroup>
        <label>Email address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </InfoGroup>
      <InfoGroup>
        <label>Mobile number</label>
        <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      </InfoGroup>
      <InfoGroup>
        <label>Role</label>
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
      </InfoGroup>
      <button onClick={handleSubmitPersonalInfo}>Save Personal Info</button>
    </SectionContainer>
  );
};

export default PersonalInfoSection;
