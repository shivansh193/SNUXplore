"use client";
import { useState } from 'react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { text: 'Welcome to the Gemini-powered chat!', sender: 'bot' },
    { text: 'How can I assist you today?', sender: 'bot' },
    { text: 'I need help with integrating the Gemini API.', sender: 'user' },
    { text: 'Sure, let me walk you through it!', sender: 'bot' },
  ]);

  const sendMessage = (text: any) => {
    setMessages([...messages, { text, sender: 'user' }]);
    // You can simulate bot responses or integrate Gemini API here
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: 'This is a response from Gemini!', sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Chat Header */}
      <div className="w-full h-fit py-4 px-6 text-3xl text-white flex flex-row items-center font-nohemi-semibold space-x-4 bg-gray-800 shadow-md">
        <img src={"/s.svg"} className="w-12 h-12" alt="SNUXplore Logo" />
        <span>SNUXplore</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-yellow-500 text-black'
                  : 'bg-black text-yellow-500'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Pre-filled Prompt Buttons */}
      <div className="p-4 bg-gray-800 space-x-2 flex justify-center items-center">
        <button
          onClick={() => sendMessage('Can you recommend something?')}
          className="bg-yellow-500 text-black px-3 py-2 rounded-lg shadow hover:bg-yellow-400 transition duration-200"
        >
          Recommend Something
        </button>
        <button
          onClick={() => sendMessage('Show me trending topics')}
          className="bg-yellow-500 text-black px-3 py-2 rounded-lg shadow hover:bg-yellow-400 transition duration-200"
        >
          Trending Topics
        </button>
        <button
          onClick={() => sendMessage('Help with Gemini API')}
          className="bg-yellow-500 text-black px-3 py-2 rounded-lg shadow hover:bg-yellow-400 transition duration-200"
        >
          Gemini API Help
        </button>
      </div>

      {/* Message Input */}
      <div className="bg-gray-800 p-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 bg-gray-700 text-white p-3 rounded-lg focus:outline-none"
        />
        <button
          onClick={() => sendMessage('Custom message sent')}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-400 transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
