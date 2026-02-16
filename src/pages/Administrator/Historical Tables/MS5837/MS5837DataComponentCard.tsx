/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Printer } from "lucide-react";
import MS5837DataTable from "./MS5837DataTable";
import MS5837DataChart from "./MS5837DataChart";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

/* ================= TYPES ================= */

export interface MS5837Attributes {
  buoyId: number;
  temperatureCelsius: string;
  temperatureFahrenheit: string;
  depthMeters: string;
  depthFeet: string;
  waterAltitude: string;
  waterPressure: string;
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

export interface MS5837Data {
  id: number;
  attributes: MS5837Attributes;
}

export interface MS5837Response {
  status: string;
  message: string;
  data: MS5837Data[];
}

/* ================= COMPONENT ================= */

interface MS5837DataComponentCardProps {
  className?: string;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const MS5837DataComponentCard: React.FC<MS5837DataComponentCardProps> = ({
  className = "",
}) => {
  const { token, user } = useContext(AppContext)!;
  const buoyId = user?.barangay?.buoys?.[0]?.id;

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [ms5837Data, setMs5837Data] = useState<MS5837Data[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMS5837Data = useCallback(async () => {
    if (!buoyId) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("buoy_id", String(buoyId));
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);

      const res = await fetch(
        `${API_BASE_URL}/ms5837-data?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data: MS5837Response = await res.json();

      if (res.ok && data.data) {
        setMs5837Data(data.data);
      } else {
        setMs5837Data([]);
        console.error("Failed to fetch MS5837 data:", data);
      }
    } catch (error) {
      setMs5837Data([]);
      console.error("Error fetching MS5837 data:", error);
    } finally {
      setLoading(false);
    }
  }, [buoyId, fromDate, toDate, token]);

  /* Fetch on load and when buoy changes */
  useEffect(() => {
    if (buoyId) fetchMS5837Data();
  }, [buoyId, fetchMS5837Data]);

  /* Refetch when dates change */
  useEffect(() => {
    if (buoyId) fetchMS5837Data();
  }, [fromDate, toDate]);

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          MS5837 Historical Data
        </h3>

        <div className="flex flex-wrap items-end gap-4">
          {/* From Date */}
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

          {/* To Date */}
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

      {/* Card Body */}
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
            <MS5837DataChart ms5837Data={ms5837Data} />
            <MS5837DataTable ms5837Data={ms5837Data} />
          </>
        )}
      </div>
    </div>
  );
};

export default MS5837DataComponentCard;
