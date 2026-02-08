import LineChartBME280 from "../../../../components/charts/line/LineChartBME280";
import ComponentCard from "../../../../components/common/ComponentCard";

const BME280DataChart = () => {
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
            <ComponentCard title="BME280 Data">
              <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
                <LineChartBME280 />
              </div>
            </ComponentCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default BME280DataChart;
