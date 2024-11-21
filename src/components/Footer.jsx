import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const FooterContainer = styled.div`
  background: #1a1a1a;
  color: #ffffff;
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  text-align: center;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
`;

const FooterLink = styled(Link)`
  color: #e0e0e0;
  font-size: 1rem;
  text-decoration: none;

  &:hover {
    color: #e6195e;
    text-decoration: underline;
  }
`;

const SocialIconsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const SocialIcon = styled.a`
  color: #ffffff;
  font-size: 1.5rem;
  transition: color 0.3s;

  &:hover {
    color: #e6195e;
  }
`;

const SubscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 500px;
  width: 100%;

  p{
    color: #ffffff;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #444;
  border-radius: 5px;
  font-size: 1rem;
  color: #1a1a1a;
`;

const SubscribeButton = styled.button`
  background: #e6195e;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LinksContainer>
        <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink to="/terms-of-service">Terms of Service</FooterLink>
        <FooterLink to="/contact">Contact Us</FooterLink>
      </LinksContainer>
      <SocialIconsContainer>
        <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
          <FaFacebookF />
        </SocialIcon>
        <SocialIcon href="https://twitter.com" target="_blank" aria-label="Twitter">
          <FaTwitter />
        </SocialIcon>
        <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
          <FaInstagram />
        </SocialIcon>
        <SocialIcon href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
          <FaLinkedin />
        </SocialIcon>
      </SocialIconsContainer>
      <SubscriptionContainer>
        <p>Stay updated with VidyaAI!</p>
        <InputField type="email" placeholder="Enter your email" />
        <SubscribeButton>Subscribe</SubscribeButton>
      </SubscriptionContainer>
      <p style={{ fontSize: '0.9rem', color: '#ffffff' }}>
        &copy; {new Date().getFullYear()} VidyaAI. All rights reserved.
      </p>
    </FooterContainer>
  );
};

export default Footer;
