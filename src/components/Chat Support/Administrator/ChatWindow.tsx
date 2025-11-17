import React, { useRef, useState, ChangeEvent, FormEvent } from "react";
import { PaperClipIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ChatBubble from "./ChatBubble";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";
import API_BASE_URL from "../../../config/coreApi";

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
  attachment?: string;
  time?: string;
  isRead?: boolean;
}

interface ChatWindowProps {
  selectedChat: ChatListItem;
  currentMessages: Message[];
  newMessageText: string;
  onMessageTextChange: (text: string) => void;
  onSendMessage?: (e?: FormEvent) => void; // kept for compatibility; optional now
  alertsRef: React.RefObject<AlertsContainerRef | null>;
  senderId: number;
  receiverId: number;
  token: string;
  onMessageSent?: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  selectedChat,
  currentMessages,
  newMessageText,
  onMessageTextChange,
  alertsRef,
  senderId,
  receiverId,
  token,
  onMessageSent,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [selectedImageModal, setSelectedImageModal] = useState<string | null>(
    null
  );

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setSelectedFile(file);

    // set preview for images
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setSelectedPreview(url);
    } else {
      setSelectedPreview(null);
    }

    // reset input so same file can be chosen again later
    e.target.value = "";
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    if (selectedPreview) {
      URL.revokeObjectURL(selectedPreview);
    }
    setSelectedPreview(null);
  };

  const openImageModal = (imageUrl: string) => setSelectedImageModal(imageUrl);
  const closeImageModal = () => setSelectedImageModal(null);

  // Actual send function (called on submit)
  const sendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();

    // Validation
    if ((!newMessageText || newMessageText.trim() === "") && !selectedFile) {
      alertsRef.current?.addAlert(
        "error",
        "Please enter a message or attach a file."
      );
      return;
    }
    if (!senderId || !receiverId) {
      alertsRef.current?.addAlert(
        "error",
        "Missing sender or receiver information."
      );
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("message", newMessageText);
      formData.append("sender_id", String(senderId));
      formData.append("receiver_id", String(receiverId));
      if (selectedFile) formData.append("attachment", selectedFile);

      const res = await fetch(`${API_BASE_URL}/messages/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // NOTE: Do not set Content-Type — browser sets it for FormData
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Send message failed:", data);
        alertsRef.current?.addAlert(
          "error",
          data.message || "Failed to send message."
        );
        return;
      }

      // Success
      alertsRef.current?.addAlert("success", "Message sent!");

      // Clear input & selected file
      onMessageTextChange("");
      clearSelectedFile();

      // Refresh chat in parent
      onMessageSent?.();
    } catch (err) {
      console.error("Error sending message:", err);
      alertsRef.current?.addAlert(
        "error",
        "Something went wrong while sending the message."
      );
    } finally {
      setUploading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-3/4 flex flex-col flex-grow min-w-0">
      {/* Message History */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {currentMessages.map((message, index) => {
          const isResident = message.type === "inbound";
          const isNewGroup =
            index === 0 || currentMessages[index - 1].type !== message.type;
          const avatar = message.avatar;

          return (
            <div
              key={index}
              className={`flex ${
                isResident ? "justify-start" : "justify-end"
              } items-start`}
            >
              {/* Avatar + Message */}
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
                    {/* Image attachment - Clickable */}
                    {message.attachment && (
                      <img
                        src={message.attachment}
                        alt="Attachment"
                        className="mt-1 max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openImageModal(message.attachment!)}
                      />
                    )}
                    {/* Timestamp */}
                    {message.time && (
                      <span className="text-xs text-gray-400 mt-1">
                        {message.time} {message.isRead ? "✓ Seen" : ""}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {!isResident && (
                <div className="flex justify-end items-end max-w-[70%] flex-col">
                  <ChatBubble text={message.text} type="outbound" />
                  {/* Image attachment - Clickable */}
                  {message.attachment && (
                    <img
                      src={message.attachment}
                      alt="Attachment"
                      className="mt-1 max-w-xs rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => openImageModal(message.attachment!)}
                    />
                  )}
                  {message.time && (
                    <span className="text-xs text-gray-400 mt-1 text-right">
                      {message.time} {message.isRead ? "✓ Seen" : ""}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="flex-shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center p-4">
          {/* Attachment Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
          <button
            type="button"
            onClick={handleAttachClick}
            className="p-2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 transition duration-150 ease-in-out flex items-center justify-center mr-2"
            aria-label="Attach file or image"
            disabled={uploading}
          >
            <PaperClipIcon className="w-6 h-6 transform rotate-45" />
          </button>

          {/* file preview */}
          {selectedPreview && (
            <div className="mr-3 flex items-center gap-2">
              <img
                src={selectedPreview}
                alt="preview"
                className="w-12 h-12 object-cover rounded-md border"
              />
              <button
                type="button"
                onClick={clearSelectedFile}
                className="text-xs text-red-900"
                aria-label="Remove file"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          )}

          <input
            type="text"
            placeholder={`Reply to ${selectedChat.name}...`}
            value={newMessageText}
            onChange={(e) => onMessageTextChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl focus:outline-none text-sm dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            disabled={uploading}
          />

          <button
            type="button"
            onClick={() => sendMessage()}
            className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition duration-150 ease-in-out flex items-center justify-center ml-2"
            aria-label="Send message"
            disabled={
              uploading || (newMessageText.trim() === "" && !selectedFile)
            }
          >
            {uploading ? (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
              </svg>
            ) : (
              <PaperAirplaneIcon className="w-6 h-6 transform rotate-45 -mt-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImageModal && (
        <div
          className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[9999]"
          onClick={closeImageModal}
        >
          <div
            className="relative bg-white/90 dark:bg-gray-900/90 border border-white/20 rounded-2xl shadow-2xl w-full max-w-4xl p-6 z-[10000] overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition"
              aria-label="Close image"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Image */}
            <img
              src={selectedImageModal}
              alt="Full size attachment"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
