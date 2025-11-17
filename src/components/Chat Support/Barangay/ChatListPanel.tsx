import React, { useState, useContext } from "react";
import { AppContext } from "../../../context/AppContext";

interface ChatListItem {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
  isRead?: boolean;
  receiverID?: number;
  lastSenderId: number; // important for unread highlighting
}

interface ChatListPanelProps {
  chatList: ChatListItem[];
  selectedChatId: number;
  onSelectChat: (id: number) => void;
}

const ChatListPanel: React.FC<ChatListPanelProps> = ({
  chatList,
  selectedChatId,
  onSelectChat,
}) => {
  const { user } = useContext(AppContext)!;
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter chat list based on search term
  const filteredChatList = chatList.filter((chat) => {
    if (!searchTerm.trim()) return true;

    const searchLower = searchTerm.toLowerCase();
    const nameMatch = chat.name.toLowerCase().includes(searchLower);
    const messageMatch = chat.lastMessage.toLowerCase().includes(searchLower);

    return nameMatch || messageMatch;
  });

  return (
    <div className="w-1/4 flex-shrink-0 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
      {/* Search Bar */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <div className="relative w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
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
            placeholder="Search Officials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-10 w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-800 shadow-inner placeholder-gray-500 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Chat List Items */}
      {filteredChatList.length === 0 ? (
        <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
          No results found
        </div>
      ) : (
        filteredChatList.map((chat) => {
          const isActive = chat.id === selectedChatId;

          // Highlight if last message is from other user and unread
          const isUnread = chat.lastSenderId !== user?.id && !chat.isRead;

          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={`flex items-start p-3 py-4 cursor-pointer transition-colors duration-150 border-l-4 ${
                isUnread
                  ? "border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/30"
                  : "border-l-transparent"
              } ${
                isActive
                  ? "bg-blue-50 dark:bg-blue-900/50"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <div className="relative">
                <img
                  className="w-8 h-8 rounded-full object-cover mr-3 flex-shrink-0"
                  src={chat.avatar}
                  alt={`${chat.name} Avatar`}
                />
                {/* Unread indicator dot */}
                {isUnread && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                )}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <p
                  className={`text-sm truncate ${
                    isUnread
                      ? "font-semibold text-gray-900 dark:text-white"
                      : "font-medium text-gray-500 dark:text-white"
                  }`}
                >
                  {chat.name}
                </p>
                <p
                  className={`text-xs truncate ${
                    isUnread
                      ? "font-medium text-gray-700 dark:text-gray-300"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatListPanel;
