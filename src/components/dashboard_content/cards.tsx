/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Buoy, ManageUsers } from "../../icons";
import { MapPinHouse, Megaphone, TrendingUp, TrendingDown } from "lucide-react";
import API_BASE_URL from "../../config/coreApi";
import { AppContext } from "../../context/AppContext";
import Badge from "../ui/badge/Badge";
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
  barangays: DashboardStat;
  buoys: DashboardStat;
  recent_alerts: DashboardStat;
};

const DashboardCards = () => {
  const { token } = useContext(AppContext)!;
  const [stats, setStats] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.ok && data.data) {
        setStats(data.data);
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

  // Modern Skeleton Loader
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full animate-pulse">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-[180px] bg-gray-200 dark:bg-gray-700 rounded-2xl"
          />
        ))}
      </div>
    );
  }

  const StatCard = ({
    title,
    value,
    stat,
    icon: Icon,
  }: {
    title: string;
    value: number | string;
    stat: DashboardStat;
    icon: any;
    subLabel?: string;
  }) => (
    <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </p>
          <h4 className="mt-2 text-3xl font-black text-gray-900 dark:text-white">
            {value}
          </h4>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Avg: {stat.average_per_week.toFixed(1)}/week
          </p>
        </div>

        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 shadow-inner`}
        >
          <Icon className="size-6 text-indigo-600 dark:text-indigo-400" />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-gray-50 dark:border-gray-800 pt-4">
        <div className="flex items-center gap-1">
          {stat.trend === "up" ? (
            <TrendingUp size={16} className="text-emerald-500" />
          ) : (
            <TrendingDown size={16} className="text-rose-500" />
          )}
          <span
            className={`text-sm font-bold ${stat.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}
          >
            {stat.percentage_of_total.toFixed(1)}%
          </span>
        </div>
        <Badge color={stat.badge_color}>
          {stat.trend === "up" ? "Gaining" : "Dropping"}
        </Badge>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <StatCard
          title="Users"
          value={stats.users.total}
          stat={stats.users}
          icon={ManageUsers}
        />
        <StatCard
          title="Barangays"
          value={stats.barangays.total}
          stat={stats.barangays}
          icon={MapPinHouse}
        />
        <StatCard
          title="Active Buoys"
          value={stats.buoys.total}
          stat={stats.buoys}
          icon={Buoy}
        />
        <StatCard
          title="Weekly Alerts"
          value={stats.recent_alerts.current_week}
          stat={stats.recent_alerts}
          icon={Megaphone}
        />
      </div>
    </div>
  );
};

export default DashboardCards;
