/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useContext, useEffect } from "react";
import ModelViewer from "../components/model-viewer/ModelViewer";
import TooltipPortal from "./TooltipPortal";
import API_BASE_URL from "../config/coreApi";
import { AppContext } from "../context/AppContext";

interface PrototypeData {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: string;
    position: string;
    isArchived: boolean;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;
  };
}

interface Props {
  refresh?: boolean;
}

export default function Prototype({ refresh }: Props) {
  const { token } = useContext(AppContext)!;
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [loading, setLoading] = useState(true);

  // Dynamically fetched prototypes
  const [leftImages, setLeftImages] = useState<PrototypeData[]>([]);
  const [rightImages, setRightImages] = useState<PrototypeData[]>([]);

  const fetchPrototypes = async () => {
    setLoading(true);
    try {
      const [leftRes, rightRes] = await Promise.all([
        fetch(`${API_BASE_URL}/prototypes/left`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/prototypes/right`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const leftData = await leftRes.json();
      const rightData = await rightRes.json();

      if (leftRes.ok) setLeftImages(leftData.data || []);
      if (rightRes.ok) setRightImages(rightData.data || []);
    } catch (err) {
      console.error("Error fetching prototypes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrototypes();
  }, [token, refresh]);

  if (loading) {
    return (
      <section className="w-full py-16 flex justify-center items-center">
        <div className="flex justify-center items-center gap-2 text-gray-500">
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#453EFE]" />
          Loading Prototype...
        </div>{" "}
      </section>
    );
  }

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16  rounded-lg dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <style>{`
        @keyframes floatUpDown {0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); }}
        .float-animation { animation: floatUpDown 3s ease-in-out infinite; }
        .float-animation:nth-child(2) { animation-delay: 0.3s; }
        .float-animation:nth-child(3) { animation-delay: 0.6s; }
        .float-animation:nth-child(4) { animation-delay: 0.9s; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] dark:text-blue-400 sm:text-3xl md:text-5xl transition-colors duration-300">
            THE X-STREAM PROTOTYPE
          </h2>

          <p className="max-w-6xl mx-auto pt-5 text-justify leading-relaxed text-[#023E8A] dark:text-gray-300 sm:text-xl md:text-xl transition-colors duration-300">
            The X-STREAM prototype showcases a solar-powered buoy model equipped
            with sensors for monitoring water levels, rainfall, wind speed,
            temperature, and humidity. It also demonstrates GPS tracking, siren
            alerts, and a real-time notification system and all integrated into
            a web-based dashboard for accessible and timely river monitoring.
          </p>
        </div>

        {/* DESKTOP VIEW LAYOUT */}
        <div className="relative flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-16 lg:gap-20">
          {/* LEFT IMAGES */}
          <div className="hidden flex-col justify-center gap-6 md:flex max-h-[550px] overflow-y-auto overflow-x-visible pr-3 py-15 px-10 scrollbar-hide relative">
            {leftImages.map((item, idx) => {
              const id = `left-${idx}`;
              return (
                <div
                  key={idx}
                  id={id}
                  ref={(el) => {
                    cardRefs.current[id] = el;
                  }}
                  className="float-animation group relative flex h-28 w-52 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  onMouseEnter={() => setActiveTooltip(id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/10 to-cyan-400/10 opacity-50"></div>
                  <img
                    src={item.attributes.image}
                    alt={item.attributes.title}
                    className="relative z-10 max-h-full max-w-full object-contain p-3"
                  />

                  {/* Tooltip Portal */}
                  {activeTooltip === id && cardRefs.current[id] && (
                    <TooltipPortal>
                      <div
                        className="z-[9999] w-72 rounded-xl bg-gradient-to-br from-[#023E8A] to-[#0353A4] p-4 text-white shadow-2xl backdrop-blur-sm transition-all duration-300 dark:from-blue-600 dark:to-blue-700"
                        style={{
                          position: "absolute",
                          top:
                            cardRefs.current[id].getBoundingClientRect().top -
                            110 +
                            window.scrollY,
                          left:
                            cardRefs.current[id].getBoundingClientRect().left +
                            0.5 *
                              cardRefs.current[id].getBoundingClientRect()
                                .width -
                            144,
                        }}
                      >
                        <h3 className="mb-1 text-lg font-bold">
                          {item.attributes.title}
                        </h3>
                        <p className="text-sm">{item.attributes.description}</p>
                        <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-8 border-r-8 border-b-0 border-l-8 border-t-[#023E8A] dark:border-t-blue-600 border-r-transparent border-l-transparent"></div>
                      </div>
                    </TooltipPortal>
                  )}
                </div>
              );
            })}
          </div>

          {/* CENTER MODEL VIEWER */}
          <div className="z-10 flex w-full max-w-sm items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-xl shadow-2xl sm:max-w-md md:h-[500px] md:w-[400px] dark:border-white/10 dark:bg-white/5">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20"></div>
            <div className="relative z-10 w-full h-full">
              <ModelViewer />
            </div>
          </div>

          {/* RIGHT IMAGES */}
          <div className="hidden flex-col justify-center gap-6 md:flex max-h-[550px] overflow-y-auto overflow-x-visible pr-3 py-8 px-4 scrollbar-hide relative">
            {rightImages.map((item, idx) => {
              const id = `right-${idx}`;
              return (
                <div
                  key={idx}
                  id={id}
                  ref={(el) => {
                    cardRefs.current[id] = el;
                  }}
                  className="float-animation group relative flex h-28 w-52 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg shadow-lg transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:shadow-2xl dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                  onMouseEnter={() => setActiveTooltip(id)}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/10 to-blue-400/10 opacity-50"></div>
                  <img
                    src={item.attributes.image}
                    alt={item.attributes.title}
                    className="relative z-10 max-h-full max-w-full object-contain p-3"
                  />

                  {/* Tooltip Portal */}
                  {activeTooltip === id && cardRefs.current[id] && (
                    <TooltipPortal>
                      <div
                        className="z-[9999] w-72 rounded-xl bg-gradient-to-br from-[#023E8A] to-[#0353A4] p-4 text-white shadow-2xl backdrop-blur-sm transition-all duration-300 dark:from-blue-600 dark:to-blue-700"
                        style={{
                          position: "absolute",
                          top:
                            cardRefs.current[id].getBoundingClientRect().top -
                            110 +
                            window.scrollY,
                          left:
                            cardRefs.current[id].getBoundingClientRect().left +
                            0.5 *
                              cardRefs.current[id].getBoundingClientRect()
                                .width -
                            144,
                        }}
                      >
                        <h3 className="mb-1 text-lg font-bold">
                          {item.attributes.title}
                        </h3>
                        <p className="text-sm">{item.attributes.description}</p>
                        <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-8 border-r-8 border-b-0 border-l-8 border-t-[#023E8A] dark:border-t-blue-600 border-r-transparent border-l-transparent"></div>
                      </div>
                    </TooltipPortal>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
