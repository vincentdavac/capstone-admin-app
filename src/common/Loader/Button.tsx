import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline";
  fullWidth?: boolean;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = "primary",
  fullWidth = false,
  onClick,
}: ButtonProps) => {
  const primaryColor = "#453EFE"; // Ang kulay na kailangan mo

  const baseClasses =
    "py-2 px-6 rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800";
    
  const variantClasses = {
    // Primary Button: Background #453EFE. Hover effect is reverse (white bg, colored outline).
    primary:
      // Light Mode Classes
      `bg-[${primaryColor}] text-white border-1 border-[${primaryColor}] 
       hover:bg-white hover:text-[#453EFE] hover:border-[${primaryColor}] 
       focus:ring-[${primaryColor}]
       
       // Dark Mode Classes
       dark:bg-[${primaryColor}] dark:text-white dark:border-[${primaryColor}]
       dark:hover:bg-gray-800 dark:hover:text-[${primaryColor}] dark:hover:border-[${primaryColor}]
       dark:focus:ring-[${primaryColor}]`,
      
    // Outline Button: Background white/dark-gray, text colored. Hover effect is fill.
    outline:
      // Light Mode Classes
      `bg-white text-gray-900 border border-gray-900 
       hover:bg-[${primaryColor}] hover:text-[#453EFE] hover:border-[#453EFE]
       focus:ring-[${primaryColor}]
       
       // Dark Mode Classes
       dark:bg-gray-800 dark:text-white dark:border-white 
       dark:hover:bg-[${primaryColor}] dark:hover:text-[#453EFE] dark:hover:border-[#453EFE]
       dark:focus:ring-white`,
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};