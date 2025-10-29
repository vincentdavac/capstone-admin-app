import React, { useState } from "react";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';

const ADMIN_AVATAR = "https://i.pravatar.cc/150?img=50"; 
const RESIDENT_AVATAR_BASE = "https://i.pravatar.cc/150?img="; 
interface ChatListItem {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
}

interface Message {
  sender: string;
  text: string;
  type: "inbound" | "outbound";
  avatar?: string;
}

// Data for the Chat List on the left panel (Added 'id' for key)
const CHAT_LIST_DATA: ChatListItem[] = [
  { id: 1, name: "Coastal Resident 1", lastMessage: "Hello!", avatar: RESIDENT_AVATAR_BASE + "1" },
  { id: 2, name: "Coastal Resident 2", lastMessage: "Anyone to chat?", avatar: RESIDENT_AVATAR_BASE + "2" },
  { id: 3, name: "Coastal Resident 3", lastMessage: "I have a question...", avatar: RESIDENT_AVATAR_BASE + "3" },
  { id: 4, name: "Coastal Resident 4", lastMessage: "Hello...", avatar: RESIDENT_AVATAR_BASE + "4" },
  { id: 5, name: "Coastal Resident 5", lastMessage: "Can I ask?", avatar: RESIDENT_AVATAR_BASE + "5" },
];

const INITIAL_MESSAGE_HISTORY: Record<number, Message[]> = {
  1: [
    { sender: "Coastal Resident 1", text: "Hello! How can I check the water level in our area?", type: "inbound", avatar: RESIDENT_AVATAR_BASE + "1" },
    { sender: "Admin Account", text: "Hi! You can open the dashboard and click on the deployed buoy near your location. It shows live water level updates.", type: "outbound" },
    { sender: "Coastal Resident 1", text: "Thanks! Does it also notify us if the tide is too high?", type: "inbound", avatar: RESIDENT_AVATAR_BASE + "1" },
    { sender: "Admin Account", text: "Yes, you'll receive an SMS and an in-app notification if the buoy detects dangerous conditions.", type: "outbound" },
    { sender: "Coastal Resident 1", text: "Great! Can I also see past records of rainfall?", type: "inbound", avatar: RESIDENT_AVATAR_BASE + "1" },
    { sender: "Admin Account", text: "Absolutely. Just open the 'History' tab in the buoy details to view rainfall and temperature logs.", type: "outbound" },
  ],
  2: [
    { sender: "Coastal Resident 2", text: "Is the system working?", type: "inbound", avatar: RESIDENT_AVATAR_BASE + "2" },
    { sender: "Admin Account", text: "Yes, it is fully operational. How can I assist you?", type: "outbound" },
  ],
};

const ChatBubble: React.FC<{ text: string; type: "inbound" | "outbound" }> = ({ text, type }) => {
  const isOutbound = type === "outbound";

  const bubbleClasses = isOutbound
    ? "bg-blue-600 text-white rounded-tl-xl rounded-bl-xl rounded-tr-lg rounded-br-xl" // Admin (Blue)
    : "bg-gray-100 text-gray-900 rounded-tr-xl rounded-br-xl rounded-tl-lg rounded-bl-lg dark:bg-gray-700 dark:text-gray-100"; // Resident (Light Gray)
    
  return (
    <div className={`flex ${isOutbound ? 'justify-end' : 'justify-start'} w-full`}>
      <div className={`p-3 max-w-[80%] sm:max-w-xs md:max-w-md ${bubbleClasses}`}>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
};

const PendingChats: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<number>(CHAT_LIST_DATA[0].id);
  const selectedChat = CHAT_LIST_DATA.find(chat => chat.id === selectedChatId);

  const [messageHistory, setMessageHistory] = useState<Record<number, Message[]>>(INITIAL_MESSAGE_HISTORY);
  const currentMessages = messageHistory[selectedChatId] || [];

  const [newMessageText, setNewMessageText] = useState<string>('');

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault(); 

    if (newMessageText.trim() === '' || !selectedChat) return;

    const newMessage: Message = {
      sender: "Admin Account",
      text: newMessageText.trim(),
      type: "outbound",
    };

    setMessageHistory(prevHistory => ({
      ...prevHistory,
      [selectedChatId]: [...(prevHistory[selectedChatId] || []), newMessage],
    }));

    setNewMessageText('');
  };

  if (!selectedChat) {
    return (
        <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 h-[80vh] flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Select a chat to begin.</p>
        </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 relative text-gray-500 dark:text-white">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl h-[80vh] max-h-[90vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="px-6 pt-6 pb-6 flex-shrink-0 border-b border-gray-200 dark:border-gray-700"> 
          <label className="text-xl sm:text-2xl text-gray-500 dark:text-white">
            Pending Chats
          </label>
        </div>
        
        <div className="flex flex-col flex-1 overflow-x-auto overflow-y-hidden px-6 pb-5"> 
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-t-xl overflow-hidden flex-shrink-0 bg-white dark:bg-gray-800 mt-6 whitespace-nowrap">
                <div className="w-1/4 flex-shrink-0 p-4 flex items-center justify-center border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <img className="w-8 h-8 rounded-full object-cover mr-2" src={ADMIN_AVATAR} alt="Admin Avatar"/>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-300">Admin Account</span>
                    <ArrowLeftIcon className="w-4 h-4 text-gray-400 mx-3 transform rotate-180" />
                </div>

                <div className="w-3/4 flex-grow p-4 flex items-center justify-start bg-white dark:bg-gray-800">
                    <img className="w-8 h-8 rounded-full object-cover mr-2" src={selectedChat.avatar} alt="Resident Avatar"/>
                    <span className="text-sm font-medium dark:text-white">{selectedChat.name}</span>
                </div>
            </div>

            <div className="flex flex-1 border-x border-gray-200 dark:border-gray-700 border-b border-gray-200 dark:border-gray-700 rounded-b-xl overflow-hidden"> 

                <div className="w-1/4 flex-shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
                    {CHAT_LIST_DATA.map((chat) => {
                        const isActive = chat.id === selectedChatId;
                        return (
                            <div
                                key={chat.id}
                                onClick={() => setSelectedChatId(chat.id)}
                                className={`flex items-start p-3 py-4 cursor-pointer transition-colors duration-150 ${
                                    isActive ? 'bg-blue-50 dark:bg-blue-900/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                }`}
                            >
                                <img
                                    className="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0"
                                    src={chat.avatar}
                                    alt={`${chat.name} Avatar`}
                                />
                                <div className="flex flex-col min-w-0">
                                    <p className="text-sm font-medium truncate text-gray-500 dark:text-white">
                                        {chat.name}
                                    </p>
                                    <p className={`text-xs truncate text-gray-500 dark:text-gray-400`}>
                                        {chat.lastMessage}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="w-3/4 flex flex-col flex-grow min-w-0">
                    <div className="flex-1 p-6 overflow-y-auto space-y-8"> 
                        {currentMessages.map((message, index) => {
                            const isResident = message.type === "inbound";
                            const isNewGroup = index === 0 || currentMessages[index - 1].type !== message.type;
                            const avatar = isResident ? message.avatar : ADMIN_AVATAR;

                            return (
                                <div key={index} className={`flex ${isResident ? 'justify-start' : 'justify-end'} items-start`}>
                                    {isResident && (
                                        <div className="flex items-start max-w-[70%]">
                                            <div className="w-8 h-8 mr-3 flex-shrink-0">
                                                {isNewGroup && (
                                                    <img
                                                        className="w-full h-full rounded-full object-cover"
                                                        src={avatar}
                                                        alt="Resident Avatar"
                                                    />
                                                )}
                                            </div>
                                            
                                            <div className="flex flex-col items-start">
                                                <ChatBubble text={message.text} type="inbound" />
                                            </div>
                                        </div>
                                    )}

                                    {!isResident && (
                                        <div className="flex justify-end items-end max-w-[70%]">
                                            <ChatBubble text={message.text} type="outbound" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                        <form onSubmit={handleSendMessage} className="flex items-center p-4">
                            <input
                              type="text"
                              placeholder={`Reply to ${selectedChat.name}...`}
                              value={newMessageText}
                              onChange={(e) => setNewMessageText(e.target.value)}
                              className="flex-1 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl focus:outline-none text-sm dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />

                            <button
                              type="submit"
                              className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition duration-150 ease-in-out flex items-center justify-center ml-2"
                              aria-label="Send message"
                            >
                              <PaperAirplaneIcon className="w-6 h-6 transform rotate-45 -mt-0.5" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default PendingChats;