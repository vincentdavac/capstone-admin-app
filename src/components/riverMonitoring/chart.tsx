import SstChart from "./sstChart";
import WaterLevelChart from "./waterLevelChart";
import WaterPressure from "./waterPressureChart";
import WaveHeight from "./waveHeight";
import Atmospheric from "./atmospheric";
import WaterDepth from "./waterDepth";
import WaterTemp from "./waterTemp";
import WindSpeed from "./windSpeed";
import RainFall from "./rainFall";


interface ChartMap {
  [key: string]: React.ComponentType;
}

const chart: ChartMap = {
  SST: SstChart,
  humidity: WaterLevelChart,
  waterpressure: WaterPressure,
  waveHeight: WaveHeight,
  atmospheric: Atmospheric,
  waterDepth: WaterDepth,
  waterTemp: WaterTemp,
  windSpeed: WindSpeed,
  rainFall: RainFall
};

export default chart;
