/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

import { useContext, useState, useEffect } from "react";
import API_BASE_URL from "../../config/coreApi";
import { AppContext } from "../../context/AppContext";
import { Archive, Phone, Plus, Upload } from "lucide-react";
import AddHotlinesModal from "./Hotlines/AddHotlinesModal";
import UpdateHotlinesModal from "./Hotlines/UpdateHotlinesModal";
import ArchiveHotlinesModal from "./Hotlines/ArchiveHotlinesModal";
import { AlertsContainerRef } from "../../components/Alert/AlertsContainer";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

/*  Hotline Interface */
interface HotlineData {
  id: number;
  description: string;
  number: string;
  isGlobal: boolean;
}

const dangerLevel = ({ alertsRef }: Props) => {
  const { token, user } = useContext(AppContext)!;
  const userType = user?.userType;

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const [selectedHotlines, setSelectedHotlines] = useState<HotlineData | null>(
    null,
  );

  /* ================= Disaster Alert ================= */
  const [selected, setSelected] = useState<"WHITE" | "BLUE" | "RED">("WHITE");

  const alertStatus = {
    WHITE:
      "Normal operations are maintained with continuous monitoring, coordinated efforts among teams, and systematic reporting to ensure smooth processes and timely issue resolution.",
    BLUE: "Early stage of emergency: heightened monitoring, coordination, & reporting. 50% of the DRRMD personnel shall remain on duty and on standby for possible deployment.",
    RED: "Imminent emergency: highest level monitoring, coordination, and Reporting. 100% of the DRRMD personnel shall remain on duty and on standby for immediate deployment.",
  };

  const getButtonClass = (color: "WHITE" | "BLUE" | "RED") => {
    const base =
      "flex items-center justify-center w-full h-[35px] rounded-full px-3 cursor-pointer border transition-colors";

    switch (color) {
      case "WHITE":
        return `${base} ${
          selected === "WHITE"
            ? "bg-gray-100 border-gray-400 dark:bg-gray-700 dark:border-gray-500 text-gray-900 dark:text-white"
            : "bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600"
        }`;
      case "BLUE":
        return `${base} ${
          selected === "BLUE"
            ? "bg-blue-500 text-white border-blue-600"
            : "border-blue-400 text-blue-600 dark:text-blue-400"
        }`;
      case "RED":
        return `${base} ${
          selected === "RED"
            ? "bg-red-500 text-white border-red-600"
            : "border-red-500 text-red-600 dark:text-red-400"
        }`;
    }
  };

  /* ================= Hotlines ================= */
  const [hotlines, setHotlines] = useState<HotlineData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchHotlines = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/hotlines`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const res = await response.json();

      if (response.ok && res.data) {
        setHotlines(
          res.data.map((item: any) => ({
            id: item.id,
            description: item.attributes.description,
            number: item.attributes.number,
            isGlobal: item.attributes.isGlobal,
            barangayId: item.attributes.barangayId, //Add this
            barangay: item.barangay, //keep the barangay object
          })),
        );
      }
    } catch (error) {
      console.error("Error fetching hotlines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotlines();
  }, []);

  const filteredHotlines = hotlines.filter((h) => {
    const term = searchTerm.toLowerCase();
    return (
      h.description.toLowerCase().includes(term) ||
      h.number.toLowerCase().includes(term)
    );
  });

  /* ================= Archive Handler ================= */
  const handleArchiveClick = (hotline: HotlineData) => {
    setSelectedHotlines(hotline);
    setShowArchive(true);
  };

  const groupedHotlines = (filteredHotlines || []).reduce(
    (acc: any, line: any) => {
      if (!line) return acc;

      // Handle both possible structures safely
      const barangayId =
        line?.attributes?.barangayId ?? line?.barangayId ?? null;

      const isGlobal = line?.attributes?.isGlobal ?? line?.isGlobal ?? false;

      const number = line?.attributes?.number ?? line?.number ?? "";

      const description =
        line?.attributes?.description ?? line?.description ?? "";

      const barangayName =
        line?.barangay?.name ??
        (line?.attributes?.isGlobal ? "Global Hotlines" : "Unknown Barangay");

      const key = isGlobal ? "global" : `barangay-${barangayId}`;

      if (!acc[key]) {
        acc[key] = {
          barangayName: isGlobal ? "Global Hotlines" : barangayName,
          hotlines: [],
        };
      }

      acc[key].hotlines.push({
        id: line.id,
        number,
        description,
        isGlobal,
      });

      return acc;
    },
    {},
  );

  const canEditHotline = (line: HotlineData) => {
    if (userType === "admin" && line.isGlobal) return true; // admin can edit only global
    if (userType === "barangay" && !line.isGlobal) return true; // barangay can edit only local
    return false; // otherwise, cannot edit
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {/* ================= DISASTER ALERT ================= */}
      <div className="w-full lg:w-[488px] bg-white dark:bg-gray-800 shadow rounded-2xl border border-[#D9D9D9] dark:border-gray-700 flex flex-col">
        <div className="w-full px-4 pt-4 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Disaster Alert Level
          </h3>
        </div>

        <hr className="my-3 border-gray-300 dark:border-gray-600" />

        <div className="grid grid-cols-3 gap-3 px-4">
          {(["WHITE", "BLUE", "RED"] as const).map((color) => (
            <button
              key={color}
              className={getButtonClass(color)}
              onClick={() => setSelected(color)}
            >
              {color}
            </button>
          ))}
        </div>

        <p className="px-4 py-4 text-sm text-center text-gray-700 dark:text-gray-400">
          {alertStatus[selected]}
        </p>
      </div>

      {/* ================= HOTLINES ================= */}
      <div className="w-full lg:w-[488px] h-[495px] bg-white dark:bg-gray-800 shadow-sm rounded-2xl border border-[#D9D9D9] dark:border-gray-700 p-4 flex flex-col">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Emergency Hotlines
          </h3>

          <button
            onClick={() => setShowAdd(true)}
            className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Search hotline..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-11 w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-[#453EFE]"
          />
        </div>

        <hr className="my-4 border-gray-300 dark:border-gray-600" />

        <div className="flex-1 overflow-y-auto pr-1">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading...
            </p>
          ) : filteredHotlines.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No hotlines found.
            </p>
          ) : (
            <ul className="space-y-3">
              {Object.entries(groupedHotlines).map(([key, group]: any) => (
                <li
                  key={key}
                  className="p-4 rounded-xl border border-[#D9D9D9] dark:border-gray-700 shadow-md bg-white dark:bg-gray-800"
                >
                  {/* Barangay Title (Only Once) */}
                  <h4 className="text-md font-semibold text-[#453EFE] mb-3">
                    {group.barangayName}
                  </h4>

                  {/* Hotline Numbers Only */}
                  <div className="space-y-3">
                    {group.hotlines.map((line: any) => (
                      <div
                        key={line.id}
                        className="flex justify-between items-center border-t pt-3"
                      >
                        <div className="flex gap-4">
                          <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-xl">
                            <Phone className="w-6 h-6 text-gray-800 dark:text-white/90" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-800 dark:text-white">
                              {line.description}
                            </p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-white">
                              {line.number}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {canEditHotline(line) && (
                            <button
                              onClick={() => {
                                setSelectedHotlines(line);
                                setShowUpdate(true);
                              }}
                              className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg"
                            >
                              <Upload className="w-5 h-5" />
                            </button>
                          )}
                          {canEditHotline(line) && (
                            <button
                              onClick={() => handleArchiveClick(line)}
                              className="w-9 h-9 flex items-center justify-center bg-[#453EFE] hover:bg-indigo-700 text-white rounded-lg"
                            >
                              <Archive className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ================= MODALS ================= */}
        {showAdd && (
          <AddHotlinesModal
            show={showAdd}
            onClose={() => setShowAdd(false)}
            token={token ?? ""}
            alertsRef={alertsRef}
            onAdded={fetchHotlines}
          />
        )}

        {showUpdate && selectedHotlines && (
          <UpdateHotlinesModal
            show={showUpdate}
            onClose={() => setShowUpdate(false)}
            data={selectedHotlines}
            token={token ?? ""}
            alertsRef={alertsRef}
            onUpdated={fetchHotlines}
          />
        )}

        {showArchive && selectedHotlines && (
          <ArchiveHotlinesModal
            show={showArchive}
            onClose={() => setShowArchive(false)}
            data={selectedHotlines}
            token={token ?? ""}
            alertsRef={alertsRef}
            onArchived={fetchHotlines}
          />
        )}
      </div>
    </div>
  );
};

export default dangerLevel;
