import LineChartMS5837Data from "../../../../components/charts/line/LineChartMS5837Data";
import ComponentCard from "../../../../components/common/ComponentCard";

const MS5837DataChart = () => {
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
            <ComponentCard title="MS5837 Data">
              <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
                <LineChartMS5837Data />
              </div>
            </ComponentCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default MS5837DataChart;
