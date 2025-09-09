import SstChart from "../../components/stormsurge/sstChart";
import WaterLevelChart from "../../components/stormsurge/waterLevelChart";

interface ChartMap {
  [key: string]: React.ComponentType;
}

const chart: ChartMap = {
  SST: SstChart,
  waterLevel: WaterLevelChart,
};

export default chart;
