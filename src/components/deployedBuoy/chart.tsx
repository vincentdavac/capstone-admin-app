import SstChart from "../riverMonitoring/sstChart";

interface ChartMap {
  [key: string]: React.ComponentType;
}

const chart: ChartMap = {
  SST: SstChart,

};

export default chart;
