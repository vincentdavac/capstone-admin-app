import Team from "../../../../preview/Team";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";

const CustomizationTeam: React.FC = () => {
  return (
    <div className=" bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Customize Team" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mb-6">
        <div className="flex justify-center w-full">
          {/* Team component is assumed to be the preview */}
          <div className="w-full">
            {/* Note: In a real app, you would pass the current description/team members as props to <Team /> */}
            <Team />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationTeam;
