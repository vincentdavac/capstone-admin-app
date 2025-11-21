import About from "../../../../preview/About";
import PageBreadcrumb from "../../../../components/common/PageBreadCrumb";

const CustomizationAbout: React.FC = () => {
  return (
    <div className=" bg-gray-50 dark:bg-gray-900 min-h-screen relative text-gray-900 dark:text-white">
      <PageBreadcrumb pageTitle="Customize About Us" />

      {/* About Section Preview */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mb-6">
        <div className="flex justify-center w-full">
          {/* I-wrap ang Slider component at bigyan ng fixed size */}
          <div className="w-full max-w-8xl">
            <About />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationAbout;
