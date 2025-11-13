import React, { useState, useRef } from "react";
import { ArrowLeftIcon, PaperClipIcon } from '@heroicons/react/24/outline'; // Added PaperClipIcon
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";

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
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for the search term
  const fileInputRef = useRef<HTMLInputElement>(null); // Ref for file input

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault(); 

    // NOTE: In a real app, you'd also handle sending attached files here.

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
  
  // Basic search handler (no filtering implemented, just to consume the event)
  const handleSearch = (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Searching for:", searchTerm);
  }

  // Handle file/image attachment click
  const handleAttachClick = () => {
      fileInputRef.current?.click();
  }

  // Handle file selection (for demonstration)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
          console.log("File selected:", e.target.files[0].name);
          e.target.value = ''; 
      }
  }


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
            <div className="flex border border-gray-200 dark:border-gray-700 rounded-t-xl overflow-hidden flex-shrink-0 bg-white dark:bg-gray-800 mt-6 whitespace-nowrap">
                <div className="w-1/4 flex-shrink-0 p-4 flex items-center justify-center border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                    <img className="w-8 h-8 rounded-full object-cover mr-2" src={ADMIN_AVATAR} alt="Admin Avatar"/>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-300">Admin Account</span>
                    <ArrowLeftIcon className="w-4 h-4 text-gray-400 mx-3 transform rotate-180" />
                </div>

                {/* Updated to use selectedChat.name */}
                <div className="w-3/4 flex-grow p-4 flex items-center justify-start bg-white dark:bg-gray-800">
                    <img className="w-8 h-8 rounded-full object-cover mr-2" src={selectedChat.avatar} alt="Resident Avatar"/>
                    <span className="text-sm font-medium dark:text-white">{selectedChat.name}</span>
                </div>
            </div>

            <div className="flex flex-1 border-x border-gray-200 dark:border-gray-700 border-b rounded-b-xl overflow-hidden"> 

                <div className="w-1/4 flex-shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
                    {/* *** Search Bar added here *** */}
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                        <form onSubmit={handleSearch} className="relative w-full">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                {/* Search Icon SVG from the example */}
                                <svg
                                    className="fill-gray-500 dark:fill-gray-400"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                                        fill=""
                                    />
                                </svg>
                            </span>
                            <input
                                type="text"
                                placeholder="Search Message..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="h-10 w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 shadow-inner placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                            />
                        </form>
                    </div>
                    {/* *** End Search Bar *** */}

                    {CHAT_LIST_DATA.map((chat) => {
                        const isActive = chat.id === selectedChatId;
                        // Use a consistent name "Coastal Resident" for the first entry to match the screenshot
                        const displayName = chat.id === 1 ? "Coastal Resident" : chat.name; 
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
                                    alt={`${displayName} Avatar`}
                                />
                                <div className="flex flex-col min-w-0">
                                    <p className="text-sm font-medium truncate text-gray-500 dark:text-white">
                                        {displayName}
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
                            {/* *** Attachment Button Added *** */}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                multiple // Allows selecting multiple files/images
                                accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" // Example mime types
                            />
                            <button
                                type="button"
                                onClick={handleAttachClick}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition duration-150 ease-in-out flex items-center justify-center mr-2"
                                aria-label="Attach file or image"
                            >
                                <PaperClipIcon className="w-6 h-6 transform rotate-45" />
                            </button>
                            
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