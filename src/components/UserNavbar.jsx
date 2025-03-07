import {useState} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; 


// Icons
import {SearchIcon, NotificationIcon } from "./icons"

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  background-color: white;
  width: 100%;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  color: #6366f1;
  cursor: pointer;
`;

const LogoText = styled.span`
  margin-left: 10px;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 8px 16px;
  width: 250px;
`;

const SearchInput = styled.input`
  border: none;
  background: transparent;
  margin-left: 10px;
  outline: none;
  width: 100%;
  font-size: 14px;
  &::placeholder {
    color: #aaa;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
  color: #666;
  
  &:hover {
    color: #6366f1;
  }
`;

const AskAIButton = styled.button`
  background-color: #f5f5f5;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  
  &:hover {
    background-color: #e9e9e9;
  }
`;

const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${props => props.bgColor || "#22c55e"};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  cursor: pointer;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserMenu = styled.div`
  position: absolute;
  top: 60px;
  right: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

const UserMenuItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;


const UserNavbar = ({ userInfo }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Get initials for avatar
  const getInitials = () => {
    console.log(userInfo);
    if (!userInfo || !userInfo.name) return "U";
    const nameParts = userInfo.name.split(" ");
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    return nameParts[0][0].toUpperCase();
  };

  const handleClickLogo = () => {
    navigate("/home");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickProfile = () => {
    navigate("/profile");
    setMenuOpen(false);
  };

  const handleClickSettings = () => {
    navigate("/settings");
    setMenuOpen(false);
  };

  const handleClickLogout = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <Header>
      <Logo onClick={handleClickLogo}>
        <LogoText>VidyaAI</LogoText>
      </Logo>

      <HeaderRight>
        <SearchBar>
          <SearchIcon />
          <SearchInput placeholder="Search..." />
        </SearchBar>

        <AskAIButton onClick={() => navigate("/chat")}>
          <span style={{ marginRight: '8px' }}>⚡</span>
          Ask AI
        </AskAIButton>

        <IconButton>
          <NotificationIcon />
          {userInfo?.notifications > 0 && (
            <NotificationBadge>{userInfo.notifications}</NotificationBadge>
          )}
        </IconButton>

        <UserAvatar 
          onClick={toggleMenu} 
          bgColor={userInfo?.avatarColor}
        >
          {getInitials()}
        </UserAvatar>

        <UserMenu isOpen={menuOpen}>
          <UserMenuItem onClick={handleClickProfile}>Profile</UserMenuItem>
          <UserMenuItem onClick={handleClickSettings}>Settings</UserMenuItem>
          <UserMenuItem onClick={handleClickLogout}>Logout</UserMenuItem>
        </UserMenu>
      </HeaderRight>
    </Header>
  );
};

export default UserNavbar;