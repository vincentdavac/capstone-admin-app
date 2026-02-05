import LineChartWindSpeed from "../../../../components/charts/line/LineChartWindSpeed";
import ComponentCard from "../../../../components/common/ComponentCard";

const WindSpeedChart = () => {
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
            <ComponentCard title="Wind Speed">
              <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
                <LineChartWindSpeed />
              </div>
            </ComponentCard>
          </div>
        </div>
      </div>
    </>
  );
};

export default WindSpeedChart;
