import Prototype from "../../../../preview/Prototype"; // Assuming this is the correct path to the updated Prototype.tsx
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";

const CustomizationPrototype: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white transition-colors duration-300">
      <PageBreadcrumb pageTitle="Customize Prototype" />

      {/* Slider Preview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6 transition-colors duration-300">
        <div className="flex justify-center w-full">
          {/* I-wrap ang Slider component at bigyan ng fixed size */}
          <div className="w-full max-w-8xl">
            <Prototype />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPrototype;
