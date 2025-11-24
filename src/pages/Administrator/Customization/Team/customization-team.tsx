import Team from "../../../../preview/Team";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";
import TeamTable from "./TeamTable";
import { AlertsContainerRef } from "../../../../components/Alert/AlertsContainer";
import { useState } from "react";

interface Props {
  alertsRef: React.RefObject<AlertsContainerRef | null>;
}

const CustomizationTeam = ({ alertsRef }: Props) => {
  const [refresh, setRefresh] = useState(false); // trigger refetch

  const handleRefresh = () => setRefresh((prev) => !prev);

  return (
    <div className=" bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Customize Team" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mb-6">
        <div className="flex justify-center w-full">
          {/* Team component is assumed to be the preview */}
          <div className="w-full mb-5">
            {/* Note: In a real app, you would pass the current description/team members as props to <Team /> */}
            <Team refresh={refresh} />
          </div>
        </div>
        <TeamTable alertsRef={alertsRef} onRefresh={handleRefresh} />
      </div>
    </div>
  );
};

export default CustomizationTeam;
