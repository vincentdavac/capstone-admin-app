/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

import ChatListPanel from "../../../components/Chat Support/Barangay/ChatListPanel";
import ChatWindow from "../../../components/Chat Support/Barangay/ChatWindow";

import API_BASE_URL from "../../../config/coreApi";
import { AppContext } from "../../../context/AppContext";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";
import { insertingAlerts } from "../../../api_hooks/dashboardHooks";

import { useOutletContext } from "react-router";

type OutletContextType = {
  fetchUnreadChatCount: () => void;
};

interface user {
  id: number;
  attributes: {
    firstName: string;
    lastName: string;
    email: string;
    contactNumber: string;
    municipality: string;
    userType: string;
    image: string;
    idDocument: string;
    dateVerified: string;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}
interface chat {
  id: number;
  attributes: {
    senderId: number;
    message: string;
    attachment: string | null;
    isRead: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}
interface ChatListItemProps {
  user: user;
  chat: chat;
}
interface ChatListItem {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
  isRead: boolean;
  receiverID?: number;
  lastSenderId: number;
  userType?: string;
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
  chatId: number;
  sender: {
    id: number;
    attributes: {
      firstName: string;
      lastName: string;
      email: string;
      image: string;
      userType: string;
    };
  };
  receiver: {
    id: number;
    attributes: {
      firstName: string;
      lastName: string;
      email: string;
      image: string;
      userType: string;
    };
  };
  messages: {
    id: number;
    attributes: {
      senderId: number;
      message: string;
      attachment: string | null;
      isRead: boolean;
      createdDate: string;
      createdTime: string;
      updatedDate: string;
      updatedTime: string;
    };
  }[];
}
interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const BarangayChatSupport = ({ alertsRef }: Props) => {
  const { fetchUnreadChatCount } = useOutletContext<OutletContextType>();

  const { token, user, echoInstance } = useContext(AppContext)!;
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  insertingAlerts();

  useEffect(() => {
    document.title = "Chat Support | X-Stream";
  }, []);

  //  Example: refresh unread count after opening chat
  useEffect(() => {
    fetchUnreadChatCount();
  }, [fetchUnreadChatCount]);

  // Map API response to ChatListItem[]
  const mapApiResponseToChatList = (
    apiData: ChatListItemProps[]
  ): ChatListItem[] => {
    if (!Array.isArray(apiData)) return [];

    return apiData
      .filter((item) => item && item.chat && item.user)
      .map((item) => {
        const lastMessage = item.chat.attributes.message;
        const lastSenderId = item.chat.attributes.senderId;

        // Determine if last message is read for this admin
        const isRead =
          lastSenderId === user?.id || item.chat.attributes.isRead === true;

        return {
          id: item.chat.id,
          name: `${item.user.attributes.firstName} ${item.user.attributes.lastName}`,
          lastMessage,
          avatar: item.user.attributes.image,
          isRead,
          receiverID: item.user.id,
          lastSenderId,
          userType: item.user.attributes.userType,
        };
      });
  };

  const fetchChatList = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/barangay/chats/users-admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();

      if (res.ok && data.data) {
        const mappedChats = mapApiResponseToChatList(data.data);
        setChatList(mappedChats);
      } else {
        console.error("Failed to fetch chatlist:", data);
        alertsRef.current?.addAlert(
          "error",
          data.message || "Failed to load chats"
        );
      }
    } catch (error) {
      console.error("Error fetching chatlist:", error);
      alertsRef.current?.addAlert("error", "Error loading chat list");
    }
  };

  const markChatAsRead = async (chatId: number) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/chat/${chatId}/read?_method=PATCH`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setChatList((prevList) =>
          prevList.map((chat) =>
            chat.id === chatId ? { ...chat, isRead: true } : chat
          )
        );
      } else {
        console.error("Failed to mark chat as read:", data);
      }
    } catch (error) {
      console.error("Error marking chat as read:", error);
    }
  };

  useEffect(() => {
    if (!echoInstance || !user?.userType) return;

    let channelName = "";

    if (user.userType === "admin") {
      channelName = "admin.chats";
    } else if (user.userType === "barangay") {
      channelName = "barangay.chats";
    } else {
      channelName = "user.chats";
    }

    console.log(`Listening to ${channelName}`);

    const channel = echoInstance.private(channelName);

    const handleMessage = (event: any) => {
      console.log(`Global ${channelName} chat update:`, event);
      fetchChatList();
      fetchUnreadChatCount();
    };

    channel.listen(".message.sent", handleMessage);

    //  CLEANUP — prevents duplicate listeners
    // return () => {
    //   channel.stopListening(".message.sent");
    //   echoInstance.leave(channelName);
    // };
  }, [echoInstance, user?.userType]);

  useEffect(() => {
    if (!echoInstance || !selectedChatId) return;

    const channelName = `chat.${selectedChatId}`;

    console.log("Listening to chat channel:", channelName);

    const channel = echoInstance.private(channelName);

    const handleMessage = (event: any) => {
      console.log("Real-time message received:", event);

      // Update chat list (last message, ordering)
      fetchChatList();

      // Mark this chat as read
      markChatAsRead(selectedChatId);

      // Append / refresh messages in chat box
      fetchChatBox(selectedChatId);

      // Update global unread count
      fetchUnreadChatCount();
    };

    channel.listen(".message.sent", handleMessage);

    channel.error((error: any) => {
      console.error(`Channel error (${channelName}):`, error);
    });

    //  Cleanup when switching chats or unmounting
    return () => {
      console.log("Leaving chat channel:", channelName);
      channel.stopListening(".message.sent");
      echoInstance.leave(channelName);
    };
  }, [
    echoInstance,
    selectedChatId,
    fetchChatList,
    fetchUnreadChatCount,
    markChatAsRead,
  ]);

  useEffect(() => {
    if (token) fetchChatList();
  }, [token]);

  const selectedChat =
    chatList.find((chat) => chat.id === selectedChatId) || chatList[0];

  useEffect(() => {
    if (selectedChat && selectedChatId === null) {
      setSelectedChatId(selectedChat.id);
    }
  }, [chatList, selectedChatId, selectedChat]);

  useEffect(() => {
    if (selectedChat?.receiverID) {
      setReceiverId(selectedChat.receiverID);
    }
  }, [selectedChat]);

  const [messageHistory, setMessageHistory] = useState<
    Record<number, Message[]>
  >({});

  const currentMessages = selectedChat
    ? messageHistory[selectedChat.id] || []
    : [];

  const [newMessageText, setNewMessageText] = useState<string>("");

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!selectedChat || newMessageText.trim() === "") return;

    const newMessage: Message = {
      sender: "Admin Account",
      text: newMessageText.trim(),
      type: "outbound",
      avatar: user?.image,
    };

    setMessageHistory((prev) => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage],
    }));

    setNewMessageText("");
  };

  const mapApiMessagesToMessage = (chatData: ChatWindowProps): Message[] => {
    const currentUserId = user?.id;

    return chatData.messages.map((msg) => {
      const isOutbound = msg.attributes.senderId === currentUserId;
      const senderInfo = isOutbound ? chatData.sender : chatData.receiver;

      return {
        sender: `${senderInfo.attributes.firstName} ${senderInfo.attributes.lastName}`,
        text: msg.attributes.message,
        type: isOutbound ? "outbound" : "inbound",
        avatar: senderInfo.attributes.image,
        attachment: msg.attributes.attachment || undefined,
        time: `${msg.attributes.createdDate} ${msg.attributes.createdTime}`,
        isRead: !!msg.attributes.isRead,
      };
    });
  };

  const fetchChatBox = async (chatId: number) => {
    try {
      const res = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setMessageHistory((prev) => ({
          ...prev,
          [chatId]: mapApiMessagesToMessage(data.data),
        }));
      } else {
        console.error("Failed to fetch chat messages:", data);
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  useEffect(() => {
    if (selectedChatId) {
      fetchChatBox(selectedChatId);
      markChatAsRead(selectedChatId);
    }
  }, [selectedChatId]);

  if (!selectedChat || !user || !user.id || !receiverId || !token) {
    return (
      <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 h-[80vh] flex items-center justify-center">
        <div className="flex justify-center items-center gap-2 text-gray-500">
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
          Please wait, loading chat...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 relative text-gray-500 dark:text-white">
      <PageBreadcrumb pageTitle="Chat Support" />

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl h-[80vh] max-h-[90vh] flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="px-6 pt-6 pb-6 flex-shrink-0 border-b border-gray-200 dark:border-gray-700">
          <label className="text-xl sm:text-2xl text-gray-500 dark:text-white">
            Barangay Residents
          </label>
        </div>

        <div className="flex flex-col flex-1 overflow-x-auto overflow-y-hidden px-6 pb-5">
          <div className="flex border border-gray-200 dark:border-gray-700 rounded-t-xl overflow-hidden flex-shrink-0 bg-white dark:bg-gray-800 mt-6 whitespace-nowrap">
            <div className="w-1/4 flex-shrink-0 p-4 flex items-center justify-center border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <img
                className="w-8 h-8 rounded-full object-cover mr-2"
                src={user?.image}
                alt="Admin Avatar"
              />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                {user?.firstName} {user?.lastName}
              </span>
            </div>
            <div className="w-3/4 flex-grow p-4 flex items-center justify-start bg-white dark:bg-gray-800">
              <img
                className="w-8 h-8 rounded-full object-cover mr-2"
                src={selectedChat.avatar}
                alt="Resident Avatar"
              />
              <span className="text-sm font-medium dark:text-white">
                {selectedChat.name}
              </span>
            </div>
          </div>

          <div className="flex flex-1 border-x border-gray-200 dark:border-gray-700 border-b rounded-b-xl overflow-hidden">
            <ChatListPanel
              chatList={chatList}
              selectedChatId={selectedChat.id}
              onSelectChat={setSelectedChatId}
            />

            <ChatWindow
              selectedChat={selectedChat}
              currentMessages={currentMessages}
              newMessageText={newMessageText}
              onMessageTextChange={setNewMessageText}
              onSendMessage={handleSendMessage}
              alertsRef={alertsRef}
              senderId={user?.id}
              receiverId={receiverId!}
              token={token!}
              onMessageSent={() => {
                fetchChatBox(selectedChat.id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangayChatSupport;
