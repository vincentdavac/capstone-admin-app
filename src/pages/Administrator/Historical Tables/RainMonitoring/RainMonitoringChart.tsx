import LineChartRainMonitoring from "../../../../components/charts/line/LineChartRainMonitoring";
import ComponentCard from "../../../../components/common/ComponentCard";

const RainMonitoringChart = () => {
  return (
    <>
      <div className="w-full">
        <div
          className="
      
      dark:border-gray-700
      rounded-xl
      w-full
      shadow-lg
      overflow-hidden

      /* Responsive height */
      min-h-[260px]
      sm:min-h-[320px]
      lg:min-h-[445px]
    "
        >
          <div className="h-full w-full">
            <ComponentCard title="Rain Monitoring">
              <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
                <LineChartRainMonitoring />
              </div>
            </ComponentCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default RainMonitoringChart;
