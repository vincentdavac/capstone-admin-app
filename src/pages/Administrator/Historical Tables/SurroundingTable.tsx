import React, { useState } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb";

const staticChartData = [
  { name: "Mar", value: 1.2 },
  { name: "Apr", value: 1.4 },
  { name: "May", value: 1.6 },
  { name: "Jun", value: 1.8 },
  { name: "Jul", value: 2.0 },
  { name: "Aug", value: 2.2 },
  { name: "Sept", value: 2.4 },
];

const PlaceholderChart: React.FC<{ selected: string }> = ({ selected }) => {
  const [timeRange, setTimeRange] = useState("Month");
  const titleMap: { [key: string]: string } = {
    waterLevel: "Surroundings Temperature Level",
    SST: "Sea Surface Temp",
    waterPressure: "Water Pressure",
    atmosphericPressure: "Atmospheric Pressure",
    waveHeight: "Wave Height",
    waterDepth: "Water Depth",
    waterTemp: "Water Temp",
    windSpeed: "Wind Speed",
    rainFall: "Rainfall",
  };
  const title = titleMap[selected] || "Chart Data";
  const unit = selected === "waterLevel" ? "m" : "unit";

  const timeOptions = ["Day", "Week", "Month"];

  return (
    <div className="w-full h-full p-2 sm:p-4">
      {/* Chart Title and INTERACTIVE TIME RANGE BUTTONS - Added flex-wrap for responsiveness */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        {/* Text color for dark mode */}
        <h2 className="text-lg font-normal text-gray-700 dark:text-gray-200 flex-shrink-0">
          {title}
        </h2>
        {/* Border and background for dark mode - flex-shrink-0 to prevent shrinking */}
        <div className="flex flex-shrink-0 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
          {timeOptions.map((option) => (
            <button
              key={option}
              className={`px-3 py-1 text-sm transition-colors border-r last:border-r-0 border-gray-300 dark:border-gray-600 ${
                timeRange === option
                  ? "bg-white text-gray-900 shadow-md dark:bg-gray-700 dark:text-white"
                  : "bg-transparent text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
              onClick={() => setTimeRange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Line Chart Area Placeholder with Static Data Visualization */}
      <div className="h-[250px] p-2 relative">
        {/* Text color for dark mode */}
        <div className="absolute top-0 w-full text-center text-xs text-gray-500 dark:text-gray-400">
          Data for: {timeRange} (Static Example)
        </div>
        <div className="h-full relative flex flex-col justify-end">
          {/* Axis lines and text color for dark mode */}
          {/* Adjusted left-[-30px] to accommodate small screen margins */}
          <div className="absolute inset-0 border-l border-b border-gray-300 dark:border-gray-600 ml-[35px] sm:ml-[45px]">
            {[0.5, 1.0, 1.5, 2.0, 2.4].map((y, i) => (
              <div
                key={i}
                className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                style={{ bottom: `${(y / 2.4) * 100}%` }}
              >
                <span className="absolute left-[-35px] sm:left-[-45px] text-xs text-gray-500 dark:text-gray-400 bottom-0 pr-1 text-right">
                  {y}
                  {unit}
                </span>
              </div>
            ))}
            <span className="absolute left-[-35px] sm:left-[-45px] text-xs text-gray-500 dark:text-gray-400 bottom-0 pr-1 text-right">
              0{unit}
            </span>
          </div>

          {/* SVG container - adjusted left margin for axis labels */}
          <svg
            className="w-full h-full relative ml-[35px] sm:ml-[45px]"
            style={{ width: 'calc(100% - 35px)', maxWidth: 'calc(100% - 45px)' }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* ... SVG content remains the same ... */}
            <polyline
              fill="url(#chartGradient)"
              stroke="#453EFE"
              strokeWidth="0.5"
              points={
                staticChartData
                  .map((d, i) => {
                    const x = (i / (staticChartData.length - 1)) * 100;
                    const y = 100 - (d.value / 2.4) * 100;
                    return `${x},${y}`;
                  })
                  .join(" ") + ` 100,100 0,100`
              }
            />
            <polyline
              fill="none"
              stroke="#453EFE"
              strokeWidth="0.5"
              points={staticChartData
                .map((d, i) => {
                  const x = (i / (staticChartData.length - 1)) * 100;
                  const y = 100 - (d.value / 2.4) * 100;
                  return `${x},${y}`;
                })
                .join(" ")}
            />

            {staticChartData.map((d, i) => {
              const x = (i / (staticChartData.length - 1)) * 100;
              const y = 100 - (d.value / 2.4) * 100;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="1"
                  fill="white"
                  stroke="#453EFE"
                  strokeWidth="0.5"
                  className="dark:fill-gray-900"
                />
              );
            })}

            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#453EFE" stopOpacity="0.2" />
                <stop
                  offset="100%"
                  stopColor="#FFFFFF"
                  stopOpacity="0.0"
                  className="dark:stop-color-gray-900/0"
                />
              </linearGradient>
            </defs>
          </svg>

          {/* X-axis labels text color for dark mode - adjusted left margin for axis labels */}
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400 ml-[35px] sm:ml-[45px]">
            {staticChartData.map((d, i) => (
              <span key={i} className="text-center">
                {d.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MonitoringTable: React.FC = () => {
  const tableData = [
    {
      tempC: "27.5 °C",
      tempF: "81.5 °F",
      status: "TEXT",
      recordedAt: "2025-09-07 08:00",
      updatedAt: "2025-09-07 08:05",
    },
  ];

  const additionalData = [
    ...tableData,
    {
      tempC: "27.6 °C",
      tempF: "81.7 °F",
      status: "TEXT",
      recordedAt: "2025-09-07 08:05",
      updatedAt: "2025-09-07 08:05",
    },
  ];

  return (
    // Container background and border for dark mode
    <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mt-4 border border-gray-200 dark:border-gray-700">
      {/* Header Text Area - Adjusted padding for better mobile look */}
      <div className="w-full px-4 pt-2 pb-4 sm:px-6">
        {/* Text color for dark mode */}
        <h1 className="text-xl font-normal text-gray-700 dark:text-gray-100">
          Surroundings Temperature Monitoring Table
        </h1>
      </div>

      {/* Table Container: Responsive, may border, shadow - Adjusted margin */}
      <div className="overflow-x-auto mx-2 sm:mx-4 mb-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm">
        <table className="min-w-full text-sm text-center border-collapse text-gray-800 dark:text-gray-200">
          <thead className="text-sm font-normal bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-4 py-4 font-normal whitespace-nowrap">
                Temperature (°C)
              </th>
              <th className="px-4 py-4 font-normal whitespace-nowrap">
                Temperature (°F)
              </th>
              <th className="px-4 py-4 font-normal whitespace-nowrap">
                Status
              </th>
              <th className="px-4 py-4 font-normal whitespace-nowrap">
                Recorded At
              </th>
              <th className="px-4 py-4 font-normal whitespace-nowrap">
                Updated At
              </th>
            </tr>
          </thead>

          <tbody className="bg-white dark:bg-gray-800">
            {additionalData.map((data, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700"
              >
                <td className="px-4 py-4 font-normal whitespace-nowrap">
                  {data.tempC}
                </td>
                <td className="px-4 py-4 font-normal whitespace-nowrap">
                  {data.tempF}
                </td>
                <td className="px-4 py-4 font-normal whitespace-nowrap">
                  {data.status}
                </td>
                <td className="px-4 py-4 font-normal whitespace-nowrap">
                  {data.recordedAt}
                </td>
                <td className="px-4 py-4 font-normal whitespace-nowrap">
                  {data.updatedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Dagdag padding sa ibaba */}
      <div className="h-4"></div>
    </div>
  );
};

const SurroundingTable: React.FC = () => {
  const [selectedData] = useState("waterLevel");

  return (
    // Outer padding for responsiveness
    <div className="p-4 lg:p-6">
      <PageBreadcrumb pageTitle="Surrounding Temperature" />

      <div className="lg:col-span-2 flex flex-col">
        {/* Main section background, border, and text for dark mode */}
        <div className="border border-gray-300 dark:border-gray-700 w-full rounded-xl p-4 mt-4 bg-white dark:bg-gray-900">
          
          {/* FIX: Historical Table Header - Removed h-12 and added flex-wrap for responsiveness */}
          <div className="w-full flex flex-wrap items-start justify-between py-2 mb-4">
            <h1 className="text-xl font-normal text-gray-700 dark:text-gray-100 mr-4 mb-2 md:mb-0">
              SURROUNDING MONITORING CHART
            </h1>
            <button className="flex-shrink-0 bg-[#FFF] dark:bg-gray-800 border border-[#453EFE] text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center text-sm">
              Export CSV
            </button>
          </div>

          {/* Separator line color for dark mode - Adjusted mx-[-16px] to be relative to the p-4 parent padding */}
          <hr className="w-full border-t border-gray-200 dark:border-gray-700 mx-[-16px]" />

          {/* Chart container background and border for dark mode */}
          <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 p-2 mt-4">
            <PlaceholderChart selected={selectedData} />
          </div>

          <MonitoringTable />
        </div>
      </div>
    </div>
  );
};

export default SurroundingTable;