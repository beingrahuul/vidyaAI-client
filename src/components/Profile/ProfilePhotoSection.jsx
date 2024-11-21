import React from 'react';
import SectionContainer from './SectionContainer';
import styled from 'styled-components';

const ProfilePhoto = styled.img`
  min-width: 100px;
  min-height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #f5f5f5;
`;

const ProfileInitialContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #1e90ff;
  color: #f5f5f5;
  font-size: 1.5em;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`;

const PhotoUploadButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  button {
    padding: 10px 15px;
    border: none;
    background-color: #1e90ff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #007acc;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px #66b3ff;
    }
  }
`;

const ProfilePhotoSection = ({ user }) => {
  return (
    <SectionContainer>
      <h2>Your Photo</h2>
      {user && user.profilePicture ? (
        <ProfilePhoto src={user.profilePicture || '/default-profile.png'} alt="User Photo" />
      ) : (
        <ProfileInitialContainer>{user.username.charAt(0).toUpperCase()}</ProfileInitialContainer>
      )}

      <PhotoUploadButtons>
        <button>Upload New</button>
        <button>Save</button>
      </PhotoUploadButtons>
    </SectionContainer>
  );
};

export default ProfilePhotoSection;
