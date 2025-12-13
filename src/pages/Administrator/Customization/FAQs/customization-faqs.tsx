import FAQ from "../../../../preview/FAQs"; // Assuming the path is correct
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import FAQsTable from "./FAQsTable";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import { useState,useEffect } from "react";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const CustomizationFaqs = ({ alertsRef }: Props) => {
  const [refresh, setRefresh] = useState(false); // trigger refetch

  const handleRefresh = () => setRefresh((prev) => !prev);

  useEffect(() => {
    document.title = "FAQs | X-Stream";
  }, []);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Customize FAQs" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex justify-center w-full">
          {/* FAQ component is assumed to be the preview */}
          <div className="w-full max-w">
            <FAQ refresh={refresh} />
          </div>
        </div>
      </div>
      <FAQsTable alertsRef={alertsRef} onRefresh={handleRefresh} />
    </div>
  );
};

export default CustomizationFaqs;
