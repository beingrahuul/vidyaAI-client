import styled from "styled-components";
import BANNER from "../assets/banner-back.png";

const Container = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  border: 5px solid #e6195e;
  border-radius: 20px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 250px; /* Adjust height for mobile */
  }
`;

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: url(${BANNER}) no-repeat center center;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  color: #f0f0f0;
  text-align: center;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    padding: 10px; /* Reduced padding for mobile */
  }
`;

const Title = styled.h1`
  font-size: 60px;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 32px; /* Adjust font size for mobile */
  }
`;

const Subtitle = styled.p`
  font-size: 20px;
  font-weight: normal;
  margin: 10px 0 0;

  @media (max-width: 768px) {
    font-size: 14px; /* Adjust font size for mobile */
  }
`;

const Button = styled.div`
  background-color: #e6195e;
  color: #f3f3f3;
  width: 200px;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  margin-top: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d51c50;
  }

  @media (max-width: 768px) {
    width: 120px; /* Adjust button width for mobile */
    font-size: 12px; /* Adjust font size for mobile */
  }
`;

const Banner = () => {
  return (
    <Container>
      <Background />
      <Overlay />
      <Content>
        <Title>Welcome to Vidya AI!</Title>
        <Subtitle>Your one-stop solution for personalized study plans.</Subtitle>
        <Subtitle>Prepare for UPSE, NEET, and JEE with confidence.</Subtitle>
        <Button>Create Account</Button>
      </Content>
    </Container>
  );
}

export default Banner;
