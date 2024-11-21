import styled from "styled-components";

//video
import VIDEO from "../assets/video/working.mov"

// Container for the Demo Section
const DemoContainer = styled.div`
  width: 100%;
  margin: 50px 0;
  text-align: center;
`;

const DemoTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 30px;
`;

const VideoWrapper = styled.div`
  width: 100%;
  max-width: 1200px; // Increased container size (adjust as needed)
  margin: 0 auto;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
`;

const DemoVideo = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

const DemoSection = () => {
  return (
    <DemoContainer>
      <DemoTitle>Watch VidyaAI in Action</DemoTitle>
      <VideoWrapper>
        <DemoVideo
          src={VIDEO}
          loop
          muted
          autoPlay
          playsInline
          controls={false}
          playbackRate={2} // 2x speed
        />
      </VideoWrapper>
    </DemoContainer>
  );
};

export default DemoSection;
