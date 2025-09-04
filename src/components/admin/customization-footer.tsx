import React from "react";

const CustomizationFooter: React.FC = () => {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-light text-gray-600 dark:text-gray-400">
          Homepage Sliders Preview
        </h1>
      </div>

      {/* Slider Preview Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="flex justify-center">
          <img
            src="/images/preview/slider-preview.png" // Replace with your image path
            alt="Homepage Slider Preview"
            className="rounded-lg border"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomizationFooter;