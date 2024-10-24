import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 70px;
  background: #1a1a1a;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 26px;
  margin: 0;
  color: #e0e0e0;
`;

const ItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Item = styled(Link)`
  font-size: 18px;
  color: #e0e0e0;
  text-decoration: none; /* Remove underline from links */

  &:hover {
    color: #f3f3f3;
    text-decoration: underline;
  }
`;

const Button = styled(Link)`
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  text-decoration: none; /* Remove underline from links */
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;
  color: #e0e0e0;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none; 
  flex-direction: column;
  position: absolute;
  top: 70px; 
  left: 0;
  width: 100%;
  background: #1a1a1a; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
  padding: 10px 0px;
  z-index: 100;
  @media (max-width: 768px) {
    display: flex; 
    gap: 10px;
  }
`;

const MobileItem = styled(Item)`
  padding: 10px 20px; 
  text-align: center; 
`;

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Container>
      <LogoContainer>
        <Logo>Vidya AI</Logo>
      </LogoContainer>
      <ItemsContainer>
        <Item to="/">Home</Item>
        <Item to="/resources">Resources</Item>
        <Item to="/contact">Contact Us</Item>
        <Button
          to="/login"
          style={{
            background: '#e6195e',
            color: '#f3f3f3', 
          }}
        >
          Log In
        </Button>
        <Button
          to="/signup"
          style={{
            background: '#f3e6eb', 
            color: '#1a1a1a', 
          }}
        >
          Sign Up
        </Button>
      </ItemsContainer>
      <MenuIcon onClick={toggleMobileMenu}>☰</MenuIcon>
      {isMobileMenuOpen && (
        <MobileMenu>
          <MobileItem to="/">Home</MobileItem>
          <MobileItem to="/resources">Resources</MobileItem>
          <MobileItem to="/contact">Contact Us</MobileItem>
          <Button
            to="/login"
            style={{
              background: '#e6195e',
              color: '#f3f3f3',
            }}
          >
            Log In
          </Button>
          <Button
            to="/signup"
            style={{
              background: '#f3e6eb',
              color: '#1a1a1a',
            }}
          >
            Sign Up
          </Button>
        </MobileMenu>
      )}
    </Container>
  );
}

export default Navbar;
