import React from 'react';

interface ChatBubbleProps {
  text: string;
  type: "inbound" | "outbound";
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, type }) => {
  const isOutbound = type === "outbound";

  const bubbleClasses = isOutbound
    ? "bg-blue-600 text-white rounded-tl-xl rounded-bl-xl rounded-tr-lg rounded-br-xl" 
    : "bg-gray-100 text-gray-900 rounded-tr-xl rounded-br-xl rounded-tl-lg rounded-bl-lg dark:bg-gray-700 dark:text-gray-100"; 
    
  return (
    <div className={`flex ${isOutbound ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`p-3 max-w-[80%] sm:max-w-xs md:max-w-md ${bubbleClasses}`}>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

export default ChatBubble;