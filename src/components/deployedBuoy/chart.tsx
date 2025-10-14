import SstChart from "../stormsurge/sstChart";

interface ChartMap {
  [key: string]: React.ComponentType;
}

const chart: ChartMap = {
  SST: SstChart,

};

export default chart;
