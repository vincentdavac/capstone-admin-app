import Prototype from "../../../../preview/Prototype"; // Assuming this is the correct path to the updated Prototype.tsx
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import PrototypeTable from "./PrototypeTable";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import { useState, useEffect } from "react";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const CustomizationPrototype = ({ alertsRef }: Props) => {
  const [refresh, setRefresh] = useState(false); // trigger refetch

  const handleRefresh = () => setRefresh((prev) => !prev);
  
  useEffect(() => {
    document.title = "Prototype | X-Stream";
  }, []);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white transition-colors duration-300">
      <PageBreadcrumb pageTitle="Customize Prototype" />

      {/* Slider Preview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors duration-300">
        <div className="flex justify-center w-full">
          {/* I-wrap ang Slider component at bigyan ng fixed size */}
          <div className="w-full max-w-8xl">
            <Prototype refresh={refresh} />
          </div>
        </div>
      </div>

      <PrototypeTable alertsRef={alertsRef} onRefresh={handleRefresh} />
    </div>
  );
};

export default CustomizationPrototype;
