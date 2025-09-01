import React from "react";

interface LoaderProps {
  title?: string;
  description?: string;
}

const Loader: React.FC<LoaderProps> = ({ title, description }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white space-y-4">
      {/* Loader GIF */}
      <img
        src="/loader/Loader.gif"
        alt="Loading..."
        className="h-24 w-24 object-contain"
      />

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-500 text-center px-4">{description}</p>
      )}
    </div>
  );
};

export default Loader;
