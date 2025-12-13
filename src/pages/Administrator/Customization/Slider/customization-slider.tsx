import Slider from "../../../../preview/Slider";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import TableSlider from "./TableSlider";
import { useEffect } from 'react';

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const CustomizationSlider = ({ alertsRef }: Props) => {

  useEffect(() => {
    document.title = "Slider | X-Stream";
  }, []);

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Customize Slider" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow  mb-6">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-7xl">
            <Slider />
          </div>
        </div>
      </div>

      <TableSlider alertsRef={alertsRef} />
    </div>
  );
};

export default CustomizationSlider;
