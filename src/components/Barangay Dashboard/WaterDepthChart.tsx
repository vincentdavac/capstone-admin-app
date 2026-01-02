import React from "react";
import ComponentCard from "../../components/common/ComponentCard";
import LineChartOne from "../../components/charts/line/LineChartOne";

const WaterDepthChart: React.FC = () => {
  return (
    <div
      className="
    w-full
    max-w-full
    sm:max-w-[640px]
    md:max-w-[768px]
    lg:max-w-[955px]
    xl:max-w-[1100px]
    2xl:max-w-[1280px]

    min-h-[60vh]
    lg:min-h-[450px]

    mx-auto
    px-3
    sm:px-4
    md:px-6

    bg-white
    dark:bg-gray-800
    backdrop-blur-xl
    shadow-sm
    rounded-2xl
    border
    border-[#D9D9D9]
    dark:border-gray-700

    py-4
    overflow-x-hidden
    overflow-y-auto
  "
    >
      <div className="w-full px-4 pt-4 text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Current Water Level
        </h3>
      </div>

      <hr className="my-3 border-gray-300 dark:border-gray-600" />

      <div className="space-y-6">
        <ComponentCard title="Line Chart 1">
          <LineChartOne />
        </ComponentCard>
      </div>
    </div>
  );
};

export default WaterDepthChart;
