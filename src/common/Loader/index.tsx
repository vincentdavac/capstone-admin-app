import React from "react";

interface LoaderProps {
  title?: string;
  description?: string;
}

const Loader: React.FC<LoaderProps> = ({ title, description }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-500">
      {/* Container with subtle glow */}
      <div className="relative flex flex-col items-center max-w-sm w-full p-8">
        {/* Animated Background Pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />

        {/* Loader Image/GIF */}
        <div className="relative z-10 mb-8 transform transition-transform hover:scale-105">
          <img
            src="/loader/Loader.gif"
            alt="Loading..."
            className="h-28 w-28 object-contain drop-shadow-2xl"
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10 text-center space-y-2">
          {title && (
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight animate-in fade-in slide-in-from-bottom-2 duration-700">
              {title}
            </h2>
          )}

          {description && (
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-[250px] mx-auto animate-in fade-in slide-in-from-bottom-3 duration-1000">
              {description}
            </p>
          )}
        </div>

        {/* Minimal Progress Line (Optional aesthetic touch) */}
        <div className="mt-10 w-12 h-1 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-indigo-500 w-1/2 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Inline styles for the custom micro-animation if not in tailvin.config */}
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
