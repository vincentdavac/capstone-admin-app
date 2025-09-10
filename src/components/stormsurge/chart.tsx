import SstChart from "../../components/stormsurge/sstChart";
import WaterLevelChart from "../../components/stormsurge/waterLevelChart";
import WaterPressure from "../../components/stormsurge/waterPressureChart";
import WaveHeight from "../../components/stormsurge/waveHeight";
import Atmospheric from "../../components/stormsurge/atmospheric";
import WaterDepth from "../../components/stormsurge/waterDepth";
import WaterTemp from "../../components/stormsurge/waterTemp";
import WindSpeed from "../../components/stormsurge/windSpeed";
import RainFall from "../../components/stormsurge/rainFall";


interface ChartMap {
  [key: string]: React.ComponentType;
}

const chart: ChartMap = {
  SST: SstChart,
  waterLevel: WaterLevelChart,
  waterpressure: WaterPressure,
  waveHeight: WaveHeight,
  atmospheric: Atmospheric,
  waterDepth: WaterDepth,
  waterTemp: WaterTemp,
  windSpeed: WindSpeed,
  rainFall: RainFall
};

export default chart;
