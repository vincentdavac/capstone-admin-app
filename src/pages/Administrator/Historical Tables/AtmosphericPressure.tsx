import React, { useState, useEffect } from "react";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb"; 

const staticChartDataPressure = [
    { name: 'Mar', value: 1010 },
    { name: 'Apr', value: 1015 },
    { name: 'May', value: 1011 },
    { name: 'Jun', value: 1008 },
    { name: 'Jul', value: 1005 },
    { name: 'Aug', value: 1009 },
    { name: 'Sept', value: 1012 },
];
const CHART_MAX_VALUE = 1020; 

const PlaceholderChart: React.FC<{ title: string, data: typeof staticChartDataPressure, unit: string, maxValue: number }> = ({ title, data, unit, maxValue }) => {

    const [timeRange, setTimeRange] = useState("Month");
    const timeOptions = ["Day", "Week", "Month"];
    const scaledPoints = data.map((d, i) => {
        const x = (i / (data.length - 1)) * 100;
        const baseValue = 1000;
        const effectiveMax = maxValue - baseValue; 
        const effectiveValue = d.value - baseValue;
        
        const y = 100 - (effectiveValue / effectiveMax) * 100;
        return `${x},${y}`;
    });

    const yAxisLabels = [1000, 1004, 1008, 1012, 1016, 1020].map(v => Math.round(v));
    const yAxisPosition = [0, 20, 40, 60, 80, 100]; 

    return (
        <div className="w-full h-full p-2 sm:p-4">
            {/* Chart Title and INTERACTIVE TIME RANGE BUTTONS (Responsive with flex-wrap) */}
            <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
                <h2 className="text-lg font-normal text-gray-700 dark:text-gray-200 flex-shrink-0">{title}</h2>
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
                <div className="absolute top-0 w-full text-center text-xs text-gray-500 dark:text-gray-400">
                    Data for: {timeRange} (Static Example)
                </div>
                <div className="h-full relative flex flex-col justify-end">
                    {/* Axis lines and text (Responsive margins) */}
                    <div className="absolute inset-0 border-l border-b border-gray-300 dark:border-gray-600 ml-[35px] sm:ml-[45px]">
                        {/* Note: Y-axis labels are mapped to match the 0-100% bottom to top position */}
                        {yAxisLabels.map((y, i) => (
                            <div
                                key={i}
                                className="absolute w-full border-t border-gray-200 dark:border-gray-700"
                                style={{ bottom: `${yAxisPosition[i]}%` }}
                            >
                                <span className="absolute left-[-35px] sm:left-[-45px] text-xs text-gray-500 dark:text-gray-400 bottom-0 pr-1 text-right">
                                    {y}
                                    {unit}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* SVG container (Responsive margins) */}
                    <svg
                        className="w-full h-full relative ml-[35px] sm:ml-[45px]"
                        style={{ width: 'calc(100% - 35px)', maxWidth: 'calc(100% - 45px)' }}
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                    >
                        <polyline
                            fill="url(#chartGradient)"
                            stroke="#453EFE"
                            strokeWidth="0.5"
                            points={scaledPoints.join(' ') + ` 100,100 0,100`}
                        />
                        <polyline
                            fill="none"
                            stroke="#453EFE"
                            strokeWidth="0.5"
                            points={scaledPoints.join(' ')}
                        />
                        {data.map((d, i) => {
                            const x = (i / (data.length - 1)) * 100;
                            const baseValue = 1000;
                            const effectiveMax = maxValue - baseValue; 
                            const effectiveValue = d.value - baseValue;
                            const y = 100 - (effectiveValue / effectiveMax) * 100;
                            
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
                                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" className="dark:stop-color-gray-900/0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* X-axis labels text color (Responsive margins) */}
                    <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400 ml-[35px] sm:ml-[45px]">
                        {data.map((d, i) => (
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
            mbar: "1011 mbar",
            hpa: "1011 hPa",
            status: "TEXT",
            recordedAt: "2025-09-07 08:00",
            updatedAt: "2025-09-07 08:05",
        },
        {
            mbar: "1010 mbar",
            hpa: "1010 hPa",
            status: "TEXT",
            recordedAt: "2025-09-07 08:10",
            updatedAt: "2025-09-07 08:10",
        },
    ];

    return (
        <div className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 mt-4 border border-gray-200 dark:border-gray-700">
            {/* Header Text Area - Adjusted padding for better mobile look */}
            <div className="w-full px-4 pt-2 pb-4 sm:px-6">
                <h1 className="text-xl font-normal text-gray-700 dark:text-gray-100">
                    Atmospheric Pressure Monitoring Table
                </h1>
            </div>
            <div className="overflow-x-auto mx-2 sm:mx-4 mb-4 border border-gray-300 dark:border-gray-600 rounded-xl shadow-sm">
                <table className="min-w-full text-sm text-center border-collapse text-gray-800 dark:text-gray-200">
                    <thead className="text-sm font-normal bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
                        <tr>
                            <th className="px-4 py-4 font-normal whitespace-nowrap">Pressure (mbar)</th>
                            <th className="px-4 py-4 font-normal whitespace-nowrap">Pressure (hPa)</th>
                            <th className="px-4 py-4 font-normal whitespace-nowrap">Status</th>
                            <th className="px-4 py-4 font-normal whitespace-nowrap">Recorded At</th>
                            <th className="px-4 py-4 font-normal whitespace-nowrap">Updated At</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800">
                        {tableData.map((data, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                            >
                                <td className="px-4 py-4 font-normal whitespace-nowrap">
                                    {data.mbar}
                                </td>
                                <td className="px-4 py-4 font-normal whitespace-nowrap">
                                    {data.hpa}
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
            <div className="h-4"></div>
        </div>
    );
};

const AtmosphericPressure: React.FC = () => {

    useEffect(() => {
    document.title = "Atmospheric Pressure | X-Stream";
  }, []);

    return (
        <div className="p-4 lg:p-6">
            
            {/* Breadcrumb (Using an appropriate title) */}
            <PageBreadcrumb pageTitle="Atmospheric Pressure" />
            <div className="lg:col-span-2 flex flex-col">
                <div className="border border-gray-300 dark:border-gray-700 w-full rounded-xl p-4 mt-4 bg-white dark:bg-gray-900">
                    <div className="w-full flex flex-wrap items-start justify-between py-2 mb-4">
                        <h1 className="text-xl font-normal text-gray-700 dark:text-gray-100 mr-4 mb-2 md:mb-0">
                            ATMOSPHERIC PRESSURE CHART
                        </h1>
                        <button className="flex-shrink-0 bg-[#FFF] dark:bg-gray-800 border border-[#453EFE] text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center text-sm">
                            Export CSV
                        </button>
                    </div>

                    {/* Separator line */}
                    <hr className="w-full border-t border-gray-200 dark:border-gray-700 mx-[-16px]" />

                    {/* Chart container background and border */}
                    <div className="w-full bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700 p-2 mt-4">
                        <PlaceholderChart
                            title="Atmospheric Pressure level"
                            data={staticChartDataPressure}
                            unit="hPa"
                            maxValue={CHART_MAX_VALUE}
                        />
                    </div>

                    <MonitoringTable />
                </div>
            </div>
        </div>
    );
};

export default AtmosphericPressure;