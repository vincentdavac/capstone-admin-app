/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  MapPin,
  Navigation,
  Battery,
  Bell,
  BellOff,
  Radio,
} from "lucide-react";

export default function BuoyCondition() {
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(85.0);

  const initialLocation = { lat: 14.654321, lng: 120.987654 };
  const currentLocation = { lat: 14.65489, lng: 120.9879 };

  // Calculate drift distance in meters
  const calculateDrift = () => {
    const R = 6371e3;
    const φ1 = (initialLocation.lat * Math.PI) / 180;
    const φ2 = (currentLocation.lat * Math.PI) / 180;
    const Δφ = ((currentLocation.lat - initialLocation.lat) * Math.PI) / 180;
    const Δλ = ((currentLocation.lng - initialLocation.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(1);
  };

  const getBatteryStatus = (level: any) => {
    if (level <= 25)
      return {
        color: "from-red-500 to-red-600",
        status: "Critical",
        glow: "shadow-red-500/50",
        bgLight: "bg-red-50",
        bgDark: "dark:bg-red-950/20",
        borderLight: "hover:border-red-400",
        borderDark: "dark:hover:border-red-500/50",
        shadowLight: "hover:shadow-red-100",
        shadowDark: "dark:hover:shadow-red-500/20",
      };
    if (level <= 50)
      return {
        color: "from-yellow-500 to-orange-500",
        status: "Low",
        glow: "shadow-yellow-500/50",
        bgLight: "bg-yellow-50",
        bgDark: "dark:bg-yellow-950/20",
        borderLight: "hover:border-yellow-400",
        borderDark: "dark:hover:border-yellow-500/50",
        shadowLight: "hover:shadow-yellow-100",
        shadowDark: "dark:hover:shadow-yellow-500/20",
      };
    if (level <= 75)
      return {
        color: "from-amber-500 to-yellow-500",
        status: "Good",
        glow: "shadow-amber-500/50",
        bgLight: "bg-amber-50",
        bgDark: "dark:bg-amber-950/20",
        borderLight: "hover:border-amber-400",
        borderDark: "dark:hover:border-amber-500/50",
        shadowLight: "hover:shadow-amber-100",
        shadowDark: "dark:hover:shadow-amber-500/20",
      };
    return {
      color: "from-emerald-500 to-green-500",
      status: "Excellent",
      glow: "shadow-emerald-500/50",
      bgLight: "bg-emerald-50",
      bgDark: "dark:bg-emerald-950/20",
      borderLight: "hover:border-emerald-400",
      borderDark: "dark:hover:border-emerald-500/50",
      shadowLight: "hover:shadow-emerald-100",
      shadowDark: "dark:hover:shadow-emerald-500/20",
    };
  };

  const battery = getBatteryStatus(batteryLevel);
  const driftDistance = calculateDrift();

  return (
    <div className="p-5">
      {/* Main Grid */}
      <div className="max-w-10xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Initial Deployment Card */}
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 border  dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 dark:hover:border-cyan-500/50 hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-cyan-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 dark:from-cyan-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-cyan-500/10 group-hover:bg-blue-200 dark:group-hover:bg-cyan-500/20 rounded-lg transition-colors">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-cyan-400">
                Deployment Point
              </h3>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-sm text-slate-900 dark:text-white">
                Lat: {initialLocation.lat}°
              </p>
              <p className="font-mono text-sm text-slate-900 dark:text-white">
                Lng: {initialLocation.lng}°
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/50">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Origin coordinates
              </p>
            </div>
          </div>
        </div>

        {/* Current GPS with Drift Animation */}
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl p-4 border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-500/10 group-hover:bg-blue-200 dark:group-hover:bg-blue-500/20 rounded-lg transition-colors">
                <Navigation className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-pulse" />
              </div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Current Position
              </h3>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-sm text-slate-900 dark:text-white">
                Lat: {currentLocation.lat}°
              </p>
              <p className="font-mono text-sm text-slate-900 dark:text-white">
                Lng: {currentLocation.lng}°
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Drift distance
              </p>
              <span className="font-semibold text-sm text-blue-600 dark:text-blue-400">
                {driftDistance}m
              </span>
            </div>
          </div>
        </div>

        {/* Battery Health with Interactive Progress */}
        <div
          className={`group relative rounded-2xl p-4 border border-slate-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${battery.bgLight} ${battery.bgDark} ${battery.borderLight} ${battery.borderDark} ${battery.shadowLight} ${battery.shadowDark}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-lg bg-gradient-to-br ${battery.color} bg-opacity-20`}
                >
                  <Battery className="w-4 h-4 text-white" />
                </div>
                <h3
                  className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                    battery.status === "Critical"
                      ? "text-red-600 dark:text-red-400"
                      : battery.status === "Low"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : battery.status === "Good"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  Battery
                </h3>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${battery.color} text-white font-semibold`}
              >
                {battery.status}
              </span>
            </div>

            <div className="relative">
              <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${battery.color} transition-all duration-700 ease-out shadow-lg ${battery.glow}`}
                  style={{ width: `${batteryLevel}%` }}
                />
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <p
                className={`font-bold text-xl ${battery.color} dark:text-white`}
              >
                {batteryLevel}%
              </p>
              <button
                onClick={() => setBatteryLevel(Math.max(0, batteryLevel - 10))}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Simulate drain
              </button>
            </div>
          </div>
        </div>

        {/* Sound Alarm Card */}
        <div
          className={`group relative rounded-2xl p-4 border transition-all duration-300 hover:-translate-y-1 ${
            alarmEnabled
              ? "bg-red-50 dark:bg-red-950/20 border-red-500 shadow-lg shadow-red-500/30 hover:border-red-500 hover:shadow-red-500/30"
              : "bg-white dark:bg-gray-800 border-slate-200 hover:border-blue-400 dark:hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-100 dark:hover:shadow-blue-500/20"
          }`}
        >
          {/* Subtle hover overlay */}
          <div
            className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
              alarmEnabled
                ? "bg-red-500/10 opacity-100"
                : "bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100"
            }`}
          />

          <div className="relative z-10">
            {/* Header with icon */}
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`p-2 rounded-lg transition-colors ${
                  alarmEnabled
                    ? "bg-red-200 dark:bg-red-700/20"
                    : "bg-blue-100 dark:bg-blue-500/10 group-hover:bg-blue-200 dark:group-hover:bg-blue-500/20"
                }`}
              >
                {alarmEnabled ? (
                  <Bell className="w-4 h-4 text-red-600 dark:text-red-400 animate-pulse" />
                ) : (
                  <BellOff className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <h3
                className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                  alarmEnabled
                    ? "text-red-600 dark:text-red-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              >
                Sound Alarm
              </h3>
            </div>

            {/* Toggle button */}
            <div className="flex items-center justify-center py-2">
              <button
                onClick={() => setAlarmEnabled(!alarmEnabled)}
                className={`relative inline-flex h-10 w-20 items-center rounded-full transition-all duration-300 ${
                  alarmEnabled
                    ? "bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50"
                    : "bg-blue-300 dark:bg-blue-700"
                }`}
              >
                <span
                  className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                    alarmEnabled ? "translate-x-11" : "translate-x-2"
                  }`}
                >
                  {alarmEnabled && (
                    <Radio className="w-3.5 h-3.5 text-red-500 m-auto mt-1.5 animate-pulse" />
                  )}
                </span>
              </button>
            </div>

            {/* Footer with status */}
            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Status
              </p>
              <span
                className={`font-semibold text-sm ${
                  alarmEnabled
                    ? "text-red-600 dark:text-red-400"
                    : "text-blue-600 dark:text-blue-400"
                }`}
              >
                {alarmEnabled ? "Alarm Active" : "Alarm Inactive"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
