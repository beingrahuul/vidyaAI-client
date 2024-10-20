import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Features from '../components/Features';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #121212; /* Dark background for the container */
  color: #e0e0e0; /* Light text color */
  min-height: 100vh; /* Full height to cover the viewport */
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
  return (
    <Container>
      <Navbar />
      <Main>
        <Banner />
        <Features />
      </Main>
    </Container>
  );
};

export default Landing;
