/* eslint-disable react-hooks/exhaustive-deps */
import { ArrowUpIcon, ArrowDownIcon, ManageUsers } from "../../../icons";
import { Megaphone, MessagesSquare, Phone } from "lucide-react";
import API_BASE_URL from "../../../config/coreApi";
import { AppContext } from "../../../context/AppContext";
import Badge from "../../ui/badge/Badge";
import { useContext, useEffect, useState } from "react";

type DashboardStat = {
  total: number;
  current_week: number;
  average_per_week: number;
  percentage_of_total: number;
  trend: "up" | "down";
  badge_color:
    | "primary"
    | "success"
    | "error"
    | "warning"
    | "info"
    | "light"
    | "dark";
};

type DashboardResponse = {
  users: DashboardStat;
  hotlines: DashboardStat;
  messages: DashboardStat;
  alerts: DashboardStat;
};

const DashboardCards = () => {
  const { token } = useContext(AppContext)!;
  const [stats, setStats] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/barangay/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (res.ok && data?.data) {
        setStats(data.data);
      } else {
        console.error("Failed to fetch dashboard stats:", data);
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchDashboardStats();
  }, [token]);

  if (loading || !stats) {
    return <div className="p-6 text-gray-500">Loading dashboard…</div>;
  }

  const renderTrend = (stat: DashboardStat) => (
    <Badge color={stat.badge_color}>
      {stat.trend === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />}
      {stat.percentage_of_total.toFixed(2)}%
    </Badge>
  );

  return (
    <div className="w-full flex items-start justify-start pl-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
        {/* Registered Users */}
        <div className="rounded-lg border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
            <ManageUsers className="size-8 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-lg text-gray-500 dark:text-gray-400">
                Registered Users
              </span>
              <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                {stats.users.total ?? 0}
              </h4>
            </div>
            {renderTrend(stats.users)}
          </div>
        </div>

        {/* Hotlines */}
        <div className="rounded-lg border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
            <Phone className="size-8 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-lg text-gray-500 dark:text-gray-400">
                Registered Hotlines
              </span>
              <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                {stats.hotlines.total ?? 0}
              </h4>
            </div>
            {renderTrend(stats.hotlines)}
          </div>
        </div>

        {/* Daily Messages */}
        <div className="rounded-lg border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
            <MessagesSquare className="size-8 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-lg text-gray-500 dark:text-gray-400">
                Daily Messages
              </span>
              <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                {stats.messages.current_week ?? 0}
              </h4>
            </div>
            {renderTrend(stats.messages)}
          </div>
        </div>

        {/* Alerts */}
        <div className="rounded-lg border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl mb-4">
            <Megaphone className="size-8 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-lg text-gray-500 dark:text-gray-400">
                Weekly Alerts
              </span>
              <h4 className="mt-2 text-2xl font-bold text-gray-800 dark:text-white">
                {stats.alerts.current_week ?? 0}
              </h4>
            </div>
            {renderTrend(stats.alerts)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
