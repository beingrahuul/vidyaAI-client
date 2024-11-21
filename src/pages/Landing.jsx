import React, { useRef } from 'react';
import styled from 'styled-components';

//components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import DemoSection from '../components/DemoSection';
import AboutSection from '../components/AboutSection';
import FAQSection from '../components/FAQSection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #121212; 
  color: #e0e0e0;
  min-height: 100vh;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 90%;
  gap: 20px;
  margin-top: 20px;
`; 

const Landing = () => {
  const aboutSectionRef = useRef(null);

  const handleLearnMore = () => {
    console.log(aboutSectionRef);
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  

  return (
    <Container>
      <Navbar />
      <Banner handleLearnMore={handleLearnMore} />
      <Main>
        <Features />
        <HowItWorks />
        <DemoSection />
        <AboutSection ref={aboutSectionRef} />
        <FAQSection />
      </Main>
      <Footer />
    </Container>
  );
};

export default Landing;
