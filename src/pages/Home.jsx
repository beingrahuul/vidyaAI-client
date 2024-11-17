import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import MarkdownMessage from "../components/MarkdownMessage/MarkdownMessage";

// services
import { getUser } from "../services/userService";
import { generateAIResponse, getChat } from "../services/aiService";

// components
import UserNavbar from "../components/UserNavbar";

// Styled Components
const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #121212;
`;

const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 20px;
  color: #e0e0e0;
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
  padding: 10px 0;
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  max-width: 80%;
  margin-left: ${({ isUser }) => (isUser ? 'auto' : '0')};
  margin-right: ${({ isUser }) => (isUser ? '0' : 'auto')};
`;

const Message = styled.div`
  background-color: ${({ isUser }) => (isUser ? "#1e88e5" : "#333345")};
  color: ${({ isUser }) => (isUser ? "white" : "#e0e0e0")};
  padding: 12px 18px;
  border-radius: 18px;
  flex: 1;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const ProfileInitials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #2b2b3d;
  color: #d1d1d1;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 12px;
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
  background-color: #2b2b3d;
  border-top: 1px solid #444455;
`;

const InputField = styled.input`
  flex: 1;
  padding: 12px;
  background-color: #33334d;
  border: 1px solid #555566;
  border-radius: 18px;
  color: #e0e0e0;
  outline: none;
  margin-right: 10px;

  &::placeholder {
    color: #a0a0b2;
  }
`;

const SendButton = styled.button`
  background-color: #4f7ef3;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3b62c1;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  color: #e0e0e0;
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
  const [messages, setMessages] = useState([{ text: "", isUser: false }]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = await getUser();
        setUserInfo(user);
        
        // Fetch chat history
        const chatHistory = await getChat();
        if (chatHistory?.history) {
          // Map retrieved chat history into messages format
          const formattedMessages = chatHistory.history.map((msg) => ({
            text: msg.text,
            isUser: msg.role === "user",
          }));
          setMessages(formattedMessages);
        }
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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessage = { text: userMessage, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage("");

    setIsTyping(true);

    try {
      const response = await generateAIResponse(userMessage); 
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.response, isUser: false },
      ]);
    } catch (error) {
      console.error("Error generating AI response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Failed to get response from AI.", isUser: false },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

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
                  <ProfileInitials>AI</ProfileInitials>
                  <Message isUser={msg.isUser}><MarkdownMessage content={msg.text} /></Message>
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
          <div ref={messagesEndRef} />
        </MessageContainer>
      </ChatContainer>
      <InputContainer>
        <InputField
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents newline in input
              handleSendMessage();
            }
          }}
        />
        <SendButton onClick={handleSendMessage}>Send</SendButton>
      </InputContainer>
    </HomeWrapper>
  );
};

export default Home;