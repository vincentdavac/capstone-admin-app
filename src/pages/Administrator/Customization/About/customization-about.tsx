import About from "../../../../preview/About";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import AboutTableSlider from "./AboutTable";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import CardTable from "./CardTable";
import { useState, useEffect } from "react";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const CustomizationAbout = ({ alertsRef }: Props) => {
  const [refresh, setRefresh] = useState(false); // trigger refetch

  const handleRefresh = () => setRefresh((prev) => !prev);
  
  useEffect(() => {
    document.title = "About Us | X-Stream";
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Customize About Us" />

      {/* About Section Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mb-6">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-8xl">
            <About refresh={refresh} />
          </div>
        </div>
      </div>

      <AboutTableSlider alertsRef={alertsRef} onRefresh={handleRefresh} />

      <CardTable alertsRef={alertsRef} onRefresh={handleRefresh} />
    </div>
  );
};

export default CustomizationAbout;
