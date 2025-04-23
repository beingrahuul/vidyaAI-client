import React from 'react';
import styled from 'styled-components';

const NavigationContainer = styled.nav`
  display: flex;
  margin: 10px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const NavItem = styled.a`
  padding: 10px 20px;
  margin-right: 10px;
  text-decoration: none;
  color: #555;
  font-weight: ${props => (props.active ? '600' : '400')};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => (props.active ? '#6366f1' : 'transparent')};
  }

  &:hover {
    color: #6366f1;
  }
`;

const Badge = styled.span`
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 2px 6px;
  font-size: 12px;
  margin-left: 5px;
`;

const Navigation = ({ activeNav, setActiveNav }) => {
  return (
    <NavigationContainer>
      <NavItem href="/home" active={activeNav === 'Home'} onClick={() => setActiveNav('Home')}>
        Home
      </NavItem>
      <NavItem href="/learning" active={activeNav === 'Learning'} onClick={() => setActiveNav('Learning')}>
        My Learning
      </NavItem>
      <NavItem href="/quiz" active={activeNav === 'Quiz'} onClick={() => setActiveNav('Quiz')}>
        Quiz
      </NavItem>
      <NavItem href="#" active={activeNav === 'Favorites'} onClick={() => setActiveNav('Favorites')}>
        Favorites <Badge>1</Badge>
      </NavItem>
    </NavigationContainer>
  );
};

export default Navigation;
