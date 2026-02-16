/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Printer } from "lucide-react";
import WindSpeedChart from "./WindSpeedChart";
import WindSpeedTable from "./WindSpeedTable";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

interface WindSpeedComponentCardProps {
  className?: string;
  alertsRef?: React.RefObject<AlertsContainerRef | null>;
}

/* ================= TYPES ================= */

export interface WindSpeedAttributes {
  buoyId: number;
  windSpeedM_s: string;
  windSpeedK_h: string;
  reportStatus: string | null;
  recordedAt: string;
  recordedDate: string;
  recordedTime: string;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
  buoy: {
    id: number;
    attributes: {
      buoyCode: string;
      riverName: string;
      wallHeight: number;
      riverHectare: number;
      latitude: number;
      longitude: number;
      attachment: string;
      status: string;
      maintenanceAt: string | null;
      createdDate: string;
      createdTime: string;
      updatedDate: string;
      updatedTime: string;
    };
  };
}

export interface WindSpeed {
  id: number;
  attributes: WindSpeedAttributes;
}

export interface WindSpeedResponse {
  status: string;
  message: string;
  data: WindSpeed[];
}

/* ================= COMPONENT ================= */

const WindSpeedComponentCard: React.FC<WindSpeedComponentCardProps> = ({
  className = "",
}) => {
  const { token, user } = useContext(AppContext)!;

  const buoyId = user?.barangay?.buoys?.[0]?.id;

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [windSpeed, setWindSpeed] = useState<WindSpeed[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWindSpeed = useCallback(async () => {
    if (!buoyId) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("buoy_id", String(buoyId));

      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);

      const res = await fetch(
        `${API_BASE_URL}/wind-readings?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data: WindSpeedResponse = await res.json();

      if (res.ok && data.data) {
        setWindSpeed(data.data);
      } else {
        setWindSpeed([]);
        console.error("Failed to fetch wind speed:", data);
      }
    } catch (error) {
      setWindSpeed([]);
      console.error("Error fetching wind speed:", error);
    } finally {
      setLoading(false);
    }
  }, [buoyId, fromDate, toDate, token]);

  /* Fetch on load */
  useEffect(() => {
    if (buoyId) {
      fetchWindSpeed();
    }
  }, [buoyId, fetchWindSpeed]);

  /* Refetch when date changes */
  useEffect(() => {
    if (buoyId) {
      fetchWindSpeed();
    }
  }, [fromDate, toDate]);

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          Wind Speed Historical Data
        </h3>

        <div className="flex flex-wrap items-end gap-4">
          {/* From */}
          <div>
            <label className="mr-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              From
            </label>
            <input
              type="datetime-local"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm
                         focus:border-blue-500 dark:border-gray-700
                         dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* To */}
          <div>
            <label className="mr-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              To
            </label>
            <input
              type="datetime-local"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm
                         focus:border-blue-500 dark:border-gray-700
                         dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Print */}
          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>

      {/* ================= BODY ================= */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        {loading ? (
          <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 h-[60vh] flex items-center justify-center rounded-lg">
            <div className="flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
              Please wait while loading...
            </div>
          </div>
        ) : (
          <>
            <WindSpeedChart windSpeed={windSpeed} />
            <WindSpeedTable windSpeed={windSpeed} />
          </>
        )}
      </div>
    </div>
  );
};

export default WindSpeedComponentCard;
