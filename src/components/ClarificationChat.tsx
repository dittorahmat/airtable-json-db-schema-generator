import React from 'react';

interface ClarificationChatProps {
  messages: { role: 'user' | 'ai'; content: string }[];
}

const ClarificationChat: React.FC<ClarificationChatProps> = ({ messages }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-md ${
              message.role === 'user' ? 'bg-gray-100' : 'bg-blue-100'
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClarificationChat;