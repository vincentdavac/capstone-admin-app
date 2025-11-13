import React, { useState } from "react";
import { ArrowLeftIcon } from '@heroicons/react/24/outline'; 
import PageBreadcrumb from "../../components/common/PageBreadCrumb"; 

import ChatListPanel from '../../components/Chat Support/ChatListPanel'; 
import ChatWindow from '../../components/Chat Support/ChatWindow';

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

const CHAT_LIST_DATA: ChatListItem[] = [
  { id: 1, name: "Coastal Resident", lastMessage: "Hello!", avatar: RESIDENT_AVATAR_BASE + "1" },
  { id: 2, name: "Coastal Resident 2", lastMessage: "Anyone to chat?", avatar: RESIDENT_AVATAR_BASE + "2" },
  { id: 3, name: "Coastal Resident 3", lastMessage: "I have a question...", avatar: RESIDENT_AVATAR_BASE + "3" },
  { id: 4, name: "Coastal Resident 4", lastMessage: "Hello...", avatar: RESIDENT_AVATAR_BASE + "4" },
  { id: 5, name: "Coastal Resident 5", lastMessage: "Can I ask?", avatar: RESIDENT_AVATAR_BASE + "5" },
];

const INITIAL_MESSAGE_HISTORY: Record<number, Message[]> = {
  1: [
    { sender: "Coastal Resident", text: "Hello! How can I check the water level in our area?", type: "inbound", avatar: RESIDENT_AVATAR_BASE + "1" },
    { sender: "Admin Account", text: "Hi! You can open the dashboard and click on the deployed buoy near your location. It shows live water level updates.", type: "outbound" },
    { sender: "Coastal Resident", text: "Thanks! Does it also notify us if the tide is too high?", type: "inbound", avatar: RESIDENT_AVATAR_BASE + "1" },
    { sender: "Admin Account", text: "Yes, you'll receive an SMS and an in-app notification if the buoy detects dangerous conditions.", type: "outbound" },
    { sender: "Coastal Resident", text: "Great! Can I also see past records of rainfall?", type: "inbound", avatar: RESIDENT_AVATAR_BASE + "1" },
    { sender: "Admin Account", text: "Absolutely. Just open the 'History' tab in the buoy details to view rainfall and temperature logs.", type: "outbound" },
  ],
  2: [
    { sender: "Coastal Resident 2", text: "Is the system working?", type: "inbound", avatar: RESIDENT_AVATAR_BASE + "2" },
    { sender: "Admin Account", text: "Yes, it is fully operational. How can I assist you?", type: "outbound" },
  ],
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

    setMessageHistory(prevHistory => {
        const updatedHistory = {
            ...prevHistory,
            [selectedChatId]: [...(prevHistory[selectedChatId] || []), newMessage],
        };
        console.log(`Message sent: ${newMessageText}`);
        return updatedHistory;
    });

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
       <PageBreadcrumb pageTitle="Pending chats" />
       
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl h-[80vh] max-h-[90vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="px-6 pt-6 pb-6 flex-shrink-0 border-b border-gray-200 dark:border-gray-700"> 
          <label className="text-xl sm:text-2xl text-gray-500 dark:text-white">
            Pending Chats
          </label>
        </div>
        
        <div className="flex flex-col flex-1 overflow-x-auto overflow-y-hidden px-6 pb-5"> 
            
            {/* Chat Header */}
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

            <div className="flex flex-1 border-x border-gray-200 dark:border-gray-700 border-b rounded-b-xl overflow-hidden"> 

                {/* Left Panel: Chat List (New Component) */}
                <ChatListPanel
                    chatList={CHAT_LIST_DATA}
                    selectedChatId={selectedChatId}
                    onSelectChat={setSelectedChatId}
                />
                
                {/* Right Panel: Chat Window (New Component) */}
                <ChatWindow
                    selectedChat={selectedChat}
                    currentMessages={currentMessages}
                    newMessageText={newMessageText}
                    onMessageTextChange={setNewMessageText}
                    onSendMessage={handleSendMessage}
                    ADMIN_AVATAR={ADMIN_AVATAR}
                />
            </div>
            
        </div>
      </div>
    </div>
  );
};

export default PendingChats;