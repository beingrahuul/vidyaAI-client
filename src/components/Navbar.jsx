// Navbar.jsx - For guests/non-authenticated users
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  color: #e6195e;
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


const AuthButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
`;

const LoginButton = styled(Button)`
  background: transparent;
  border: 1px solid #e6195e;
  color: #e6195e;
  
  &:hover {
    background-color: rgba(99, 102, 241, 0.1);
  }
`;

const SignupButton = styled(Button)`
  background-color: #e6195e;
  border: 1px solid #e6195e;
  color: white;
  
  &:hover {
    background-color: #e42867;
  }
`;

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <Header>
      <Logo onClick={handleLogoClick}>
        <LogoText>VidyaAI</LogoText>
      </Logo>
      
      <HeaderRight>
        <AuthButtons>
          <LoginButton onClick={handleLoginClick}>Log in</LoginButton>
          <SignupButton onClick={handleSignupClick}>Sign up</SignupButton>
        </AuthButtons>
      </HeaderRight>
    </Header>
  );
};

export default Navbar;