import React, { useRef, ChangeEvent, FormEvent } from 'react';
import { PaperClipIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import ChatBubble from './ChatBubble';

interface ChatListItem {
    id: number;
    name: string;
    avatar: string;
}

interface Message {
    sender: string;
    text: string;
    type: "inbound" | "outbound";
    avatar?: string;
}

interface ChatWindowProps {
    selectedChat: ChatListItem;
    currentMessages: Message[];
    newMessageText: string;
    onMessageTextChange: (text: string) => void;
    onSendMessage: (e?: FormEvent) => void;
    ADMIN_AVATAR: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
    selectedChat, 
    currentMessages, 
    newMessageText, 
    onMessageTextChange, 
    onSendMessage,
    ADMIN_AVATAR
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null); 

    const handleAttachClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log("File selected:", e.target.files[0].name);
            e.target.value = ''; // Reset input so the same file can be selected again
        }
    }

    return (
        <div className="w-3/4 flex flex-col flex-grow min-w-0">
            {/* Message History */}
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
                                        {/* Only show avatar for the first message in a group */}
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

            {/* Message Input Form */}
            <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                <form onSubmit={onSendMessage} className="flex items-center p-4">
                    
                    {/* Attachment Button */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        className="hidden" 
                        multiple // Allows selecting multiple files/images
                        accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
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
                      onChange={(e) => onMessageTextChange(e.target.value)}
                      className="flex-1 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl focus:outline-none text-sm dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />

                    <button
                      type="submit"
                      className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition duration-150 ease-in-out flex items-center justify-center ml-2"
                      aria-label="Send message"
                      disabled={newMessageText.trim() === ''} 
                    >
                      <PaperAirplaneIcon className="w-6 h-6 transform rotate-45 -mt-0.5" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatWindow;