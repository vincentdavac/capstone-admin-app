import React from "react";
import { Link } from "react-router";
import ThemeTogglerTwo from "../../components/common/ThemeTogglerTwo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex flex-col justify-center w-full h-screen lg:flex-row dark:bg-gray-900 sm:p-0">
        {children}
        <div className="items-center hidden w-full h-full lg:w-1/2 lg:grid relative overflow-hidden">
          {/* Gradient Background */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              background: `linear-gradient(180deg, #1E3A8A 0%, #3B82F6 50%, #60A5FA 100%)`,
            }}
          />
          
          <div 
            className="absolute inset-0 z-0 opacity-100"
            style={{
              backgroundImage: `url('${import.meta.env.BASE_URL}wave.svg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            aria-hidden="true"
          />

          <div className="relative flex items-center justify-center z-10">
            <div className="flex flex-col items-center max-w-md">
              <Link to="/" className="block mb-6">
                <img
                  width={300} 
                  height={62} 
                  src="/light-with-name.svg"
                  alt="Logo"
                  loading="lazy"
                  className="drop-shadow-lg"
                />
              </Link>
              <p className="text-center text-[#FFFFFF] dark:text-white/60 text-lg font-light">
                A River Monitoring and Alert System.
              </p>
            </div>
          </div>
        </div>
        <div className="fixed z-50 hidden bottom-6 right-6 sm:block">
          <ThemeTogglerTwo />
        </div>
      </div>
    </div>
  );
}