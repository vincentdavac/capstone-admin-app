/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */

import { useContext, useState, useEffect } from "react";
import API_BASE_URL from "../../../config/coreApi";
import { AppContext } from "../../../context/AppContext";
import { Archive, Phone, Plus, Upload } from "lucide-react";
import AddHotlinesModal from "../BarangayHotlines/AddHotlinesModal";
import UpdateHotlinesModal from "../BarangayHotlines/UpdateHotlinesModal";
import ArchiveHotlinesModal from "../BarangayHotlines/ArchiveHotlinesModal";
import { AlertsContainerRef } from "../../../components/Alert/AlertsContainer";

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
  const { token } = useContext(AppContext)!;

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const [selectedHotlines, setSelectedHotlines] = useState<HotlineData | null>(
    null
  );

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
          }))
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

  return (
    <div className="grid grid-cols-1 gap-3">
      {/* ================= HOTLINES ================= */}
      <div className="w-full lg:w-[488px] h-[550px] bg-white dark:bg-gray-800 shadow- rounded-2xl border border-[#D9D9D9] dark:border-gray-700 p-4 flex flex-col">
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
              {filteredHotlines.map((line) => (
                <li
                  key={line.id}
                  className="p-4 rounded-xl border border-[#D9D9D9] dark:border-gray-700 shadow-md hover:shadow-lg transition bg-white dark:bg-gray-800"
                >
                  <div className="flex justify-between items-center">
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
                      <button
                        onClick={() => {
                          if (line.isGlobal) return;
                          setSelectedHotlines(line);
                          setShowUpdate(true);
                        }}
                        disabled={line.isGlobal}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg transition
                        ${
                          !line.isGlobal
                            ? "bg-[#453EFE] hover:bg-indigo-700 text-white"
                            : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed opacity-60"
                        }`}
                      >
                        <Upload className="w-5 h-5" />
                      </button>

                      <button
                        onClick={() => {
                          if (line.isGlobal) return;
                          handleArchiveClick(line);
                        }}
                        disabled={line.isGlobal}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg transition
                        ${
                          !line.isGlobal
                            ? "bg-[#453EFE] hover:bg-indigo-700 text-white"
                            : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed opacity-60"
                        }`}
                      >
                        <Archive className="w-5 h-5" />
                      </button>
                    </div>
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
