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
    // setLoading(true);
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
    return (
      <div className="w-full flex items-start justify-start pl-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="rounded-lg border p-6 h-[204px] bg-white dark:bg-gray-800 border-[#D9D9D9] dark:border-gray-700 animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
              <div className="mt-auto space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const renderTrend = (stat: DashboardStat) => (
    <Badge color={stat.badge_color}>
      {stat.trend === "up" ? <ArrowUpIcon /> : <ArrowDownIcon />}
      {stat.percentage_of_total.toFixed(2)}%
    </Badge>
  );

  return (
    <div className="w-full px-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {/* Registered Users */}
        <div className="group relative rounded-[2rem] bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center justify-center w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-6">
            <ManageUsers className="size-6" />
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">
              Registered Users
            </span>
            <div className="flex items-end justify-between">
              <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.users.total?.toLocaleString() ?? 0}
              </h4>
              {renderTrend(stats.users)}
            </div>
          </div>
        </div>

        {/* Hotlines */}
        <div className="group relative rounded-[2rem] bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center justify-center w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-2xl mb-6">
            <Phone className="size-6" />
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">
              Registered Hotlines
            </span>
            <div className="flex items-end justify-between">
              <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.hotlines.total?.toLocaleString() ?? 0}
              </h4>
              {renderTrend(stats.hotlines)}
            </div>
          </div>
        </div>

        {/* Daily Messages */}
        <div className="group relative rounded-[2rem] bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl mb-6">
            <MessagesSquare className="size-6" />
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">
              Daily Messages
            </span>
            <div className="flex items-end justify-between">
              <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.messages.current_week?.toLocaleString() ?? 0}
              </h4>
              {renderTrend(stats.messages)}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div className="group relative rounded-[2rem] bg-white dark:bg-slate-900 p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center justify-center w-12 h-12 bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-2xl mb-6">
            <Megaphone className="size-6" />
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em]">
              Weekly Alerts
            </span>
            <div className="flex items-end justify-between">
              <h4 className="text-3xl font-black text-slate-900 dark:text-white">
                {stats.alerts.current_week?.toLocaleString() ?? 0}
              </h4>
              {renderTrend(stats.alerts)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
