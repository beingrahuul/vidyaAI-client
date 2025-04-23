import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Components
import UserNavbar from "../components/UserNavbar";
import MarkdownMessage from "../components/MarkdownMessage/MarkdownMessage"; // Import cleaned component

// Services
import { getUser } from "../services/userService";
import { generateAIResponse, getChat } from "../services/aiService"; // Assuming getChat is in aiService

// Styled Components (Keep your existing styles)
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
  /* Adjust max-width to give some space on larger screens, but allow flexibility */
  max-width: 80%; /* Increased max-width slightly */
  width: fit-content; /* Allow message bubble to shrink to content */
  margin-left: ${({ isUser }) => (isUser ? 'auto' : '0')};
  margin-right: ${({ isUser }) => (isUser ? '0' : 'auto')};
`;

const Message = styled.div`
  /* Removed padding and border-radius here, will be applied inside MarkdownMessage */
  /* background-color and color will be handled by the inner components for AI messages */
  /* User messages can keep their styling */
  background-color: ${({ isUser }) => (isUser ? "#1e88e5" : "")}; /* AI message background is transparent here */
  color: ${({ isUser }) => (isUser ? "white" : "inherit")}; /* AI message color is handled by inner component */
  padding: ${({ isUser }) => (isUser ? "10px 15px" : "0px")}; /* Keep padding for user messages */
  border-radius: ${({ isUser }) => (isUser ? "18px" : "0px")}; /* Keep border-radius for user messages */
  flex: 1;
  box-shadow: ${({ isUser }) => (isUser ? "0px 4px 8px rgba(0, 0, 0, 0.2)" : "none")}; /* Keep shadow for user messages */
  min-width: 0; /* Allow flex item to shrink */
`;

const ProfileInitials = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px; /* Increased size slightly */
  height: 30px; /* Increased size slightly */
  border-radius: 50%;
  background-color: #ff0000;
  color: #d1d1d1;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px; /* Increased font size */
  flex-shrink: 0; /* Prevent shrinking */
`;

const ProfilePhoto = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #d1d1d1;
  object-fit: cover;
  flex-shrink: 0; /* Prevent shrinking */
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

  &:disabled {
      background-color: #666;
      cursor: not-allowed;
  }
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  color: #e0e0e0;
  padding: 10px;
  font-size: 14px;
  background-color: #333345; /* Match AI message background */
  border-radius: 18px; /* Match message bubble border radius */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Match message bubble shadow */


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

const Chat = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  // messages state will store objects with { type, content, isUser }
  const [messages, setMessages] = useState([]); // Start with empty array
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
      // Only add a welcome message if messages are empty and not loading
      if (!loading && messages.length === 0 && userInfo?.hasBasicQuestionsAnswered) {
           setMessages([{ text: "Hi there! How can I help you with your NEET preparation today?", isUser: false, type: 'text' }]);
      }

  }, [loading, messages.length, userInfo]);


  useEffect(() => {
    const fetchUserInfoAndChat = async () => {
      setLoading(true);
      setError(null);
      try {
        const user = await getUser();
        setUserInfo(user);

        // Fetch chat history
        const chatHistory = await getChat();
        if (chatHistory?.history) {

          const formattedMessages = chatHistory.history.map((msg) => {
             return {
                text: msg.text, // Keep text for placeholder or regular message
                isUser: msg.role === "user",
                type: 'text', // All historical AI messages are text now
             };
          });
          setMessages(formattedMessages);
        } else {
             // If no history and onboarding is complete, show initial welcome
             if (user?.hasBasicQuestionsAnswered) {
                  setMessages([{ text: "Hi there! How can I help you with your NEET preparation today?", isUser: false, type: 'text' }]);
             }
        }

      } catch (error) {
        console.error("Error fetching user info or chat:", error);
        if (error.message === "Unauthorized or Forbidden. Please log in." || error.message === "Authentication token missing.") {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          setError("Failed to load chat.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfoAndChat();
  }, [navigate]);


  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to handle sending the message to the backend
  const handleSendMessage = async (msg) => {
    if (!msg.trim() || isTyping) return; // Prevent sending empty messages or while typing

    const newMessage = { text: msg, isUser: true, type: 'text' }; // User messages are always text
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserMessage(""); // Clear input field

    setIsTyping(true); // Show typing indicator

    try {
      const responseParts = await generateAIResponse(msg);
      console.log("Received AI response parts:", responseParts);

      // --- Process the array of response parts ---
      if (Array.isArray(responseParts)) {
          // Check if any part indicates onboarding completion *before* updating state
          const onboardingCompletePart = responseParts.find(part => part.onboardingComplete !== undefined);
          if (onboardingCompletePart && onboardingCompletePart.onboardingComplete === true) {
               console.log("Onboarding reported as complete. Refetching user info.");
               const updatedUser = await getUser(); // Await is now in the async handleSendMessage function
               setUserInfo(updatedUser);
          }

          // Now update the messages state
          setMessages(prevMessages => {
              let updatedMessages = [...prevMessages];
              responseParts.forEach(part => {
                  // In this new flow, we expect primarily 'text' type parts
                  // If other types are received, log a warning or handle as text fallback
                  if (part.type === 'text') {
                      updatedMessages.push({ text: part.content || part.text, isUser: false, type: 'text' });
                  } else {
                       console.warn(`Received unexpected response part type: ${part.type}. Treating as text.`);
                       // Fallback to treating unexpected types as text
                       updatedMessages.push({ text: part.content || part.text || JSON.stringify(part), isUser: false, type: 'text' });
                  }
              });
              return updatedMessages;
          });

      } else {
           // Fallback for unexpected response format (not an array)
           console.error("Received unexpected response format from AI (not an array):", responseParts);
           setMessages((prevMessages) => [
             ...prevMessages,
             { text: "Received an unexpected response format from AI.", isUser: false, type: 'text' },
           ]);
      }
      // --- END Processing ---


    } catch (error) {
      console.error("Error generating AI response:", error);
      // Check if the error is due to authentication and redirect
      if (error.message === "Unauthorized or Forbidden. Please log in." || error.message === "Authentication token missing.") {
           localStorage.removeItem("token");
           navigate("/login");
           return; // Stop further processing
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: error.message || "Failed to get response from AI. Please try again.", isUser: false, type: 'text' }, // Display error message from service
      ]);
    } finally {
      setIsTyping(false); // Hide typing indicator
    }
  };

  if (loading) {
    return (
      <HomeWrapper>
        <UserNavbar userInfo={userInfo} />
        <ChatContainer>
          <LoadingIndicator>Loading chat...</LoadingIndicator>
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
          {/* Render messages based on their type */}
          {messages.map((msg, index) => (
            // Using index as key is acceptable if list items are not reordered, added/removed in the middle
            // For better performance and stability, consider adding a unique ID to each message object
            <MessageWrapper key={index} isUser={msg.isUser}>
              {msg.isUser ? (
                // Render user message
                <>
                  <Message isUser={msg.isUser}>{msg.text}</Message>
                  {userInfo ? (
                    userInfo.profilePicture ? (
                      <ProfilePhoto src={userInfo.profilePicture} alt="Profile" />
                    ) : (
                      <ProfileInitials>
                        {userInfo.username ? userInfo.username.charAt(0) : 'U'} {/* Handle potential null username */}
                      </ProfileInitials>
                    )
                  ) : null}
                </>
              ) : (
                // Render AI message based on type
                <>
                  <ProfileInitials>AI</ProfileInitials>
                  <Message isUser={msg.isUser}>
                      {/* In this new flow, we only expect text messages from the AI in the chat */}
                      {/* Quiz messages will be handled on a separate page */}
                      <MarkdownMessage content={msg.text} />
                  </Message>
                </>
              )}
            </MessageWrapper>
          ))}
          {/* Typing indicator */}
          {isTyping && (
            <MessageWrapper isUser={false}>
              <ProfileInitials>AI</ProfileInitials>
              <TypingIndicator>AI is typing...</TypingIndicator>
            </MessageWrapper>
          )}
          <div ref={messagesEndRef} /> {/* Scroll anchor */}
        </MessageContainer>
      </ChatContainer>
      {/* Input field and send button */}
      <InputContainer>
        <InputField
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSendMessage(userMessage);
            }
          }}
          disabled={isTyping} // Disable input while AI is typing
        />
        <SendButton onClick={() => handleSendMessage(userMessage)} disabled={isTyping}>
            Send
        </SendButton>
      </InputContainer>
    </HomeWrapper>
  );
};

export default Chat;
