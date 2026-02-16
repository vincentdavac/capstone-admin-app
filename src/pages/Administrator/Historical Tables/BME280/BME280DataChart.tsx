import LineChartBME280 from "../../../../components/charts/line/LineChartBME280";
import ComponentCard from "../../../../components/common/ComponentCard";

/* ===== Interfaces (unchanged) ===== */

export interface BuoyAttributes {
  buoyCode: string;
  riverName: string;
  wallHeight: number;
  riverHectare: number;
  latitude: number;
  longitude: number;
  attachment: string;
  status: string;
  maintenanceAt: string | null;
  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;
}

export interface Buoy {
  id: number;
  attributes: BuoyAttributes;
}

export interface BME280Attributes {
  buoyId: number;

  temperature: {
    celsius: number;
    fahrenheit: number;
  };

  humidity: number;

  pressure: {
    mbar: number;
    hpa: number;
  };

  altitude: number;

  recordedAt: string;
  recordedDate: string;
  recordedTime: string;

  createdDate: string;
  createdTime: string;
  updatedDate: string;
  updatedTime: string;

  buoy: Buoy;
}

export interface BME280Reading {
  id: number;
  attributes: BME280Attributes;
}

/* ===== NEW Props Interface ===== */

interface BME280DataChartProps {
  bmeData: BME280Reading[];
}

/* ===== Component ===== */

const BME280DataChart = ({ bmeData }: BME280DataChartProps) => {
  const labels = bmeData.map((d) =>
    new Date(d.attributes.recordedAt).toLocaleString(),
  );
  const temperatures = bmeData.map((d) => d.attributes.temperature.celsius);
  const humidities = bmeData.map((d) => d.attributes.humidity);
  const pressures = bmeData.map((d) => d.attributes.pressure.hpa);
  return (
    <div className="w-full">
      <div
        className="
          dark:border-gray-700
          rounded-xl
          w-full
          shadow-lg
          overflow-hidden
          min-h-[260px]
          sm:min-h-[320px]
          lg:min-h-[445px]
        "
      >
        <div className="h-full w-full">
          <ComponentCard title="BME280 Environmental Data">
            <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[380px]">
              <LineChartBME280
                labels={labels}
                temperatures={temperatures}
                humidities={humidities}
                pressures={pressures}
              />
            </div>
          </ComponentCard>
        </div>
      </div>
    </div>
  );
};

export default BME280DataChart;
