import styled from "styled-components";

const CardContainer = styled.div`
  background: #282828;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.2s;
  width: calc(25% - 20px);
  max-width: 300px;
  height: 250px;
  cursor: pointer;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  color: #e0e0e0;
  margin: 0 0 5px;
`;

const Description = styled.p`
  font-size: 12px;
  color: #f0f0f0;
  margin: 0;
`;

const FeatureCard = ({ title, description, img }) => {
  return (
    <CardContainer>
      <CardImage src={img} alt={title} />
      <CardContent>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </CardContent>
    </CardContainer>
  );
};

export default FeatureCard;
