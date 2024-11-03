import { useEffect, useState, useRef } from "react"; // Import useRef
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Markdown from "react-markdown";

// services
import { getUser } from "../services/userService";
import { generateAIResponse } from "../services/aiService";

// components
import UserNavbar from "../components/UserNavbar";

// Styled Components
const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #121212; /* Very dark background for overall page */
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
  color: #e0e0e0; /* Light text for readability */
`;

const LoadingIndicator = styled.div`
  color: #e0e0e0;
  text-align: center;
  padding: 20px;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 0; /* Padding top and bottom */
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 80%; /* Limit message width */
  margin-left: ${({ isUser }) => (isUser ? 'auto' : '0')}; /* Align user messages to the right */
  margin-right: ${({ isUser }) => (isUser ? '0' : 'auto')}; /* Align AI messages to the left */
`;

const Message = styled.div`
  background-color: ${({ isUser }) => (isUser ? "#1e88e5" : "#333345")}; /* Darker, eye-pleasing shades */
  color: ${({ isUser }) => (isUser ? "white" : "#e0e0e0")};
  padding: 12px 18px;
  border-radius: 18px;
  flex: 1; /* Allow message to take full width */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
`;

const ProfileInitials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px; /* Smaller width */
  height: 24px; /* Smaller height */
  border-radius: 50%;
  background-color: #2b2b3d; /* Darker color for initials */
  color: #d1d1d1;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px; /* Smaller font size */
`;

const ProfilePhoto = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #d1d1d1;
  object-fit: cover;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #2b2b3d; /* Darker input background */
  border-top: 1px solid #444455;
`;

const InputField = styled.input`
  flex: 1;
  padding: 12px;
  background-color: #33334d; /* Dark input field */
  border: 1px solid #555566;
  border-radius: 18px;
  color: #e0e0e0; /* Light text for input */
  outline: none;
  margin-right: 10px;

  &::placeholder {
    color: #a0a0b2; /* Placeholder color */
  }
`;

const SendButton = styled.button`
  background-color: #4f7ef3; /* Button color */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3b62c1; /* Darker shade on hover */
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  color: #e0e0e0; /* Light text for readability */
  padding: 10px;
  font-size: 14px;

  &::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #e0e0e0;
    margin-left: 5px;
    animation: blink 1s infinite alternate;
  }

  @keyframes blink {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;


const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([
    { text: "Welcome to VidyaAI!", isUser: false },
  ]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false); // State for typing effect
  const messagesEndRef = useRef(null); // Ref to scroll to the end of messages

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = await getUser();
        setUserInfo(user);
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to fetch user information.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  useEffect(() => {
    // Scroll to the bottom of the messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessage = { text: userMessage, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage("");

    // Show typing effect
    setIsTyping(true);

    try {
      const response = await generateAIResponse(userMessage); // Call the createResponse function
      // Add AI response to messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.response, isUser: false }, // Add AI response to messages
      ]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Failed to get response from AI.", isUser: false },
      ]);
    } finally {
      setIsTyping(false); // Stop the typing effect
    }
  };


  // If loading, show only the navbar and loading message
  if (loading) {
    return (
      <HomeWrapper>
        <UserNavbar userInfo={userInfo} />
        <ChatContainer>
          <LoadingIndicator>Loading user information...</LoadingIndicator>
        </ChatContainer>
      </HomeWrapper>
    );
  }

  // If there is an error, show the error message
  if (error) {
    return (
      <HomeWrapper>
        <UserNavbar userInfo={userInfo} />
        <ChatContainer>
          <LoadingIndicator>{error}</LoadingIndicator>
        </ChatContainer>
      </HomeWrapper>
    );
  }

  return (
    <HomeWrapper>
      <UserNavbar userInfo={userInfo} />
      <ChatContainer>
        <MessageContainer>
          {messages.map((msg, index) => (
            <MessageWrapper key={index} isUser={msg.isUser}>
              {msg.isUser ? (
                <>
                  <Message isUser={msg.isUser}>{msg.text}</Message>
                  {userInfo ? (
                    userInfo.profilePicture ? (
                      <ProfilePhoto src={userInfo.profilePicture} alt="Profile" />
                    ) : (
                      <ProfileInitials>
                        {userInfo.username.charAt(0)}
                      </ProfileInitials>
                    )
                  ) : null}
                </>
              ) : (
                <>
                  <ProfileInitials>
                    AI
                  </ProfileInitials>
                  <Message isUser={msg.isUser}><Markdown>{msg.text}</Markdown></Message>
                </>
              )}
            </MessageWrapper>
          ))}
          {isTyping && (
            <MessageWrapper isUser={false}>
              <ProfileInitials>AI</ProfileInitials>
              <TypingIndicator>AI is typing...</TypingIndicator>
            </MessageWrapper>
          )}
          <div ref={messagesEndRef} /> {/* Scroll target */}
        </MessageContainer>

      </ChatContainer>
      <InputContainer>
        <InputField
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </HomeWrapper>
  );
};

export default Home;
