import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 

const Container = styled.div`
  width: 100%;
  height: 70px;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: #e6195e;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e6195e; 
  color: #d1d1d1;
  font-size: 1em;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
`;

const ProfilePhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #d1d1d1;
  object-fit: cover;
  cursor: pointer; /* Make the profile photo clickable */
`;

const UserNavbar = ({ userInfo }) => {
  const navigate = useNavigate(); 

  const handleClickLogo = () => {
    navigate("/"); 
  };

  const handleClickProfile = () => {
    navigate("/profile");  // Navigate to profile page
  };

  return (
    <Container>
      <LogoContainer>
        <Logo onClick={handleClickLogo}>VidyaAI</Logo>
      </LogoContainer>
      {userInfo && userInfo.profilePicture ? (
        <ProfilePhoto 
          src={userInfo.profilePicture} 
          alt="Profile" 
          onClick={handleClickProfile}  // Add click handler to navigate to profile
        />
      ) : (
        <ProfileContainer onClick={handleClickProfile}> 
          {userInfo ? userInfo.username.charAt(0) : "V"} 
        </ProfileContainer>
      )}
    </Container>
  );
};

export default UserNavbar;
