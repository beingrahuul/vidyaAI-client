import React from 'react';
import styled from 'styled-components';

const ProfileHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #f5f5f5;
  }

  a {
    color: #1e90ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProfileHeader = () => {
  return (
    <ProfileHeaderContainer>
      <h1>Edit User Profile</h1>
    </ProfileHeaderContainer>
  );
};

export default ProfileHeader;
