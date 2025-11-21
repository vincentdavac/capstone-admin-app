import Feedback from "../../../../preview/Feedback";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";

const CustomizationFeedbacks: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Customize Feedback" />

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-2 mb-6">
        <div className="flex justify-center w-full">
          {/* I-wrap ang Slider component at bigyan ng fixed size */}
          <div className="w-full max-w-10xl">
            <Feedback />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationFeedbacks;
