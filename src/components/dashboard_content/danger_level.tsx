/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState, useEffect } from "react";
import API_BASE_URL from "../../config/coreApi";
import { AppContext } from "../../context/AppContext";
import {
  Archive,
  Phone,
  Plus,
  Upload,
  Search,
  ShieldAlert,
  Headphones,
} from "lucide-react";
import AddHotlinesModal from "./Hotlines/AddHotlinesModal";
import UpdateHotlinesModal from "./Hotlines/UpdateHotlinesModal";
import ArchiveHotlinesModal from "./Hotlines/ArchiveHotlinesModal";
import { AlertsContainerRef } from "../../components/Alert/AlertsContainer";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

interface HotlineData {
  [x: string]: any;
  id: number;
  description: string;
  number: string;
  isGlobal: boolean;
}

const DangerLevel = ({ alertsRef }: Props) => {
  const { token, user } = useContext(AppContext)!;
  const userType = user?.userType;

  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [selectedHotlines, setSelectedHotlines] = useState<HotlineData | null>(
    null,
  );

  /* ================= Disaster Alert Logic ================= */
  const [selected, setSelected] = useState<"WHITE" | "BLUE" | "RED">("WHITE");

  const alertStatus = {
    WHITE:
      "Normal operations. Continuous monitoring and coordinated reporting are active to ensure systematic issue resolution.",
    BLUE: "Early stage emergency. Heightened monitoring active. 50% of DRRMD personnel are on standby for deployment.",
    RED: "Imminent emergency. Highest monitoring level. 100% of DRRMD personnel are on immediate standby duty.",
  };

  const getAlertButtonClass = (color: "WHITE" | "BLUE" | "RED") => {
    const isActive = selected === color;
    const base =
      "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 shadow-sm border";

    if (color === "WHITE") {
      return isActive
        ? `${base} bg-slate-100 border-slate-300 text-slate-700 ring-2 ring-slate-200 dark:bg-slate-700 dark:text-white`
        : `${base} bg-white border-transparent text-slate-400 hover:bg-slate-50 dark:bg-slate-800`;
    }
    if (color === "BLUE") {
      return isActive
        ? `${base} bg-blue-500 border-blue-600 text-white ring-2 ring-blue-100`
        : `${base} bg-white border-transparent text-blue-500 hover:bg-blue-50 dark:bg-slate-800`;
    }
    return isActive
      ? `${base} bg-red-500 border-red-600 text-white ring-2 ring-red-100`
      : `${base} bg-white border-transparent text-red-500 hover:bg-red-50 dark:bg-slate-800`;
  };

  /* ================= Hotlines Logic ================= */
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
            barangayName:
              item.barangay?.name ||
              (item.attributes.isGlobal ? "Global Services" : "Local Area"),
          })),
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotlines();
  }, []);

  const grouped = hotlines
    .filter(
      (h) =>
        h.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.number.includes(searchTerm),
    )
    .reduce((acc: any, line) => {
      const key = line.isGlobal ? "Global" : line.barangayName;
      if (!acc[key]) acc[key] = [];
      acc[key].push(line);
      return acc;
    }, {});

  const canEdit = (line: HotlineData) =>
    (userType === "admin" && line.isGlobal) ||
    (userType === "barangay" && !line.isGlobal);

  return (
    <div className="flex flex-col gap-5 w-full lg:max-w-[488px]">
      {/* DISASTER ALERT CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-rose-50 dark:bg-rose-900/20 rounded-xl">
              <ShieldAlert className="w-5 h-5 text-rose-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Alert Level
            </h3>
          </div>

          <div className="flex bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl gap-2">
            {(["WHITE", "BLUE", "RED"] as const).map((color) => (
              <button
                key={color}
                className={getAlertButtonClass(color)}
                onClick={() => setSelected(color)}
              >
                {color}
              </button>
            ))}
          </div>

          <div className="mt-5 p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 italic">
              "{alertStatus[selected]}"
            </p>
          </div>
        </div>
      </div>

      {/* HOTLINES CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-[550px]">
        <div className="p-6 pb-2">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
                <Headphones className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Emergency Hotlines
              </h3>
            </div>
            <button
              onClick={() => setShowAdd(true)}
              className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none active:scale-95"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
          {loading ? (
            <div className="flex justify-center py-10 text-slate-400 animate-pulse">
              Updating directory...
            </div>
          ) : Object.keys(grouped).length === 0 ? (
            <div className="text-center py-10 text-slate-400 text-sm italic">
              No records found
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(grouped).map(([barangay, lines]: any) => (
                <div key={barangay} className="space-y-3">
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-indigo-500 px-1">
                    {barangay}
                  </h4>
                  {lines.map((line: any) => (
                    <div
                      key={line.id}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 transition-colors">
                          <Phone className="w-5 h-5 text-slate-400 group-hover:text-indigo-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide leading-none mb-1">
                            {line.description}
                          </p>
                          <p className="text-xl font-black text-slate-800 dark:text-white tracking-tight leading-none">
                            {line.number}
                          </p>
                        </div>
                      </div>

                      {canEdit(line) && (
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setSelectedHotlines(line);
                              setShowUpdate(true);
                            }}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedHotlines(line);
                              setShowArchive(true);
                            }}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODALS remain same but pass setHotlines if needed */}
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
  );
};

export default DangerLevel;
