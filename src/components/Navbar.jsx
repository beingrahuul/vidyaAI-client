import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

const ItemsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Item = styled(Link)`
  font-size: 1rem;
  color: #ffffff;
  text-decoration: none;

  &:hover {
    color: #e6195e;
    text-decoration: underline;
  }
`;

const Button = styled(Link)`
  background: ${(props) => props.primary ? '#e6195e' : '#ffffff'};
  color: ${(props) => props.primary ? '#ffffff' : '#1a1a1a'};
  padding: 10px 20px;
  font-size: 0.9rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #ffffff;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.9);
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  padding: 20px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    display: flex;
    gap: 15px;
  }
`;

const MobileItem = styled(Item)`
  text-align: center;
  padding: 10px;
`;

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const naviate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClick = () => {
    naviate('/');
  }

  return (
    <Container>
      <LogoContainer>
        <Logo onClick={handleClick}>VidyaAI</Logo>
      </LogoContainer>
      <ItemsContainer>
        <Item to="/">Home</Item>
        <Item to="/contact">Contact Us</Item>
        <Button primary to="/login">Log In</Button>
        <Button to="/signup">Sign Up</Button>
      </ItemsContainer>
      <MenuIcon onClick={toggleMobileMenu}>☰</MenuIcon>
      {isMobileMenuOpen && (
        <MobileMenu>
          <MobileItem to="/">Home</MobileItem>
          <MobileItem to="/contact">Contact Us</MobileItem>
          <Button primary to="/login">Log In</Button>
          <Button to="/signup">Sign Up</Button>
        </MobileMenu>
      )}
    </Container>
  );
};

export default Navbar;
