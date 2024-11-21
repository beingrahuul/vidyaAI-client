import styled from 'styled-components';

const SectionContainer = styled.section`
  padding: 20px;
  background-color: #2c2c2c;
  border-radius: 10px;
  border: 2px solid #444; /* Border around the section */
  margin-bottom: 20px;
  color: #f5f5f5;
  
  h2 {
    font-size: 22px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  button {
    padding: 10px 15px;
    background-color: #1e90ff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;

    &:hover {
      background-color: #007acc;
    }
  }
`;

export default SectionContainer;
