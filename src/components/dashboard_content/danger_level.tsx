/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState, useEffect } from "react";
import API_BASE_URL from "../../config/coreApi";
import { AppContext } from "../../context/AppContext";
import { Phone } from "lucide-react";

const dangerLevel = () => {
  const { token } = useContext(AppContext)!;

  // Disaster Alert State
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

  // Hotlines state
  const [hotlines, setHotlines] = useState<
    { id: number; description: string; number: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

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
        // Map to only required fields
        const data = res.data.map((item: any) => ({
          id: item.id,
          description: item.attributes.description,
          number: item.attributes.number,
        }));
        setHotlines(data);
      } else {
        console.error("Failed to fetch hotlines:", res);
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

  return (
    <>
      <div className="grid grid-cols-1 gap-3">
        {/* Disaster Alert */}
        <div className="w-full lg:w-[512px] h-auto bg-white dark:bg-gray-800 shadow rounded-2xl border border-[#D9D9D9] dark:border-gray-700 flex flex-col">
          {/* Header */}
          <div className="w-full px-4 pt-4 text-center">
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
              Disaster Alert Level
            </h3>
          </div>
          <hr className="w-full border-t border-gray-300 dark:border-gray-600" />

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 w-full p-4 self-center mt-3 justify-center">
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

          {/* Alert Status */}
          <div className="text-center mt-2 px-4 pb-4">
            <p className="text-gray-700 dark:text-gray-400 text-sm leading-snug">
              {alertStatus[selected]}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-[512px] min-h-[300px] lg:h-[495px] bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-[#D9D9D9] dark:border-gray-700 p-4 overflow-auto">
          {/* Header */}
          <div className="w-full px-4 text-center">
            <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
              Emergency Hotlines
            </h3>
          </div>
          <hr className="w-full border-t border-gray-300 dark:border-gray-600 mb-4" />

          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Loading...
            </p>
          ) : hotlines.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No hotlines available.
            </p>
          ) : (
            <ul className="space-y-3">
              {hotlines.map((line) => (
                <li
                  key={line.id}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-[#D9D9D9] dark:border-gray-700 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex-shrink-0">
                      <Phone className="w-6 h-6 text-gray-800 dark:text-white/90" />
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <span className="font-semibold text-gray-800 dark:text-white text-sm">
                        {line.description}
                      </span>
                      <span className="font-bold text-2xl text-gray-800 dark:text-white">
                        {line.number}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default dangerLevel;
