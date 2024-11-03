import React from "react";
import styled from "styled-components";

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #1e1e2f; /* Dark neutral background */
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const Logo = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #2b2b3d; /* Darker, neutral color for initials */
  color: #d1d1d1;
  font-size: 1em;
  font-weight: bold;
  text-transform: uppercase;
`;

const ProfilePhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #d1d1d1;
  object-fit: cover;
`;

const UserNavbar = ({ userInfo }) => (
  <NavbarContainer>
    <Logo>VidyaAI</Logo>
    {userInfo && userInfo.profilePicture ? (
      <ProfilePhoto src={userInfo.profilePicture} alt="Profile" />
    ) : (
      <ProfileContainer>
        {userInfo ? userInfo.username.charAt(0) : "V"}
      </ProfileContainer>
    )}
  </NavbarContainer>
);

export default UserNavbar;
