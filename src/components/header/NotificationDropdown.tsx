/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { AppContext } from "../../context/AppContext";
import API_BASE_URL from "../../config/coreApi";

interface NotificationSender {
  id: number;
  name: string;
  image: string;
}

interface NotificationAttributes {
  senderId: number;
  receiverId: number | null;
  barangayId: number | null;
  receiverRole: "admin" | "barangay" | "user";
  title: string;
  message: string;
  status: "read" | "unread";
  isRead: boolean;
  readDate: string | null;
  readTime: string | null;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}
interface Notification {
  id: number;
  attributes: NotificationAttributes;
  sender: NotificationSender;
}

interface UnreadNotificationsResponse {
  status: "success" | "error";
  message: string;
  data: {
    notifications: Notification[];
    unread_notifications: number;
  };
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user, echoInstance } = useContext(AppContext)!;
  const userType = user?.userType;

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState<number>(0);

  useEffect(() => {
    if (!echoInstance || !userType) return;

    let channelName = "";

    if (userType === "admin") {
      channelName = "admin.notifications";
    } else if (userType === "barangay") {
      channelName = "barangay.notifications";
    } else {
      return;
    }

    const channel = echoInstance.private(channelName);

    const handleNotification = (event: any) => {
      console.log("Realtime notification received:", event);

      // Re-fetch unread notifications + count
      fetchNotifications();
    };

    channel.listen(".notification.sent", handleNotification);

    // cleanup to avoid duplicate listeners
    return () => {
      channel.stopListening(".notification.sent");
      echoInstance.leave(channelName);
    };
  }, [echoInstance, userType]);

  const fetchNotifications = async () => {
    if (!token || !userType) return;

    let endpoint = "";

    if (userType === "admin") {
      endpoint = "/unread/admin";
    } else if (userType === "barangay") {
      endpoint = "/unread/barangay";
    } else {
      // optional: user notifications later
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data: UnreadNotificationsResponse = await res.json();

      if (res.ok && data.data) {
        setNotifications(data.data.notifications);
        setNotificationCount(data.data.unread_notifications);
      } else {
        console.error("Failed to fetch notifications:", data);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userType, token]);

  const markNotificationAsRead = async (notificationId: number) => {
    if (!token || !userType) return;

    let endpoint = "";

    if (userType === "admin") {
      endpoint = `/read/admin/${notificationId}`;
    } else if (userType === "barangay") {
      endpoint = `/read/barangay/${notificationId}`;
    } else {
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}?_method=PATCH`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.ok) {
        // Update UI immediately
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

        setNotificationCount((prev) => Math.max(prev - 1, 0));
      } else {
        console.error("Failed to mark notification as read:", data);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  //  Mark All as Read
  const markAllAsRead = async () => {
    if (!token || !userType) return;

    const endpoint =
      userType === "admin" ? "/read-all/admin" : "/read-all/barangay";

    try {
      const res = await fetch(`${API_BASE_URL}${endpoint}?_method=PATCH`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        // Clear notifications in UI
        setNotifications([]);
        setNotificationCount(0);
      } else {
        console.error("Failed to mark all as read:", data);
      }
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  const handleClick = () => {
    toggleDropdown();
  };
  return (
    <div className="relative">
      <button
        className="relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={handleClick}
      >
        {notificationCount > 0 && (
          <span
            className="absolute -top-1 -right-1
            min-w-[18px] h-[18px] px-1
            flex items-center justify-center
            text-[10px] font-bold text-white
            bg-red-500 rounded-full"
          >
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        )}
        <svg
          className="fill-current"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.75 2.29248C10.75 1.87827 10.4143 1.54248 10 1.54248C9.58583 1.54248 9.25004 1.87827 9.25004 2.29248V2.83613C6.08266 3.20733 3.62504 5.9004 3.62504 9.16748V14.4591H3.33337C2.91916 14.4591 2.58337 14.7949 2.58337 15.2091C2.58337 15.6234 2.91916 15.9591 3.33337 15.9591H4.37504H15.625H16.6667C17.0809 15.9591 17.4167 15.6234 17.4167 15.2091C17.4167 14.7949 17.0809 14.4591 16.6667 14.4591H16.375V9.16748C16.375 5.9004 13.9174 3.20733 10.75 2.83613V2.29248ZM14.875 14.4591V9.16748C14.875 6.47509 12.6924 4.29248 10 4.29248C7.30765 4.29248 5.12504 6.47509 5.12504 9.16748V14.4591H14.875ZM8.00004 17.7085C8.00004 18.1228 8.33583 18.4585 8.75004 18.4585H11.25C11.6643 18.4585 12 18.1228 12 17.7085C12 17.2943 11.6643 16.9585 11.25 16.9585H8.75004C8.33583 16.9585 8.00004 17.2943 8.00004 17.7085Z"
            fill="currentColor"
          />
        </svg>
      </button>
      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0 z-40"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
          <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Notification
          </h5>
          <button
            onClick={toggleDropdown}
            className="text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <svg
              className="fill-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
          {/* Example notification items */}

          <ul className="flex flex-col h-auto overflow-y-auto custom-scrollbar">
            {notifications.length === 0 && (
              <li className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                No new notifications
              </li>
            )}

            {notifications.map((notification) => (
              <li key={notification.id} className="relative">
                {/* Dismiss Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead(notification.id);
                  }}
                  className="absolute top-2 right-2 z-20 flex h-5 w-5 items-center justify-center
  rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-700
  dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ✕
                </button>

                <DropdownItem
                  onItemClick={() => {}}
                  className="flex gap-3 rounded-lg border-b border-gray-100 p-3
          hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5"
                >
                  {/* Sender Image */}
                  <span className="relative block h-10 w-10 shrink-0 rounded-full">
                    <img
                      src={notification.sender.image || "/no_profile.png"}
                      alt={notification.sender.name || "User Account"}
                      className="h-full w-full rounded-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // prevent infinite loop
                        target.src = "/no_profile.png";
                      }}
                    />

                    {!notification.attributes.isRead && (
                      <span
                        className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full
              border-[1.5px] border-white bg-error-500 dark:border-gray-900"
                      />
                    )}
                  </span>

                  {/* Content */}
                  <div className="flex flex-1 flex-col">
                    <span className="text-theme-sm font-semibold text-gray-800 dark:text-white/90">
                      {notification.attributes.title}
                    </span>

                    <span className="mt-0.5 text-theme-sm text-gray-500 dark:text-gray-400">
                      {notification.attributes.message}
                    </span>

                    <span className="mt-2 flex items-center gap-2 text-theme-xs text-gray-400 dark:text-gray-500">
                      <span>{notification.attributes.createdDate}</span>
                      <span className="h-1 w-1 rounded-full bg-gray-400"></span>
                      <span>{notification.attributes.createdTime}</span>
                    </span>
                  </div>
                </DropdownItem>
              </li>
            ))}
          </ul>

          {/* Add more items as needed */}
        </ul>

        <button
          onClick={markAllAsRead}
          className="block px-4 py-2 mt-3 w-full text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
        >
          Mark All as Read
        </button>
      </Dropdown>
    </div>
  );
}
