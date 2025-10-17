import Magnitude from "../../components/tsunami/magnitude";

interface ChartMap {
  [key: string]: React.ComponentType;
}

const chart: ChartMap = {
  magnitude: Magnitude,

};

export default chart;
