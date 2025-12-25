/* eslint-disable react-hooks/exhaustive-deps */
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { AlertsContainerRef } from "../components/Alert/AlertsContainer";
import { AppContext } from "../context/AppContext";
import API_BASE_URL from "../config/coreApi";
import { useCallback, useContext, useEffect, useState } from "react";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const LayoutContent = ({ alertsRef }: Props) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { user, token, echoInstance } = useContext(AppContext)!;

  const [unreadChatCount, setUnreadChatCount] = useState<number>(0);

  const fetchUnreadChatCount = useCallback(async () => {
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/chats/unread/count`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data?.data) {
        setUnreadChatCount(data.data.unread_chats);
      }
    } catch (error) {
      console.error("Error fetching unread chat count:", error);
    }
  }, [token]);

  //  initial fetch
  useEffect(() => {
    if (!user) return;
    fetchUnreadChatCount();
  }, [user, fetchUnreadChatCount]);

  useEffect(() => {
    if (!echoInstance || !user?.userType) return;

    const channelName =
      user.userType === "admin"
        ? "admin.chats"
        : user.userType === "barangay"
        ? "barangay.chats"
        : "user.chats";

    const channel = echoInstance.private(channelName);

    channel.listen(".message.sent", () => {
      fetchUnreadChatCount();
    });

    // Do NOT leave channel on navigation
    // return () => {
    //   channel.stopListening(".message.sent");
    // };
  }, [echoInstance, user?.userType]);

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar alertsRef={alertsRef} unreadChatCount={unreadChatCount} />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader alertsRef={alertsRef} />
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet context={{ fetchUnreadChatCount }} />
        </div>
      </div>
    </div>
  );
};

const AppLayout = ({ alertsRef }: Props) => {
  return (
    <SidebarProvider>
      <LayoutContent alertsRef={alertsRef} />
    </SidebarProvider>
  );
};

export default AppLayout;
