import { useState, useRef } from "react";
import ModelViewer from "../components/model-viewer/ModelViewer";
import TooltipPortal from "./TooltipPortal";

const leftImages = [
  {
    src: "/sensors/1.png",
    title: "Solar Charge Controller",
    description:
      "Regulates power from solar panels to batteries, ensuring optimal charging and system protection.",
  },
  {
    src: "/sensors/2.png",
    title: "Rain Sensor",
    description:
      "Measures precipitation levels and rainfall intensity for weather monitoring.",
  },
  {
    src: "/sensors/3.png",
    title: "Warning Light",
    description:
      "Visual alert system that activates during emergencies or hazardous conditions.",
  },
  {
    src: "/sensors/4.png",
    title: "Battery System",
    description:
      "Stores solar energy to power the buoy systems during nighttime or cloudy conditions.",
  },
  {
    src: "/sensors/4.png",
    title: "Battery System",
    description:
      "Stores solar energy to power the buoy systems during nighttime or cloudy conditions.",
  },
  {
    src: "/sensors/4.png",
    title: "Battery System",
    description:
      "Stores solar energy to power the buoy systems during nighttime or cloudy conditions.",
  },
];

const rightImages = [
  {
    src: "/sensors/5.png",
    title: "Pressure Sensor",
    description:
      "Monitors atmospheric and water pressure changes for weather forecasting.",
  },
  {
    src: "/sensors/6.png",
    title: "GPS Module",
    description:
      "Tracks the buoy's exact location and movement patterns in real-time.",
  },
  {
    src: "/sensors/7.png",
    title: "Anemometer",
    description:
      "Measures wind speed and direction for meteorological data collection.",
  },
  {
    src: "/sensors/8.png",
    title: "Water Quality Sensor",
    description:
      "Analyzes pH, salinity, temperature, and other water quality parameters.",
  },
];

export default function Prototype() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <section className="w-full bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16  rounded-lg dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .float-animation {
          animation: floatUpDown 3s ease-in-out infinite;
        }
        .float-animation:nth-child(2) {
          animation-delay: 0.3s;
        }
        .float-animation:nth-child(3) {
          animation-delay: 0.6s;
        }
        .float-animation:nth-child(4) {
          animation-delay: 0.9s;
        }

        /* Hide scrollbars but keep scrolling */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] dark:text-blue-400 sm:text-3xl md:text-5xl transition-colors duration-300">
            THE COASTELLA PROTOTYPE
          </h2>
          <p className="max-w-4xl mx-auto pt-5 text-center leading-relaxed text-[#023E8A] dark:text-gray-300 sm:text-xl md:text-xl transition-colors duration-300">
            The COASTELLA prototype showcases a solar-powered buoy model
            equipped with sensors for monitoring water levels, wind speed, wave
            activity, and water quality. It also demonstrates GPS tracking,
            siren alerts, and a real-time notification system — all integrated
            into a web-based dashboard for accessible and timely coastal
            monitoring.
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
                    src={item.src}
                    alt={item.title}
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
                            144, // center w-72
                        }}
                      >
                        <h3 className="mb-1 text-lg font-bold">{item.title}</h3>
                        <p className="text-sm">{item.description}</p>
                        <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-8 border-r-8 border-b-0 border-l-8 border-t-[#023E8A] dark:border-t-blue-600 border-r-transparent border-l-transparent"></div>
                      </div>
                    </TooltipPortal>
                  )}
                </div>
              );
            })}
          </div>

          {/* CENTER MODEL VIEWER */}
          <div className="z-10 flex w-full max-w-sm items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-xl  shadow-2xl sm:max-w-md md:h-[500px] md:w-[400px] dark:border-white/10 dark:bg-white/5">
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
                    src={item.src}
                    alt={item.title}
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
                            144, // center w-72
                        }}
                      >
                        <h3 className="mb-1 text-lg font-bold">{item.title}</h3>
                        <p className="text-sm">{item.description}</p>
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
