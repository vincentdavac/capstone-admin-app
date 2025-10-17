import { useState } from 'react';
import ModelViewer from '../components/model-viewer/ModelViewer';

const leftImages = [
  {
    src: '/sensors/1.png',
    title: 'Solar Charge Controller',
    description:
      'Regulates power from solar panels to batteries, ensuring optimal charging and system protection.',
  },
  {
    src: '/sensors/2.png',
    title: 'Rain Sensor',
    description:
      'Measures precipitation levels and rainfall intensity for weather monitoring.',
  },
  {
    src: '/sensors/3.png',
    title: 'Warning Light',
    description:
      'Visual alert system that activates during emergencies or hazardous conditions.',
  },
  {
    src: '/sensors/4.png',
    title: 'Battery System',
    description:
      'Stores solar energy to power the buoy systems during nighttime or cloudy conditions.',
  },
];

const rightImages = [
  {
    src: '/sensors/5.png',
    title: 'Pressure Sensor',
    description:
      'Monitors atmospheric and water pressure changes for weather forecasting.',
  },
  {
    src: '/sensors/6.png',
    title: 'GPS Module',
    description:
      "Tracks the buoy's exact location and movement patterns in real-time.",
  },
  {
    src: '/sensors/7.png',
    title: 'Anemometer',
    description:
      'Measures wind speed and direction for meteorological data collection.',
  },
  {
    src: '/sensors/8.png',
    title: 'Water Quality Sensor',
    description:
      'Analyzes pH, salinity, temperature, and other water quality parameters.',
  },
];

export default function Prototype() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <section className="w-full bg-white py-16  outline-1 outline-[#959ea5] rounded-lg">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-2xl font-bold tracking-wide text-[#1E3A8A] sm:text-3xl md:text-5xl">
            THE COASTELLA PROTOTYPE
          </h2>
          <p className="max-w-8xl mx-auto pt-5 text-center leading-relaxed text-[#023E8A] sm:text-xl md:text-xl">
            The COASTELLA prototype showcases a solar-powered buoy model
            equipped with sensors for monitoring water levels, wind speed, wave
            activity, and water quality. It also demonstrates GPS tracking,
            siren alerts, and a real-time notification system — all integrated
            into a web-based dashboard for accessible and timely coastal
            monitoring.
          </p>
        </div>

        {/* DESKTOP VIEW LAYOUT */}
        <div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
          {/* LEFT IMAGES */}
          <div className="hidden flex-col justify-center gap-6 md:flex">
            {leftImages.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex h-25 w-44 items-center justify-center rounded-xl border border-[#023E8A] bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onMouseEnter={() => setActiveTooltip(`left-${idx}`)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain p-2"
                />

                <div
                  className={`absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 transform rounded-lg bg-[#023E8A] p-4 text-white shadow-xl transition-all duration-300 ${
                    activeTooltip === `left-${idx}`
                      ? 'visible opacity-100'
                      : 'invisible opacity-0'
                  }`}
                >
                  <h3 className="mb-1 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                  <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-8 border-r-8 border-b-0 border-l-8 border-t-[#023E8A] border-r-transparent border-l-transparent"></div>
                </div>
              </div>
            ))}
          </div>

          {/* 3D MODEL VIEWER */}
          <div className="z-10 flex w-full max-w-sm items-center justify-center rounded-xl border border-[#023E8A] bg-white p-4 shadow-lg sm:max-w-md md:h-[500px] md:w-[400px]">
            <ModelViewer />
          </div>

          {/* RIGHT IMAGES */}
          <div className="hidden flex-col justify-center gap-6 md:flex">
            {rightImages.map((item, idx) => (
              <div
                key={idx}
                className="group relative flex h-25 w-44 items-center justify-center rounded-xl border border-[#023E8A] bg-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onMouseEnter={() => setActiveTooltip(`right-${idx}`)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain p-2"
                />

                <div
                  className={`absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 transform rounded-lg bg-[#023E8A] p-4 text-white shadow-xl transition-all duration-300 ${
                    activeTooltip === `right-${idx}`
                      ? 'visible opacity-100'
                      : 'invisible opacity-0'
                  }`}
                >
                  <h3 className="mb-1 text-lg font-bold">{item.title}</h3>
                  <p className="text-sm">{item.description}</p>
                  <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-8 border-r-8 border-b-0 border-l-8 border-t-[#023E8A] border-r-transparent border-l-transparent"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE VIEW LAYOUT */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 md:hidden">
          {[...leftImages, ...rightImages].map((item, idx) => (
            <div
              key={idx}
              className="group relative flex h-24 w-full items-center justify-center rounded-xl border border-gray-200 bg-white shadow-md"
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-16 w-16 object-contain"
              />

              <div className="invisible absolute -bottom-2 left-1/2 z-50 w-48 -translate-x-1/2 -translate-y-2 translate-y-full transform rounded-lg bg-[#023E8A] p-3 text-white opacity-0 shadow-xl transition-all duration-300 group-hover:visible group-hover:translate-y-full group-hover:opacity-100">
                <h3 className="mb-1 text-sm font-bold">{item.title}</h3>
                <p className="text-xs">{item.description}</p>
                <div className="absolute -top-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-t-0 border-r-8 border-b-8 border-l-8 border-r-transparent border-b-[#023E8A] border-l-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
