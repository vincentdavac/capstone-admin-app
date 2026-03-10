import React from "react";

interface LoaderProps {
  title?: string;
  description?: string;
}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      {/* Loader GIF */}
      <img
        src="/loader/Loader.gif"
        alt="Loading..."
        className="h-24 w-24 object-contain"
      />
    </div>
  );
};

export default Loader;
