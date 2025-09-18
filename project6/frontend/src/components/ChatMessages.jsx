import React from 'react';

const ChatMessages = ({ messages }) => (
  <div className="w-full h-full max-h-[60vh] overflow-y-auto px-4 py-6 space-y-4">
    {messages.map((msg, idx) => (
      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
        <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg shadow ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
          <div className="text-xs font-semibold mb-1">
            {msg.sender === 'user' ? 'User' : 'NamkeenAI'}
          </div>
          {msg.text}
        </div>
      </div>
    ))}
  </div>
);

export default ChatMessages;
