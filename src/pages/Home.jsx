import "../styles/Home.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/userService";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = await getUser();
        setUserInfo(user);
        setShowWelcome(true);
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black font-sans p-4">
        {userInfo ? (
          <>
            <h1
              className={`text-5xl font-bold text-white mb-6 text-center ${
                showWelcome ? "typewriter" : ""
              }`}
            >
              Welcome, <span className="break-line">{userInfo.name}!</span>
            </h1>

            <div className="w-full max-w-3xl p-6 bg-gray-800 rounded-2xl shadow-xl border border-gray-700">
              <div className="max-h-[60vh] overflow-y-auto space-y-4 p-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-4 rounded-xl max-w-[75%] transform transition-transform duration-300 ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white shadow-md"
                          : "bg-gray-300 text-gray-800"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center mt-6 space-x-3 flex-col sm:flex-row">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-grow p-4 border border-gray-600 rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out bg-gray-700 text-white placeholder-gray-400 w-full"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                />
                <button
                  className="mt-3 sm:mt-0 px-6 py-3 bg-blue-600 text-white rounded-full font-medium transition-transform transform hover:scale-105 active:scale-95 shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
                  onClick={handleSend}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <h1 className="text-3xl font-semibold text-white">
            Loading user info...
          </h1>
        )}
      </div>
    </>
  );
};

export default Home;
