/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState, useCallback } from "react";
import { Printer } from "lucide-react";
import RainMonitoringChart from "./RainMonitoringChart";
import RainMonitoringTable from "./RainMonitoringTable";
import API_BASE_URL from "../../../../config/coreApi";
import { AppContext } from "../../../../context/AppContext";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";

/* ===== Types ===== */
export interface RainSensorAttributes {
  buoyId: number;
  percentage: number;
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

export interface RainSensorReading {
  id: number;
  attributes: RainSensorAttributes;
}

export interface RainSensorResponse {
  status: string;
  message: string;
  data: RainSensorReading[];
}

/* ===== Props ===== */
interface RainMonitoringComponentCardProps {
  className?: string;
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

/* ===== Component ===== */
const RainMonitoringComponentCard: React.FC<
  RainMonitoringComponentCardProps
> = ({ className = "" }) => {
  const { token, user } = useContext(AppContext)!;
  const buoyId = user?.barangay?.buoys?.[0]?.id;
  const buoyCode = user?.barangay?.buoys?.[0]?.buoyCode;

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [rainData, setRainData] = useState<RainSensorReading[]>([]);
  const [loading, setLoading] = useState(false);

  /* ===== Fetch Data Function ===== */
  const fetchRainData = useCallback(async () => {
    if (!buoyId) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("buoy_id", String(buoyId));
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);

      const res = await fetch(
        `${API_BASE_URL}/rain-sensor-data?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data: RainSensorResponse = await res.json();

      if (res.ok && data.data) {
        setRainData(data.data);
      } else {
        setRainData([]);
        console.error("Failed to fetch rain sensor data:", data);
      }
    } catch (error) {
      setRainData([]);
      console.error("Error fetching rain sensor data:", error);
    } finally {
      setLoading(false);
    }
  }, [buoyId, fromDate, toDate, token]);

  // ================= REPORT GENERATOR =================
  const generateReport = useCallback(async () => {
    if (!buoyId) return;

    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("buoy_id", String(buoyId));
      if (fromDate) params.append("from", fromDate);
      if (toDate) params.append("to", toDate);

      const res = await fetch(
        `${API_BASE_URL}/rain-sensor-report?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/pdf", // tell server we expect a PDF
          },
        },
      );

      if (!res.ok) {
        console.error("Failed to fetch report, status:", res.status);
        return;
      }

      // Get the response as a Blob (binary)
      const blob = await res.blob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `rain_monitoring_report_${buoyCode}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setLoading(false);
    }
  }, [buoyId, fromDate, toDate, token]);

  /* ===== Fetch on load or date change ===== */
  useEffect(() => {
    if (buoyId) fetchRainData();
  }, [buoyId, fetchRainData]);

  useEffect(() => {
    if (buoyId) fetchRainData();
  }, [fromDate, toDate]);

  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Header */}
      <div className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
          Rain Sensor Historical Data
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
            onClick={generateReport}
            className="flex items-center gap-2 rounded-lg bg-[#453EFE] px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            <Printer size={16} />
            Generate Report
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        {loading ? (
          <div className="p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 h-[60vh] flex items-center justify-center rounded-lg">
            <div className="flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
              Please wait while loading...
            </div>
          </div>
        ) : rainData.length === 0 ? (
          <div className="h-[200px] flex items-center justify-center text-gray-400">
            No rain sensor data available
          </div>
        ) : (
          <>
            <RainMonitoringChart rainData={rainData} />
            <RainMonitoringTable rainData={rainData} />
          </>
        )}
      </div>
    </div>
  );
};

export default RainMonitoringComponentCard;
